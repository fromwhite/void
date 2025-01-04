import { Leva, useControls, LevaInputs, button } from "leva";
import { state } from "./state";
import { useState, useEffect, useRef } from "react";
import { Loader, X } from "./geist";
import { query_wiki_nearby, get_bbox } from "./layers/wiki";

export default function Ctrl() {
  const mapbox_access_token = state((s) => s.mapbox_access_token);
  const setMapboxKey = state((s) => s.setMapboxKey);
  const google_tile_key = state((s) => s.google_tile_key);
  const setGoogleKey = state((s) => s.setGoogleKey);
  const base_map = state((s) => s.base_map);
  const setBasemap = state((s) => s.setBasemap);
  const setViewState = state((s) => s.setViewState);
  const request_loader = state((s) => s.request_loader);
  const setRequestLoader = state((s) => s.setRequestLoader);
  const setBbox = state((s) => s.setBbox);
  const is_in_bbox = state((s) => s.is_in_bbox);
  const setIsInBbox = state((s) => s.setIsInBbox);
  const setWikiList = state((s) => s.setWikiList);

  const addressLoaderRef = useRef(false);

  const [providerOptions, setProviderOptions] = useState<
    Record<string, string>
  >({
    OpenStreetMap: "OpenStreetMap",
  });

  useEffect(() => {
    if (!mapbox_access_token && base_map === "Mapbox") {
      setBasemap("OpenStreetMap");
    }
    if (!google_tile_key && base_map === "Google") {
      setBasemap("OpenStreetMap");
    }

    if (mapbox_access_token) {
      setProviderOptions((prev) => ({ ...prev, Mapbox: "Mapbox" }));
    } else {
      setProviderOptions((prev) => {
        const { Mapbox, ...rest } = prev;
        return rest;
      });
    }

    if (google_tile_key) {
      setProviderOptions((prev) => ({ ...prev, Google: "Google" }));
    } else {
      setProviderOptions((prev) => {
        const { Google, ...rest } = prev;
        return rest;
      });
    }
  }, [mapbox_access_token, google_tile_key, base_map, setBasemap]);

  const preset = useControls(
    "baseMap",
    {
      mapbox_key: {
        value: mapbox_access_token,
        type: LevaInputs.STRING,
        label: "Mapbox Key",
        inputType: "text",
        onChange: (value) => {
          setMapboxKey(value);
        },
      },
      google_key: {
        value: google_tile_key,
        type: LevaInputs.STRING,
        label: "Google Key",
        inputType: "text",
        onChange: (value) => {
          setGoogleKey(value);
        },
      },
      provider: {
        value: base_map,
        label: "Provider",
        options: providerOptions,
        onChange: (value) => {
          setBasemap(value);
        },
      },
      "Get Current Position": button(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position && position.coords) {
              setViewState({
                zoom: 9.5,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
            }
          },
          (error) => {
            console.error(error);
          }
        );
      }),
      "Wikipedia nearby": button(
        async () => {
          setRequestLoader(true);
          const { viewState } = state.getState();
          const data = await query_wiki_nearby({
            lat: viewState.latitude,
            lon: viewState.longitude,
          });
          setRequestLoader(false);
          if (!data) return;
          const bbox = await get_bbox(data);
          setBbox(bbox);
          setIsInBbox(true);
          setWikiList(data);
        },
        {
          disabled: is_in_bbox,
        }
      ),
    },
    {
      collapsed: true,
    },
    [providerOptions, is_in_bbox]
  );

  const [, setSearchAddress] = useControls(() => ({
    address: {
      value: "",
      type: LevaInputs.STRING,
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span>Geocoding</span>
          {/* {request_loader && (
            <Loader
              size={16}
              style={{ animation: "spin 1s linear infinite" }}
            />
          )} */}
          <span
            onClick={() => setSearchAddress({ address: "" })}
            style={{ display: "flex", alignItems: "center" }}
          >
            <X size={16} style={{ cursor: "pointer" }} />
          </span>
        </div>
      ),
      onChange: (value: string) => handleSearch(value),
    },
  }));

  const handleSearch = async (address: string) => {
    if (addressLoaderRef.current || !address) return;
    addressLoaderRef.current = true;

    setRequestLoader(true);

    const currentBaseMap = state.getState().base_map;
    const currentMapboxAccessToken = state.getState().mapbox_access_token;

    try {
      let fetchUrl;

      if (currentBaseMap === "Mapbox" && currentMapboxAccessToken) {
        fetchUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${currentMapboxAccessToken}&limit=1`;
      } else if (
        currentBaseMap === "OpenStreetMap" ||
        currentBaseMap === "Google"
      ) {
        fetchUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}&limit=1&addressdetails=1`;
      } else {
        console.error("Invalid base map selected.");
        return;
      }

      const response = await fetch(fetchUrl);
      const data = await response.json();

      if (data && (data?.length > 0 || data?.features?.length > 0)) {
        if (currentBaseMap === "Mapbox") {
          const coordinates = data.features[0].geometry.coordinates;
          setViewState({
            latitude: coordinates[1],
            longitude: coordinates[0],
            zoom: 9.5,
          });

          setSearchAddress({ address: data.features[0].place_name });
        } else if (
          currentBaseMap === "OpenStreetMap" ||
          currentBaseMap === "Google"
        ) {
          const { lat, lon } = data[0];
          if (!lat || !lon) return;
          setViewState({
            latitude: Number(lat),
            longitude: Number(lon),
            zoom: 9.5,
          });
          setSearchAddress({ address: data[0].display_name });
        }
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      addressLoaderRef.current = false;
      setRequestLoader(false);
    }
  };

  return (
    <Leva
      collapsed={false}
      flat={false}
      hideCopyButton
      theme={{ sizes: { rootWidth: "340px", controlWidth: "190px" } }}
    />
  );
}
