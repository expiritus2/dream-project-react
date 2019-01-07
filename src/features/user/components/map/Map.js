import React from "react";
import { object, shape, number, func, array, oneOfType } from "prop-types";
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";

const {
  SearchBox,
} = require("react-google-maps/lib/components/places/SearchBox");

const Map = ({
  mapRef,
  searchBoxRef,
  center,
  markers,
  onPlacesChanged,
  onClickMap,
  onClickMarker,
  onDeleteMarker,
}) => {
  return (
    <GoogleMap
      ref={mapRef}
      defaultZoom={10}
      defaultCenter={{ lat: 0, lng: 0 }}
      center={center}
      onClick={onClickMap}
    >
      <SearchBox
        ref={searchBoxRef}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Search places..."
          className="map-search"
        />
      </SearchBox>
      {markers.map((marker, index) => (
        <Marker
          key={marker.id}
          onClick={() => onClickMarker(index)}
          {...marker}
        >
          {(marker.isShowInfo === undefined || marker.isShowInfo) && (
            <InfoWindow onCloseClick={() => onClickMarker(index)}>
              <div>
                {marker.title && <div>{marker.title}</div>}
                <button onClick={() => onDeleteMarker(index)} type="button">
                  Delete
                </button>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
};

Map.propTypes = {
  onClickMap: func.isRequired,
  markers: array.isRequired,
  center: shape({
    lat: oneOfType([number, func]),
    lng: oneOfType([number, func]),
  }).isRequired,
  onPlacesChanged: func,
  mapRef: object,
  searchBoxRef: object,
};

Map.defaultProps = {
  mapRef: null,
  searchBoxRef: null,
};

export default Map;
