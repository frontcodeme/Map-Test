
/**
 * @description FEND Project 8 : Neighborhood
 * @description SearchPlace component
 * @author Alain Cadenat
 * @version 1.0
 *//* eslint-disable */
/**
 * @description import React, Component and Proptypes
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable */

/**
 * @description component to search places
 * @type { updateQuery: function }
 * @type { query: string }
 * @type { ariaHidden: boolean }
 */
class SearchPlace extends Component {

  static propTypes = {
    updateQuery: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    ariaHidden: PropTypes.bool.isRequired
  }


  render() {
    const { updateQuery, query, ariaHidden} = this.props;
    return (
      <div
        id="place-search"
        title= "Place searching menu"
        aria-hidden = {ariaHidden}>
        <input
          className='search-place'
          type='text'
          placeholder='Search a place by name or monument'
          title="Search a monument"
          value={query}
          onChange = {(event) => updateQuery(event.target.value)}
        />
      </div>
    );
  }
}

export default SearchPlace;


