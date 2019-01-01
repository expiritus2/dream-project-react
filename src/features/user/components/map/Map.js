import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
const {
  SearchBox,
} = require("react-google-maps/lib/components/places/SearchBox");

const Map = () => {
  return (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      <SearchBox
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={e => console.log(e)}
      >
        <input
          type="text"
          placeholder="Customized your placeholder"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </SearchBox>
      <Marker
        draggable={true}
        position={{ lat: -34.397, lng: 150.644 }}
        clickable={true}
      >
        <InfoWindow draggable={true} position={{ lat: -34.397, lng: 150.644 }}>
          <div>Title</div>
        </InfoWindow>
      </Marker>
    </GoogleMap>
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
)(Map);
