var {GraphQLClient} = require('graphql-request');
const _ = require('lodash');
const geolib = require('geolib');

const API_CLIENTNAME = '';
//const API_WEBSITE = 'https://www.entur.org/dev/';

function getQuery(userLoc, margin) {
    let minLat = userLoc.lat - margin;
    let maxLat = parseFloat(userLoc.lat) + margin;
    let minLng = userLoc.lng - margin;
    let maxLng = parseFloat(userLoc.lng) + margin;

    return `{
      stopPlacesByBbox(minimumLatitude: ${minLat}, minimumLongitude: ${minLng}, maximumLatitude: ${maxLat}, maximumLongitude: ${maxLng}) {
        id
        name
        latitude
        longitude
        description
        transportMode
        estimatedCalls(numberOfDepartures: 5) {
          expectedArrivalTime
          destinationDisplay {
            frontText
          }
        }
      }
    }`
}

function getStops(userLoc){
     const client = new GraphQLClient(
         'https://api.entur.org/journeyplanner/2.0/index/graphql', {
             headers: {
                 'ET-Client-Name': API_CLIENTNAME,
                 'Content-Type': 'application/json',
             }});
    return client.request(getQuery(userLoc, 0.01))
}

function getClosestStops(userLoc) {
    const distance = stop => geolib.getDistance(
        _.pick(stop, ['latitude', 'longitude']),
        {
            latitude: userLoc.lat,
            longitude: userLoc.lng
        }
    );
    return getStops(userLoc).then(({stopPlacesByBbox}) => {
        return stopPlacesByBbox
            .filter(stop => stop.estimatedCalls.length > 0)
            .map(stop => {
                return {
                    distanceFromUser: distance(stop),
                    ...stop
                }
            })
            .sort((a, b) => a.distanceFromUser - b.distanceFromUser)
            .slice(0, 4)
    })
}

module.exports = getClosestStops;