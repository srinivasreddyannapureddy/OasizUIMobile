import React, { Component } from "react";
import { AppRegistry, StyleSheet, Dimensions,Platform, Image, View, StatusBar, TouchableOpacity } from "react-native";
import { Container } from "native-base";
import {Button,Text,Item } from "native-base";
import MapView,{ Marker, AnimatedRegion } from "react-native-maps";
import Polyline from "@mapbox/polyline";
const LATITUDE = 37.42140481;
const LONGITUDE = -122.22446999;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const markerIDs = ["Marker1", "Marker2"];
const timeout = 4000;
let animationTimeout;
export default class OrderTrack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            error: null,
            concat: null,
            coords:[],
            x: "false",
            cordLatitude:37.35240938,
            cordLongitude:-122.22346999,
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE
            })
        };
        this.mergeLot = this.mergeLot.bind(this);
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                this.mergeLot();
                console.log("position"+JSON.stringify(position));
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
        this.watchID = navigator.geolocation.watchPosition(
            position => {
                const { coordinate, routeCoordinates, distanceTravelled } = this.state;
                const { latitude, longitude } = position.coords;
                const newCoordinate = {
                    latitude,
                    longitude
                };
                if (Platform.OS === "android") {
                    if (this.marker) {
                        this.marker._component.animateMarkerToCoordinate(
                            newCoordinate,
                            500
                        );
                    }
                } else {
                    coordinate.timing(newCoordinate).start();
                }
                this.setState({
                    latitude,
                    longitude,
                    routeCoordinates: routeCoordinates.concat([newCoordinate]),
                    prevLatLng: newCoordinate
                });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        animationTimeout = setTimeout(() => {
            this.focus1();
        }, timeout);
    }
   getMapRegion = () => ({
       latitude: this.state.latitude,
       longitude: this.state.longitude,
       latitudeDelta: LATITUDE_DELTA,
       longitudeDelta: LONGITUDE_DELTA
   });
   mergeLot(){
       if (this.state.latitude != null && this.state.longitude!=null)
       {
           let concatLot = this.state.latitude +","+this.state.longitude;
           this.setState({
               concat: concatLot
           }, () => {
               this.getDirections(concatLot, "-6.270565,106.759550");
           });
       }
   }
   focus1() {
       animationTimeout = setTimeout(() => {
           this.focusMap([
               markerIDs[0],
               markerIDs[1],
           ], true);
       }, timeout);
   }
   focusMap(markers, animated) {
       console.log(`Markers received to populate map: ${markers}`);
       this.mapRef.fitToSuppliedMarkers(markers, animated);
   }
   async getDirections(startLoc, destinationLoc) {
       try {
           let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`);
           let respJson = await resp.json();
           let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
           let coords = points.map((point, index) => {
               return  {
                   latitude : point[0],
                   longitude : point[1]
               };
           });
           this.setState({coords: coords});
           this.setState({x: "true"});
           return coords;
       } catch(error) {
           console.log("masuk fungsi");
           this.setState({x: "error"});
           return error;
       }
   }
   render() {
       return (
           <View style={{flex:1}}>
               <MapView style={styles.map} showUserLocation
                   followUserLocation
                   loadingEnabled
                   showUserLocation
                   followUserLocation
                   loadingEnabled
                   intialRegion={this.getMapRegion()}
                   ref={ref => { this.mapRef= ref; }}>
                   {!!this.state.latitude && !!this.state.longitude && <Marker.Animated
                       ref={marker => {
                           this.marker = marker;
                       }}
                       identifier="Marker1"
                       coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
                       title={"Water"}
                       image={require("../../assets/water-map-marker.png")}
                   />}
                   {!!this.state.cordLatitude && !!this.state.cordLongitude &&
        <MapView.Marker
            identifier="Marker2"
            title={"Me"}
            coordinate={{"latitude":this.state.cordLatitude,"longitude":this.state.cordLongitude}} />
                   }
                   {!!this.state.latitude && !!this.state.longitude && this.state.x == "true" && <MapView.Polyline
                       coordinates={this.state.coords}
                       strokeWidth={2}
                       strokeColor="red"/>
                   }
                   {!!this.state.latitude && !!this.state.longitude && this.state.x == "error" && <MapView.Polyline
                       coordinates={[
                           {latitude: this.state.latitude, longitude: this.state.longitude},
                           {latitude: this.state.cordLatitude, longitude: this.state.cordLongitude},
                       ]}
                       strokeWidth={2}
                       strokeColor="black"/>
                   }
               </MapView>
           </View>
       );
   }
}
const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    }
});
