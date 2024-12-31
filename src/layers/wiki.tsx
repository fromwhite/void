/**
 * inspired by https://x.com/matthewwsiu/status/1867016096043372752?s=46&t=EPQ16gkutyBYiDV93B6ItA
 * WikiNearby by @BrandonXLF
 * https://github.com/BrandonXLF/wikinearby
 */

import { Coordinates, coordsToVector3 } from "react-three-map/maplibre";
import { Points, Point, PointMaterial, Billboard, Text } from '@react-three/drei'
import { point, featureCollection, bbox, bboxPolygon, booleanPointInPolygon } from '@turf/turf';
import { useState } from "react";

export const query_wiki_nearby = async ({lat,lon}:{lat: number;lon: number}) => {
    const original = `https://wikinearby.toolforge.org/api/nearby?q=${lat},${lon}&lang=en&offset=0`;
	const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(original)}`;
    const response = await fetch(proxyUrl).then((res) => res.json());
    return response;
};

export const get_bbox = async ({lat,lon,list, padding = 0.01}:{lat: number;lon: number;list: any;padding: number}) => {
    // convert GeoJSON 
    const points = list.map((item: any) => point([parseFloat(item.lon), parseFloat(item.lat)]));

    // FeatureCollection
    const feature_collection = featureCollection(points);

    // compute bounding box
    const bounds = bbox(feature_collection);

    // add padding
    const minLon = bounds[0] - padding;
    const maxLon = bounds[2] + padding;
    const minLat = bounds[1] - padding;
    const maxLat = bounds[3] + padding;

    return [
        minLon,
        minLat,
        maxLon,
        maxLat,
    ];
}

export const is_position_in_bbox = (lat: number, lon: number, bbox: number[]) => {
    const pt = point([lon, lat]);
    const bboxPoly = bboxPolygon(bbox as [number, number, number, number]);
    return booleanPointInPolygon(pt, bboxPoly);
}

export const markers = ({lat,lon,list}: {lat: number;lon: number;list: any[]}) => {
    const center = {
        longitude: Number(lon),
        latitude: Number(lat),
    };

    return (<Coordinates key={1} latitude={lat} longitude={lon}>
        <Points limit={list.length}>
            <PointMaterial
                transparent
                vertexColors
                size={10}
                sizeAttenuation={false}
                depthWrite={false}
                toneMapped={false}
            />
            {list.map((item: any, i: number) => (
                <PointEvent
                    key={i}
                    index={i}
                    label={item.desc}
                    position={coordsToVector3(
                        { latitude: Number(item.lat), longitude: Number(item.lon) },
                        center
                    )}
                />
            ))}
        </Points>
    </Coordinates>);
}

function PointEvent({ index,label='', ...props }: { index: number;label:string; position: [number, number, number] }) {
    const [hovered, setHover] = useState(false)
    const [clicked, setClick] = useState(false)

    /**
     * TODO: POI text
     * 1. Localize the text:
     *    - Dynamically adapt the text to the selected language or locale.
     *    - Implement tokenized search for self-hosted Wiki data and ensure proper data separation.
     * 
     * 2. Lock Z-axis to the map:
     *    - Align the text with the map surface and keep it consistent with the coordinate plane.
     *    - Ensure proper orientation during user interactions like rotation or panning.
     * 
     * 3. Implement zoom scaling:
     *    - Dynamically adjust text size based on the zoom level.
     *    - Prevent text from becoming disproportionately large or small during zoom interactions.
     */

    /**
     * TODO: POI event
     * 1. Add spring-based physics interactions to enhance visual feedback during text scaling transitions.
     * 2. Adapt to different styles for OSM minimalist maps and Mapbox satellite tiles.
     * 3. Provide TSL animations and VFX options for enriched user experience.
     */

    return (
        <group scale={[1, 1, 1]}>
            {/* <Billboard follow lockY> */}
                <Text
                    {...props}
                    // position={[props.position[0], props.position[1] + 2, props.position[2]]}
                    fontSize={10}
                    color="yellow"
                    anchorX="center"
                    anchorY="bottom"
                    font={"/fonts/Inter_Tight/InterTight-VariableFont_wght.ttf"}
                    rotation={[-Math.PI / 2, 0, 0]} // Temporarily lock the Y-axis at 90', keeping the text aligned with the XZ plane
                    >
                    {label}
                </Text>
            {/* </Billboard> */}
            <Point
                {...props}
                scale={[10, 10, 10]} 
                color={clicked ? 'lightblue' : hovered ? 'hotpink' : 'orange'}
                onPointerOver={(e) => ( setHover(true))}
                onPointerOut={(e) => setHover(false)}
                // onClick={(e) => (setClick((state) => !state))}
                onClick={(e) => {
                    console.log('Point clicked', e);
                    setClick((state) => !state);
                  }}
                  // @ts-ignore
                  interactive
                >
            </Point>
        </group>
    )
  }