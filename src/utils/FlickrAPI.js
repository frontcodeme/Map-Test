/**
 * @description FEND Project 8 : Neighborhood
 * @description utils to use flickr API
 * @author Alain Cadenat
 * @version 1.0
 */
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
const API = 'https://api.flickr.com/services/rest/';
const APIKey = '5bf1311525022cec7b4c3371d88ae3b6';
const picSearch = 'flickr.photos.search&format=json&nojsoncallback=1';
const request = API+'?&api_key='+APIKey;

/**
* @async function to get the first page of photo url on flickr
* @description search flickr for pics around the position, public and supposedly no family or friends
*/
export const searchPicByPosition = ( point ) => {
  let text = point.title.slice(0,point.title.indexOf(' '));
  (text==='hotel'|| text==='maison') ? text = '&text=monument' : text = '&text='+text;
  const url = `${request}&method=${picSearch}&lat=${point.position.lat}&lon=${point.position.lng}${text}`;
  return(fetch(url)
    .then (response =>response.json())
    .catch(error => {console.warn(error);})
  );};

  /**
   * @async function to get the photos. returns an array of promises
   * @description construct the url of pics with the result of search and get the blog
   * of the number max of photos desired.
   */
export const getPics = ( allPhotos, number ) => {

  allPhotos = allPhotos.filter(
    photo => (photo.ispublic)&!(photo.isfamily)&!(photo.isfriend)
  );
  allPhotos = allPhotos.slice(0, Math.min(number,allPhotos.length));
  allPhotos = allPhotos.map(
    photo=> getBlob(
      `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`
    ));

  return allPhotos;
};
/**
 * @async function to contruct blobs
 */
const getBlob= (url) =>
  fetch(`${url}`)
    .then (response => response.blob())
    .then(myBlob => URL.createObjectURL(myBlob));

