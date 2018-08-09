/**
 * @description FEND Project 8 : Neighborhood
 * @description Footer component
 * @author Alain Cadenat
 * @version 1.0
 */
/**
 * @description import React and Component
 */
import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

/**
 * @description component to render a fixed footer
 */
class Footer extends Component {

  render() {
    return(
      <footer className="footer">
        <p className="footer-text">Developped by A. Cadenat. Data: french government open data project
         historical heritage database. Photos provided by Flickr</p>
      </footer>
    );
  }
}

export default Footer;