import React from 'react'
import PropTypes from 'prop-types'
import BikeStation from './BikeStation'

function BikeStations({stations}) {
    return (stations.length > 0) ?
        (
        <div className="column is-narrow">
                <h2 className="subtitle is-spaced"><img className="icon" src="/bike.png" alt="bikes"/>City Bike
                    stations:</h2>
                <table className="table is-striped">
                    <thead className="thead">
                    <tr>
                        <th>Name</th>
                        <th>Distance</th>
                        <th>Free Bikes</th>
                    </tr>
                    </thead>
                    <tbody className="tbody">
                    {
                        stations.map((station, index) =>
                            <BikeStation
                                key={'station' + index}
                                station={station}
                            />
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
        :<div className="column"><h1 className="title"> No bikes to show </h1></div>
}

BikeStations.propTypes = {
    stations: PropTypes.array,
};

export default BikeStations;