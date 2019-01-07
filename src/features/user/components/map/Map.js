import React from "react";
import { object, shape, number, func, array, oneOfType } from "prop-types";
import { GoogleMap, Marker, InfoWindow, Circle } from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";

const Map = ({
  mapRef,
  searchBoxRef,
  circleRef,
  center,
  markers,
  onPlacesChanged,
  onClickMap,
  onClickMarker,
  onDeleteMarker,
  onDragMarker,
  onChangeCircleCenter,
  onChangeCircleRadius,
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
        <div key={marker.id}>
          <Marker
            onClick={() => onClickMarker(index)}
            position={marker.position}
            clickable={marker.clickable}
            draggable={marker.draggable}
            onDrag={event => onDragMarker(event, index)}
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
          <Circle
            ref={circleRef}
            center={marker.position}
            radius={10000}
            editable={true}
            onRadiusChanged={() => onChangeCircleRadius(index)}
            onCenterChanged={() => onChangeCircleCenter(index)}
            onMouseDown={() => onChangeCircleCenter(index)}
          />
        </div>
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
