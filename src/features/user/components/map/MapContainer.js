import React, { useRef, useCallback, useState, useEffect } from "react";
import { useRedux } from "hooks";
import { get } from "lodash-es";
import { compose, withProps } from "recompose";
import { uniqueId } from "lodash-es";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import { openModal } from "components/modal/modules/actions";
import { AutocompleteInput } from "components/inputs";
import Map from "./Map";

const MapContainer = () => {
  const searchBoxRef = useRef();
  const mapRef = useRef();

  const [user, actions] = useRedux("user", { openModal });

  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [markers, setMarkers] = useState([]);

  const positionHandler = useCallback(position => {
    const {
      coords: { latitude, longitude },
    } = position;
    setCenter({ lat: latitude, lng: longitude });
  }, []);

  useEffect(() => {
    if (user.markers.length > 0) {
      setCenter(user.markers[0].position);
      setMarkers(user.markers);
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(positionHandler);
    }
  }, []);

  const changePlaces = useCallback(() => {
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
        searchBoxRef,
      }));
      const nextCenter = get(nextMarkers, "0.position", center);
      setCenter(nextCenter);
    });
  }, []);

  const addMarker = useCallback(event => {
    const {
      latLng: { lat, lng },
    } = event;
    const newMarker = {
      id: uniqueId(),
      position: { lat: lat(), lng: lng() },
      draggable: true,
      clickable: true,
      isShowInfo: true,
    };

    setMarkers(prevMarkers => [...prevMarkers, newMarker]);

    actions.openModal({
      title: "Test title",
      content: (
        <AutocompleteInput
          items={user.autocompleteNames}
          menuStyle={{
            borderRadius: "3px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 12px",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "2px 0px",
            fontSize: "90%",
            position: "fixed",
            overflow: "auto",
            maxHeight: "50%",
            left: 0,
            top: "" + undefined,
            minWidth: "181px",
          }}
        />
      ),
    });
  }, []);

  const deleteMarker = useCallback(
    index => {
      const copyMarkers = [...markers];
      copyMarkers.splice(index, 1);
      setMarkers(copyMarkers);
    },
    [markers],
  );

  const toggleMarkerInfo = useCallback(
    markerIndex => {
      const copyMarkers = [...markers];
      const marker = copyMarkers[markerIndex];

      marker.isShowInfo = marker.isShowInfo ? !marker.isShowInfo : true;
      setMarkers(copyMarkers);
    },
    [markers],
  );

  return (
    <Map
      mapRef={mapRef}
      searchBoxRef={searchBoxRef}
      center={center}
      markers={markers}
      onPlacesChanged={changePlaces}
      onClickMap={addMarker}
      onClickMarker={toggleMarkerInfo}
      onDeleteMarker={deleteMarker}
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
