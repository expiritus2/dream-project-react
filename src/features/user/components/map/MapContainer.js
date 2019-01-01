import React, { useRef, useCallback, useState } from "react";
import { get } from "lodash-es";
import { compose, withProps } from "recompose";
import Map from "./Map";
import { uniqueId } from "lodash-es";
import { withScriptjs, withGoogleMap } from "react-google-maps";

const initialMarkers = [
  {
    id: uniqueId(),
    title: "Test title",
    position: { lat: -34.397, lng: 150.644 },
    draggable: true,
    clickable: true,
  },
];

const MapContainer = () => {
  const searchBoxRef = useRef();
  const mapRef = useRef();
  const [center, setCenter] = useState(initialMarkers[0].position);
  const [markers, setMarkers] = useState(initialMarkers);

  const onPlacesChanged = useCallback(
    () => {
      const places = searchBoxRef.current.getPlaces();
      const bounds = new window.google.maps.LatLngBounds();

      places.forEach(place => {
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }

        const nextMarkers = places.map(place => ({
          position: place.geometry.location,
        }));
        const nextCenter = get(nextMarkers, "0.position", center);
        setCenter(nextCenter);
      });
    },
    [center],
  );

  const onClickHandler = useCallback(
    event => {
      const {
        latLng: { lat, lng },
      } = event;
      const newMarker = {
        id: uniqueId(),
        position: { lat: lat(), lng: lng() },
        draggable: true,
        clickable: true,
      };

      setMarkers(prevMarkers => [...prevMarkers, newMarker]);
    },
    [markers],
  );

  return (
    <Map
      mapRef={mapRef}
      searchBoxRef={searchBoxRef}
      center={center}
      markers={markers}
      onPlacesChanged={onPlacesChanged}
      onClick={onClickHandler}
    />
  );
};

export default compose(
  withProps({
    googleMapURL: process.env.REACT_APP_GOOGLE_MAP_KEY,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)(MapContainer);
