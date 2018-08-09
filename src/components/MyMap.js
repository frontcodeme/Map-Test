/**
 * @description FEND Project 8 : Neighborhood
 * @description map component
 * @author Alain Cadenat
 * @version 1.0
 */
/* eslint-disable */
/**
 * @description import React and router
 */
import React from 'react';
import { compose, withProps } from 'recompose';

/**
 * @description import map components
 */
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

/**
 * @description import app components
 */
import ShowPlace from './ShowPlace';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';

/**
 * @description import styles for the app and the map
 */
import MapStyle from '../data/MapStyle';
import '../styles/App.css';
/* eslint-enable */

/**
 * @description component to display the map, markers and infobox
 * @type { mapCenter: Object }
 * @type { placesOfInterest: Array }
 * @type { selectedId: Number}
 * @type { mouseOverId: Number}
 * @type { pics: Array }
 * @type { markerClicked: function}
 * @type { markerOver: function}
 * @type { markerOut: function}
 */
export const MyMap = compose(

  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDB59_aZ7Ln3BKuH51US0pyaM5vbqkKhrI',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div className="map" style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,

)((props) => {
  const normalZoom = 9;
  const placeZoom = 11;
  let zoom;
  (props.selectedId===-1) ? zoom = normalZoom : zoom = placeZoom;

  return (
    <GoogleMap
      zoom={zoom}
      center={props.mapCenter}
      defaultOptions={{ styles: MapStyle}}
      mapTypeId='terrain'
      onTilesLoaded={()=>{
        let map = document.querySelector('iframe');
        map.setAttribute('title','Herault\'s google map');
      }}
    > { props.placesOfInterest.map(point => {
        let markerUrl='icons/monument-historique.png';
        if (point.id===props.selectedId) markerUrl='icons/monument-historique-selected.png';
        if (point.id===props.mouseOverId)  markerUrl='icons/monument-historique-hover.png';
        return (
          <Marker
            key={point.id}
            position = {point.position}
            icon = {markerUrl}
            onClick = { (event) => props.markerClicked(event,point)}
            onMouseOver = { () => props.markerOver(point)}
            onMouseOut = { () => props.markerOut()}
            title= { point.title }
          >
            {(point.id===props.selectedId) &&  (
              <InfoBox
                onCloseClick={ () => props.infoBoxClosed()} >
                <div className="info-point" tabIndex='0'>
                  <div className="info-title" >
                    <p>{ point.translatedTitle }</p>
                    <ShowPlace
                      pics = {props.pics} />
                  </div>
                </div>
              </InfoBox>)}
          </Marker>
        );})
      }
    </GoogleMap>
  );});


