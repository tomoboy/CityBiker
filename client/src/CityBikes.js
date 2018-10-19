
export default function getClosestAvailableStations(userLoc) {
    return fetch('/citybikes?lat=' + userLoc.lat + '&lng=' + userLoc.lng).then(response => response.json())

}
