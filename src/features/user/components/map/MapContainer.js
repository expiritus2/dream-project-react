import React, { useRef, useCallback, useState, useEffect } from "react";
import { useRedux, useTranslate, usePrevious } from "hooks";
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

  const [translate] = useTranslate();
  const [[user, modal], actions] = useRedux(["user", "modal"], { openModal });

  const wasMadalOpen = usePrevious(modal.isOpen);

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
    if (wasMadalOpen) {
      const copyMarkers = [...markers];
      const profiledMarkers = copyMarkers.filter(marker => {
        return marker.title !== "";
      });

      setMarkers(profiledMarkers);
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

  const setMarkerTitle = useCallback((marker, name) => {
    marker.title = name;
    setMarkers(prevMarkers => [...prevMarkers]);
  });

  const setFilesAsDataURLToMarker = useCallback((marker, filesAsDataUrl) => {
    marker.previewImages = filesAsDataUrl;
    setMarkers(prevMarkers => [...prevMarkers]);
  });

  const deletePreviewImageOnMarker = useCallback(
    (marker, previewImageIndex) => {
      marker.previewImages.splice(previewImageIndex, 1);
      setMarkers(prevMarkers => [...prevMarkers]);
    },
  );

  const addMarker = useCallback(
    event => {
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
            setTitleToMarker={title => setMarkerTitle(newMarker, title)}
            setFilesAsDataURLToMarker={filesDataURL =>
              setFilesAsDataURLToMarker(newMarker, filesDataURL)
            }
            deletePreviewImageOnMarker={previewImageIndex =>
              deletePreviewImageOnMarker(newMarker, previewImageIndex)
            }
            title=""
          />
        ),
      });
    },
    [markers],
  );

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
      title: "Edit info",
      content: (
        <MarkerInfoForm
          autocompleteNames={user.autocompleteNames}
          setTitleToMarker={name => setMarkerTitle(markers[markerIndex], name)}
          setFilesAsDataURLToMarker={filesDataURL =>
            setFilesAsDataURLToMarker(markers[markerIndex], filesDataURL)
          }
          deletePreviewImageOnMarker={previewImageIndex =>
            deletePreviewImageOnMarker(markers[markerIndex], previewImageIndex)
          }
          images={markers[markerIndex].previewImages || []}
          title={markers[markerIndex].title}
        />
      ),
    });
  });

  return (
    <Map
      translate={translate}
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
