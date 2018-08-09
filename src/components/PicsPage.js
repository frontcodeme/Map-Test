/**
 * @description FEND Project 8 : Neighborhood
 * @description component for the photo page
 * @author Alain Cadenat
 * @version 1.0
 *//* eslint-disable */
/**
 * @description import React and React Router
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * @description import components
 */
import {MyMap} from './MyMap';
import {searchPicByPosition, getPic} from '../utils/FlickrAPI';
import SideBar from './SideBar';
import Header from './Header';
import Footer from './Footer';

/**
 * @description import css file
 */
import '../styles/App.css';
/* eslint-enable */

/**
 * @description Component to render the page with pics from Flickr
 */
class PicsPage extends Component {

  /**
   * @description Reset the query to render the default map
   * resetQuery isn't called from an event so we pass it the right param.
   */
  componentWillUnmount() {
    this.props.resetQuery('Enter');
  }

  /**
   * @description render the page
   */
  render() {

    const { selectedId, searchedPoints } = this.props;
    let pics = this.props.pics;
    let pageTitle;
    /**
     * Handle the error case of no place selected when user click the
     * back arrow of the browser, and set a default title and no pic image
     */
    if (selectedId!==-1) {
      pageTitle=searchedPoints.filter( point => (selectedId===point.id))[0];
      pics = pics.slice(0, Math.min(8,pics.length));
    }
    else {
      pageTitle = {translatedTitle: 'no place selected'};
      pics =[{key: 0, url:'icons/no_pic.jpg', alt:'No photo available'}];
    }

    return (
      <div className="pics-page">
        <Header />
        <Link to =  '/' className = "back-to-map">
          <p>Back to map</p>
        </Link>
        <div className="pics-container">
          <h2 className="pics-title">Flickr's photos about: {pageTitle.translatedTitle}</h2>
          {pics.map((pic) =>
            <img
              tabIndex="0"
              className="pic-of-place"
              key={pic.key}
              src={pic.url}
              alt={pic.alt}
            />
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default PicsPage;