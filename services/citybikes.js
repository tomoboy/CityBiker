const geolib = require('geolib');
const _ = require('lodash');
const CITYBIKE_API_TOKEN = '';
//const API_WEBSITE = 'https://developer.oslobysykkel.no/api'
const request = require('request-promise');

function getRequest(url){
    return request({
        url: url,
        headers:
        {
            'Client-Identifier': CITYBIKE_API_TOKEN
        },
        json:true
        }
    )
}

function getStations() {
    return getRequest('https://oslobysykkel.no/api/v1/stations')
}

function getAvailableBikesList() {
    return getRequest('https://oslobysykkel.no/api/v1/stations/availability')
}

function getAvailableBikesForStation(availableBikes, station){
    return _.find(availableBikes, stationsWithBikes => stationsWithBikes.id === station.id).availability.bikes;
}

function getClosestAvailableStations(userLoc){
    return Promise.all([
        getStations(),
        getAvailableBikesList()
    ]).then(([stationsReponse, bikeResponse]) => {
        const distance = station => geolib.getDistance(
            _.pick(station.center, ['latitude', 'longitude']),
            {
                latitude: userLoc.lat,
                longitude: userLoc.lng
            });

        let stationsWithBikes = bikeResponse.stations.filter(station => station.availability.bikes > 0);
        let stationsWithBikesIds = stationsWithBikes.map(station => station.id);
        return stationsReponse.stations
            .filter(station => stationsWithBikesIds.includes(station.id))
            .map(station => {
                return {
                    availableBikes: getAvailableBikesForStation(stationsWithBikes, station),
                    distanceFromUser: distance(station),
                    ...station
                }
            })
            .sort((a, b) => a.distanceFromUser - b.distanceFromUser)
            .slice(0, 5);
    })
}

module.exports = getClosestAvailableStations;