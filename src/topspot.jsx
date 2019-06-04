import React from 'react';

export default props => (
    <div className='well'>
        <h4>{props.name}</h4>
        <p>{props.description}</p>
        <a href={'https://maps.google.com/?q=' + props.location }>
            <button className="btn btn-primary">Click to open in Google Maps</button>
        </a>
    </div>
);
//
// const LAT = 0;
// const LONG = 1;
//
//  <a href={'https://maps.google.com/?q=' + props.location[LAT] + ',' + props.location[LONG] }>
//      <button className="btn btn-primary">Click to open in Google Maps</button>
//  </a>


