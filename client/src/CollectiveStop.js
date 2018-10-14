import React from 'react'
import EstimatedCall from './EstimatedCall'
function CollectiveStop({stop}) {
    return (
        <div className='column is-narrow '>
            <h2 className="subtitle is-spaced"><img className="icon" src="/school-bus-front.png" alt="bus"/>
                {stop.name} {(stop.transportMode !== 'unknown') ? stop.transportMode: ''}</h2>
            <table className='table is-striped'>
                <thead>
                <tr>
                    <th>Destination</th>
                    <th>Time left</th>
                </tr>
                </thead>
                <tbody>
                {
                    stop.estimatedCalls.map((call, index) =>
                        <EstimatedCall
                            key={'call' + index}
                            call={call}
                        />
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default CollectiveStop;