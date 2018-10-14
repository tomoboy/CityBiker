function getClosestStops(userLoc) {
    return fetch('/entur?lat=' + userLoc.lat + '&lng=' + userLoc.lng).then(response => response.json())
}

export default getClosestStops;