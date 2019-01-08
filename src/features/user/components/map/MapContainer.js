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
  const circleRef = useRef();

  const [[user, modal], actions] = useRedux(["user", "modal"], { openModal });

  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [markers, setMarkers] = useState([]);
  const [newMarkerName, setNewMarkerName] = useState(null);

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

  useEffect(
    () => {
      if (!modal.isOpen) {
        const copyMarkers = [...markers];
        const profiledMarkers = copyMarkers.filter(marker => {
          return !!marker.title;
        });
        if (profiledMarkers.length > 0) {
          setMarkers(profiledMarkers);
        }
      }
    },
    [modal.isOpen],
  );

  useEffect(
    () => {
      const copyMarkers = [...markers];
      console.log(newMarkerName);
      if (copyMarkers.length > 0) {
        copyMarkers[copyMarkers.length - 1].title = newMarkerName;
        setMarkers(copyMarkers);
      }
    },
    [newMarkerName],
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
            top: undefined,
            minWidth: "181px",
          }}
          onChange={event => setNewMarkerName(event.target.value)}
          onSelect={val => setNewMarkerName(val)}
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

  const changeMarkerPosition = useCallback((event, markerIndex) => {
    const copyMarkers = [...markers];
    copyMarkers[markerIndex].position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkers(copyMarkers);
  });

  const onChangeCircleCenter = useCallback(markerIndex => {
    // const {lat, lng} = circleRef.current.getCenter();
    // const copyMarkers = [...markers];
    // copyMarkers[markerIndex].position = {lat: lat(), lng: lng()};
    // setMarkers(copyMarkers);
  });

  const onChangeCircleRadius = useCallback(markerIndex => {
    // console.log(circleRef.current.getRadius());
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
      onDragMarker={changeMarkerPosition}
      onChangeCircleCenter={onChangeCircleCenter}
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
