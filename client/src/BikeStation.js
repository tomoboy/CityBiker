import React from 'react'

function BikeStation({station}) {
    return (
        <tr>
            <td>{station.title}</td>
            <td>{station.distanceFromUser}m. </td>
            <td>{station.availableBikes}</td>
        </tr>
    )
}

export default BikeStation;