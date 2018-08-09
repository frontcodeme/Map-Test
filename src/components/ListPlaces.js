/**
 * @description FEND Project 8 : Neighborhood
 * @description Searchable list of place component
 * @author Alain Cadenat
 * @version 1.0
 *//* eslint-disable */
/**
 * @description import React, Component and PropTypes
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* eslint-ensable*/

/**
 * @description component to render the list of places in accordance with
 * the query
 * @type { places: array }
 * @type { selectedId: number }
 * @type { listElementClicked: function }
 */
class ListPlaces extends Component {

  static propTypes = {
    places: PropTypes.array.isRequired,
    selectedId: PropTypes.number.isRequired,
    listElementClicked: PropTypes.func.isRequired
  }

/**
 * @description function to have the selected place on top of list
 * when clicking on markers in the map, in the list
 */
  scrollList() {
    const firstPlace = Array.from(document.getElementsByClassName('place-listed'));
    const placeSelected = Array.from(document.getElementsByClassName('selected'));
    if (firstPlace.length) firstPlace[0].scrollIntoView();
    if (placeSelected.length) placeSelected[0].scrollIntoView();
  }

/**
 * @description scroll the list each time the component is mounted or
 * updated
 */
  componentDidMount() {
    this.scrollList();
  }

  componentDidUpdate() {
    this.scrollList();
  }

  /**
   * @description render the list of places
   */
  render() {
    const { places, listElementClicked, selectedId } = this.props;
    let placesListed=[];
    for (let i=0; i<places.length; i++) {
      placesListed[i] = places[i];
    }

    return (
      <ul className="list-of-places"
        title= "Places of interest"
        tabIndex= {this.props.tabIndex}
        aria-label = 'Places of interest'
        aria-hidden = {this.props.ariaHidden}>
        {placesListed.map(place => {
          let placeClass='';
          (place.id===selectedId) ? placeClass = 'place-listed selected' : placeClass= 'place-listed';
          return(
            <li
              aria-label= {`link ${place.translatedTitle}`}
              title= "Places of interest"
              tabIndex= {this.props.tabIndex}
              aria-hidden = {this.props.ariaHidden}
              key= {place.id}
              className={placeClass}
              onClick = { (event) => listElementClicked(event, place)}
              onKeyUp = { (event) => listElementClicked(event, place)}
            >
              <p>{place.translatedTitle}</p>
            </li>
          );})}
      </ul>

    );
  }
}

export default ListPlaces;