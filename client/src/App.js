import React, {Component} from 'react';
import getStations from './CityBikes';
import getStops from './Entur'
import BikeStations from './BikeStations'
import CollectiveStops from './CollectiveStops'
import MapContainer from './MapContainer'
import 'bulma/css/bulma.css'

const defaultLoc = {
    lat: 59.9160732,
    lng: 10.7715069
};

class App extends Component {
    state = {
        stations: [],
        stops: [],
        userLocation: defaultLoc,
        waitingForLocation: true,
    };
    constructor(props) {
        super(props);
        this.gotPosition = this.gotPosition.bind(this);
    }

    gotPosition(userLoc) {
        if(!userLoc.hasOwnProperty('lat')){
            userLoc = defaultLoc;
        }
        this.setState({
            userLocation: userLoc,
        });
        return Promise.all([
            getStops(userLoc),
            getStations(userLoc)
        ]).then(([stops, stations]) => this.setState({
            stations: stations,
            stops: stops,
            userLocation: userLoc,
            waitingForLocation: false,
        }))
    }

    componentDidMount() {
        if (navigator.geolocation ){
            navigator.geolocation.getCurrentPosition(position =>
                this.gotPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            );
        }else{
            this.gotPosition(defaultLoc);
        }
    }

    render() {
        return (
            <div>
                <section className="hero is-info is-bold">
                    <div className="hero-body">
                        <h1 className="title is-3">
                            To Bike Or Not To Bike
                        </h1>
                        <h2 className="subtitle is-5">
                            See the different options for biking or public transport. Click on the map to change location.
                        </h2>
                    </div>
                </section>
                <div className="columns is-multiline is-hidden-mobile">
                    <BikeStations
                        stations={this.state.stations}
                    />
                    <CollectiveStops
                        stops={this.state.stops}
                    />
                </div>
                {
                    (this.state.waitingForLocation) ?
                        <button className="button is-light"
                                onClick={() => this.gotPosition(defaultLoc)}>Use default Location</button>
                        :
                        <MapContainer classNAme="box"
                                      initialLoc={this.state.userLocation}
                                      stops={this.state.stops}
                                      stations={this.state.stations}
                                      onClick={this.gotPosition.bind(this)}
                        />
                }
                <footer className="is-hidden-mobile" style={{
                    position: 'fixed',
                    fontSize: '5pt',
                    bottom: 0,
                    padding: '1rem',
                    backgroundColor: 'g'
                }}>
                    <div>Icons made by <a href="https://www.flaticon.com/authors/google" title="Bike">Bike</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a>,
                        <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a>,  <a href="https://www.flaticon.com/authors/freepik" title="School Bus front">School Bus front</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"     title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>
                </footer>
            </div>
        )
    }

}

export default App;
