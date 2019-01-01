import React from "react";
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
  onClick,
}) => {
  return (
    <GoogleMap ref={mapRef} defaultZoom={8} center={center} onClick={onClick}>
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
      {markers.map(marker => (
        <Marker key={marker.id} {...marker}>
          <InfoWindow>
            <div>{marker.title}</div>
          </InfoWindow>
        </Marker>
      ))}
    </GoogleMap>
  );
};

export default Map;
