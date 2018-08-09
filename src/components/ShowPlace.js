/**
 * @description FEND Project 8 : Neighborhood
 * @description component to display a photo
 * @author Alain Cadenat
 * @version 1.0
 */
/* eslint-disable */
/**
 * @description import React Component and Proptypes
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* eslint-enable */


/**
 * @description component to show a pic of a selected place
 * @type { pics: array }
 */
class ShowPlace extends Component {

  static propTypes = {
    pics: PropTypes.array.isRequired
  }

  render () {
    const pics=this.props.pics;

    return (
      <div className="pic-container">
        {(pics.length!==0) && (<img tabIndex= "0" className="pic-of-place" src={pics[0].url} alt={pics[0].alt} />)}
      </div>
    );
  }
}

export default ShowPlace;