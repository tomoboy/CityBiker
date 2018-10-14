import React from 'react'
import CollectiveStop from './CollectiveStop'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const GOOGLE_API_KEY = '';

const iconOption = url => {return { url: url, scaledSize: { width: 32, height: 32 }}};
const busIcon = iconOption('/school-bus-front.png');
const bikeIcon = iconOption('/bike.png');
const placeHolderIcon = iconOption('/placeholder.png');

export class MapContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pos: {
                lat: props.initialLoc.lat,
                lng: props.initialLoc.lng
            },
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            initialLoc: props.initialLoc,
        };
        this.onMapClick = this.onMapClick.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }

    onMapClick(props, marker, e) {
        let pos = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };
        if (this.state.showingInfoWindow){
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
            })
        }
        this.setState({pos});
        this.props.onClick(pos)
    }
    render() {
        const style = {
            width: '100vw',
            height: '75vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
        }
        return (
            <Map
                key={this.state.lat + this.state.lng}
                google={this.props.google}
                zoom={15.5}
                center={this.state.pos}
                onClick ={this.onMapClick}
                initialCenter={this.state.initialLoc}
                style={style}
            >
                <Marker onClick={this.onMarkerClick}
                        title = {'This is you'}
                        position = {this.state.pos}
                        icon={placeHolderIcon}
                        name={'Current location'}/>
                {
                    this.props.stations.map((station, index) =>
                        <Marker onClick={this.onMarkerClick}
                                key={station.title + index}
                                title = {station.title}
                                position = {{lat: station.center.latitude, lng: station.center.longitude}}
                                icon={bikeIcon}
                                name={
                                    <div>
                                        <h2 className="subtitle">{station.subtitle}</h2>
                                        <h3 className="subtitle">Available Bikes:  {station.availableBikes} </h3>
                                    </div>
                                }
                        />
                    )
                }
                {
                    this.props.stops.map((stop, index) =>
                        <Marker onClick={this.onMarkerClick}
                                key={stop.name + index}
                                title = {stop.name}
                                position = {{lat: stop.latitude, lng: stop.longitude}}
                                icon={busIcon}
                                name={
                                    <CollectiveStop
                                        key={'CollectiveInfo' + index}
                                        stop={stop}
                                    />}
                        />
                    )
                }
                <InfoWindow
                    marker = {this.state.activeMarker}
                    visible = {this.state.showingInfoWindow}
                >
                    <div>
                        {this.state.selectedPlace.name}
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: GOOGLE_API_KEY
})(MapContainer)