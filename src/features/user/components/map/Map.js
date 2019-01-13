import React from "react";
import { object, shape, number, func, array, oneOfType } from "prop-types";
import { GoogleMap, Marker, InfoWindow, Circle } from "react-google-maps";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox";
import { uniqueId } from "lodash-es";

const Map = ({
  translate,
  mapRef,
  searchBoxRef,
  circleRef,
  center,
  markers,
  onPlacesChanged,
  onClickMap,
  onClickMarker,
  onDeleteMarker,
  onAddMoreMarkerInfo,
  onDragMarker,
  onChangeCircleRadius,
}) => {
  return (
    <GoogleMap
      ref={mapRef}
      defaultZoom={13}
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
                <div className="marker-info-window">
                  <div className="marker-info-window__title-wrapper">
                    {marker.title && <div>{marker.title}</div>}
                  </div>
                  <div className="marker-info-window__preview-images-wrapper">
                    {marker.previewImages &&
                      marker.previewImages.map((previewImage, index) => (
                        <div
                          key={uniqueId()}
                          className="marker-info-window__image-holder"
                        >
                          {index < 2 && <img src={previewImage} alt="" />}
                          {index === 2 && (
                            <span className="marker-info-window__image-holder__elipsis">
                              ...
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                  <button onClick={() => onDeleteMarker(index)} type="button">
                    {translate("map.marker.infoWindow.delete")}
                  </button>
                  <button onClick={() => onAddMoreMarkerInfo(index)}>
                    {translate("map.marker.infoWindow.edit")}
                  </button>
                </div>
              </InfoWindow>
            )}
          </Marker>
          <Circle
            ref={circleRef}
            center={marker.position}
            radius={marker.radius}
            options={{
              strokeColor: "#F83A3C",
              strokeWeight: 1,
              fillColor: "#F83A3C",
              fillOpacity: 0.35,
            }}
            editable={true}
            onRadiusChanged={() => onChangeCircleRadius(index)}
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
