import React from 'react'

function getRemainingTime(expectedTime){
    let currentTime = new Date();
    return ((expectedTime.getHours() - currentTime.getHours()) * 60) + (expectedTime.getMinutes() - currentTime.getMinutes())
}

function EstimatedCall({call}) {
    return(
        <tr>
            <td>{call.destinationDisplay.frontText}</td>
            <td>{getRemainingTime(new Date(call.expectedArrivalTime))} min.</td>
        </tr>
    )
}

export default EstimatedCall;