/**
 * @description FEND Project 8 : Neighborhood
 * @description Sliding sidebar menu component
 * @author Alain Cadenat
 * @version 1.0
 */
/* eslint-disable */
/**
 * @description import React, Component and PropTypes
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @description import Link
 */
import { Link } from 'react-router-dom';

/**
 * @description import components
 */
import SearchPlace from './SearchPlace';
import ListPlaces from './ListPlaces';
import ShowPlace from './ShowPlace';
/* eslint-ensable */

/**
 * @description component of the sidebar sliding menu
 * @type { places: Array }
 * @type { selectedId: Number}
 * @type { query: string }
 * @type { pics: Array }
 * @type { updateQuery: function}
 * @type { listElementClicked: function}
 */
class SideBar extends Component {

/**
 * @description set the default state
 * @type { menuOn: boolean}
 */
  state = { menuOn: false }

  /**
   * @callback Change the state of the menu hidden or not
   */
  toggleMenu = () => {
    const menuOn = this.state.menuOn;
    this.setState({ menuOn: !menuOn});
  }

  /**
   * @description render the sidebar menu
   */
  render() {
    const { menuOn } = this.state;
    const { places, pics, listElementClicked, updateQuery, query, selectedId, resetQuery } = this.props;

    /**
     * handle focus for the hidden menu sidebar
     */
    let classMenu='';
    let tabIndex ='';
    (menuOn) ? classMenu='sidebar menu-open' : classMenu='sidebar menu-closed';
    (menuOn) ? tabIndex='0': tabIndex='-1';

    /**
     * render the menu sidebar
     */
    return(
      <aside
        className= {classMenu}>
        <button
          onClick={ this.toggleMenu }
          className="menu-icon"
        >
          toggle menu
        </button>
        <h2 className = "sidebar-title"> Search a place or a monument</h2>
        <SearchPlace
          ariaHidden = { !menuOn }
          query = { query}
          updateQuery = { updateQuery }
          tabIndex = { tabIndex }
        />
        <ListPlaces
          ariaHidden = { !menuOn }
          tabIndex =  { tabIndex }
          query = { query}
          places= {places}
          listElementClicked = { listElementClicked }
          selectedId = { selectedId }
        />
        <ShowPlace
          pics = {pics}
        />
        {(pics.length>1) && (
          <div>
            <Link
              className="pics-link"
              to='/pics'> See more photos...
            </Link>
            <p
              className = "close-link"
              role = "link"
              tabIndex = "0"
              onKeyUp = { (event) => resetQuery(event.key) }
            >
              Close photo
            </p>
          </div>
        )}

      </aside>
    );
  }
}

export default SideBar;