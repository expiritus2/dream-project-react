import React, { useRef, useCallback, useState, useEffect } from "react";
import { useRedux } from "hooks";
import { get } from "lodash-es";
import { compose, withProps } from "recompose";
import { uniqueId } from "lodash-es";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import Map from "./Map";
import { AutocompleteInput } from "components";
import { autocompleteNames } from "features/user/modules/actions";

const MapContainer = () => {
  const searchBoxRef = useRef();
  const mapRef = useRef();

  const [user, actions] = useRedux("user", { autocompleteNames });

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

  const changePlaces = useCallback(
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
          searchBoxRef,
        }));
        const nextCenter = get(nextMarkers, "0.position", center);
        setCenter(nextCenter);
      });
    },
    [center],
  );

  // useEffect(() => {
  //   const copyMarkers = [...markers];
  //   const lastAddedMarker = copyMarkers[markers.length - 1];
  //   if (lastAddedMarker) {
  //     lastAddedMarker.title = markerTitle;
  //   }
  // }, [markerTitle]);
  //
  // const changeMarkerTitle = useCallback(event => {
  //   setMarkerTitle(event.target.value);
  // });

  const addMarker = useCallback(
    event => {
      const {
        latLng: { lat, lng },
      } = event;
      const newMarker = {
        id: uniqueId(),
        position: { lat: lat(), lng: lng() },
        titleInput: <AutocompleteInput items={user.autocompleteNames} />,
        draggable: true,
        clickable: true,
        isShowInfo: true,
      };

      setMarkers(prevMarkers => [...prevMarkers, newMarker]);
      actions.autocompleteNames();
    },
    [markers],
  );

  const deleteMarker = useCallback(index => {
    const copyMarkers = [...markers];
    copyMarkers.splice(index, 1);
    setMarkers(copyMarkers);
  });

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
