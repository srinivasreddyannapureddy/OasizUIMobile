import React from "react";
import { observer, inject } from "mobx-react";
import {View,Image,StyleSheet} from "react-native";
import {Button,Text,Item,Input,Footer,Container } from "native-base";
import {APP_NAME,GOOGLE_MAPS_API_KEY} from "../../constants";
import CustomMultiPicker from "react-native-multiple-select-list";
import Fa from "react-native-vector-icons/FontAwesome";
import MapView,{ Marker, AnimatedRegion } from "react-native-maps";
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
@inject(["ThemeStore"],["UserStore"])
@observer
export default class SelectArea extends React.Component{
  static navigationOptions = ({ navigation,screenProps }) => ({
      title:APP_NAME,
  });
  constructor(props){
      super(props);
  }
  state = {
      customer: this.props.UserStore.UserName,
      locationName: "",
      houseNumber: "",
      address: "",
      landmark: "",
      area: "",
      areaLocality: "",
      zip: "",
      city: "",
      state: ""
  };
  componentWillMount() {
  }
  componentDidMount(){
      navigator.geolocation.getCurrentPosition(
          (position) => {
              this.setState({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  error: null,
              });
              fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + position.coords.latitude + "," + position.coords.longitude + "&key="+GOOGLE_MAPS_API_KEY)
                  .then((response) => response.json())
                  .then((responseJson) => {
                      this.setState({area:responseJson.results[0].formatted_address.split(",")[0]+","+responseJson.results[0].formatted_address.split(",")[1]});
                      responseJson.results[0].address_components.forEach(data=>{
                          if(data.types.indexOf("administrative_area_level_1")!=-1) {
                              this.setState({state:data.long_name});
                          }
                          if(data.types.indexOf("locality")!=-1) {
                              this.setState({city:data.long_name});
                          }
                          if(data.types.indexOf("postal_code")!=-1) {
                              this.setState({zip:data.long_name});
                          }
                          if(data.types.indexOf("neighborhood")!=-1) {
                              this.setState({area:data.long_name});
                          }
                          if(data.types.indexOf("sublocality")!=-1) {
                              this.setState({area:this.state.area+","+data.long_name});
                          }
                      });
                  }).catch((error) => {
                      console.log("fetch error: "+ error);
                  });
              this.mergeLot();
              console.log("position"+JSON.stringify(position));
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );
  }
  getMapRegion = () => ({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
  });
  render() {
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      return(
          <View style={{flex:1,flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
              <MapView  style={styles.map} showUserLocation
                  followUserLocation
                  loadingEnabled
                  showUserLocation
                  followUserLocation
                  loadingEnabled
                  region={this.getMapRegion()}
                  ref={ref => { this.mapRef= ref; }}>
                  <Marker
                      coordinate={  {latitude: this.state.latitude,
                          longitude: this.state.longitude}}
                      onSelect={(e) => log("onSelect", e)}
                      onDrag={(e) => log("onDrag", e)}
                      onDragStart={(e) => log("onDragStart", e)}
                      onDragEnd={(e) => log("onDragEnd", e)}
                      onPress={(e) => log("onPress", e)}
                      draggable
                  />
              >
              </MapView>
              <Button style={{backgroundColor:ThemeStore.buttonColors,color:ThemeStore.buttonTextColor}}  onPress={() => this.saveDetails()} block style={{backgroundColor:this.state.disabledColor,width:"90%",marginLeft:"5%"}}>
                  <Text style={{color:ThemeStore.buttonTextColor}}>Next</Text>
              </Button>
              <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
              </View>
          </View>
      );
  }
}
const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    }
});
