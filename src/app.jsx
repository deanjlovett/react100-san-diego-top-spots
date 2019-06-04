import React, { Component } from 'react';
import axios from 'axios';
import TopSpot from './topspot';

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
        topspots: []
      };
  }

  componentWillMount() {
    axios
      .get('https://origin-top-spots-api.herokuapp.com/api/topspots')
      .then(response => response.data)
      .then(topspots => this.setState({ topspots }));
  }

  /******************************************************************************/
  /***                                                                         **/
  /***         Stolen from....                                                 **/
  /***         http://www.geodatasource.com/developers/php                     **/
  /***         GeoDataSource.com (C) All Rights Reserved 2015		   		     **/
  /***                                                                         **/
  /******************************************************************************/
  distance(loc) {
    var lat1 = loc[LAT];
    var lon1 = loc[LONG];

    var lat2 = lat1; // default lat2 to safe default value
    var lon2 = lon1; // default lat2 to safe default value

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p)=>{
        lat2 = p.coords.latitude;
        lon2 = p.coords.longitude;
      }, 
      (e)=>{});
    }else{
      return 0; // oops!  Cannot get geolocation return a safe distance 
    }

    var lat1 = loc[0]; //const LAT = 0;
    var lon1 = loc[1]; //const LONG = 1;
    var theta = lon1 - lon2;
    // var dist = Math.sin(Math.deg2rad(lat1)) * Math.sin(Math.deg2rad(lat2)) 
    //     + Math.cos(Math.deg2rad(lat1)) * Math.cos(Math.deg2rad(lat2)) * Math.cos(Math.deg2rad(theta));
    var dist = mySin(lat1) * mySin(lat2) 
        + myCos(lat1) * myCos(lat2) * myCos(theta);
    dist = Math.rad2deg( Math.acos( dist ) );
    //dist = Math.rad2deg(dist);
    var miles = dist * 60 * 1.1515;
    return miles;
  }
  mySin(v) {
    return Math.sin(Math.deg2rad(v));
  }
  myCos(v) {
    return Math.cos(Math.deg2rad(v));
  }


  render() {
    return (
      <div className='App'>
        <div className='container'>
          <div className='jumbotron'>
            <h1>San Diego Top Spots</h1>
            <p>A list of top 30 places to see in San Diego, California.</p>
          </div>
          { this.state.topspots.map( topspot => (
            
            <TopSpot
              key={topspot.id}
              name={topspot.name}
              description={topspot.description}
              location={topspot.location}
            />
          ))
          }
        </div>
      </div>
    );
  }

}

export default App;