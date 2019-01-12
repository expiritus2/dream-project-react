import React, { useRef, useCallback, useState, useEffect } from "react";
import { useRedux } from "hooks";
import { get } from "lodash-es";
import { compose, withProps } from "recompose";
import { uniqueId } from "lodash-es";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import { openModal } from "components/modal/modules/actions";
import MarkerInfoForm from "../marker-info-form";

import Map from "./Map";

const MapContainer = () => {
  const searchBoxRef = useRef();
  const mapRef = useRef();
  const circleRef = useRef();

  const [[user, modal], actions] = useRedux(["user", "modal"], { openModal });

  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [markers, setMarkers] = useState([]);

  const setMapCenterByFirstVisit = useCallback(() => {
    if (user.markers.length > 0) {
      setCenter(user.markers[0].position);
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCenter({ lat: latitude, lng: longitude });
        },
      );
    }
  });

  const setUserMarkersToState = useCallback(() => {
    if (user.markers.length > 0) {
      setMarkers(user.markers);
    }
  });

  const removeMarkerWithoutTitleByCloseModal = useCallback(() => {
    if (!modal.isOpen) {
      const copyMarkers = [...markers];
      const profiledMarkers = copyMarkers.filter(marker => {
        return !!marker.title;
      });

      if (profiledMarkers.length > 0) {
        setMarkers(profiledMarkers);
      }
    }
  });

  useEffect(() => {
    setMapCenterByFirstVisit();
    setUserMarkersToState();
  }, []);

  useEffect(
    () => {
      removeMarkerWithoutTitleByCloseModal();
    },
    [modal.isOpen],
  );

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

  const setMarkerName = useCallback((marker, name) => {
    marker.title = name;
    setMarkers(prevMarkers => [...prevMarkers]);
  });

  const addMarker = useCallback(event => {
    const {
      latLng: { lat, lng },
    } = event;
    const newMarker = {
      id: uniqueId(),
      title: "",
      position: { lat: lat(), lng: lng() },
      radius: 500,
      draggable: true,
      clickable: true,
      isShowInfo: true,
    };

    setMarkers(prevMarkers => [...prevMarkers, newMarker]);

    actions.openModal({
      title: "Add marker info",
      content: (
        <MarkerInfoForm
          autocompleteNames={user.autocompleteNames}
          setNameToMarker={name => setMarkerName(newMarker, name)}
          title=""
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

  const onDragMarker = useCallback((event, markerIndex) => {
    const copyMarkers = [...markers];
    copyMarkers[markerIndex].position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkers(copyMarkers);
  });

  const onChangeCircleRadius = useCallback(markerIndex => {
    const radius = circleRef.current.getRadius();
    const copyMarkers = [...markers];
    copyMarkers[markerIndex].radius = radius;
    setMarkers(copyMarkers);
  });

  const onAddMoreMarkerInfo = useCallback(markerIndex => {
    actions.openModal({
      title: "Add info",
      content: (
        <MarkerInfoForm
          autocompleteNames={user.autocompleteNames}
          setNameToMarker={name => setMarkerName(markers[markerIndex], name)}
          title={markers[markerIndex].title}
        />
      ),
    });
  });

  return (
    <Map
      mapRef={mapRef}
      searchBoxRef={searchBoxRef}
      circleRef={circleRef}
      center={center}
      markers={markers}
      onPlacesChanged={changePlaces}
      onClickMap={addMarker}
      onClickMarker={toggleMarkerInfo}
      onDeleteMarker={deleteMarker}
      onDragMarker={onDragMarker}
      onAddMoreMarkerInfo={onAddMoreMarkerInfo}
      onChangeCircleRadius={onChangeCircleRadius}
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
