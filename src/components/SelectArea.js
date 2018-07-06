import React from "react";
import { observer, inject } from "mobx-react";
import {View,Image,StyleSheet,ScrollView, AsyncStorage} from "react-native";
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
    //  customer: this.props.UserStore.UserName,
      customer: "",
      locationName: " ",
      houseNumber: " ",
      address: " ",
      landmark: " ",
      area: " ",
      areaLocality: " ",
      zip: " ",
      city: " ",
      state: " ",
      MapView:false,
      markerLat:0,
      markerLong:0
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
              this.getAddressComponents(position.coords.latitude,position.coords.longitude);
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
      );
  }
  getAddressComponents(lat,long){
      fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + lat + "," + long + "&key="+GOOGLE_MAPS_API_KEY)
          .then((response) => response.json())
          .then((responseJson) => {
              this.setState({area:responseJson.results[0].formatted_address.split(",")[0]+","+responseJson.results[0].formatted_address.split(",")[1]});
              responseJson.results[0].address_components.forEach(data=>{
                  if(data.types.indexOf("administrative_area_level_1")!=-1) {
                      this.setState({state:data.long_name});
                  }
                  if(data.types.indexOf("premise")!=-1) {
                    this.setState({houseNumber:data.long_name});
                  }
                  if(data.types.indexOf("sublocality_level_3")!=-1) {
                    this.setState({locationName:data.long_name});
                  }
                  if(data.types.indexOf("administrative_area_level_2")!=-1) {
                    this.setState({city:data.long_name});
                  }
                  if(data.types.indexOf("neighborhood")!=-1) {
                    this.setState({address:data.long_name});
                  }
                  if(data.types.indexOf("sublocality")!=-1) {
                      this.setState({address:this.state.address+","+data.long_name});
                  }

                  if(data.types.indexOf("postal_code")!=-1) {
                      this.setState({zip:data.long_name});
                  }
                  if(data.types.indexOf("locality")!=-1) {
                    this.setState({areaLocality:data.long_name});
                  }
                  if(data.types.indexOf("sublocality_level_1")!=-1) {
                    this.setState({area:data.long_name});
                  }
                  if(data.types.indexOf("sublocality_level_2")!=-1) {
                    this.setState({landmark:data.long_name});
                  }
              });
          }).catch((error) => {
              console.log("fetch error: "+ error);
          });
  }
    async componentWillMount(){
      await AsyncStorage.getItem("customer").then((value) => this.setState({ customer: value }));
    }
        getMapRegion = () => ({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
  });
  saveDetails(){
      const UserStore=this.props.UserStore;
      const navigation=this.props.navigation;
      let locationData = {
        customer: this.state.customer,
        locationName: this.state.locationName,
        houseNumber: this.state.houseNumber,
        address: this.state.address,
        landmark: this.state.landmark,
        area: this.state.area,
        areaLocality: this.state.areaLocality,
        zip: this.state.zip,
        city: this.state.city,
        state: this.state.state
      }
      AsyncStorage.setItem('area',this.state.area);
      AsyncStorage.setItem('city',String(this.state.city));
      AsyncStorage.setItem('state',String(this.state.state));

      UserStore.createCustomerLocation(locationData);
      navigation.navigate("Home");
  }
  saveAddress(){
      this.getAddressComponents(this.state.markerLat,this.state.markerLong);
      this.setState({isMapView:false});
  }
  render() {
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      if(!this.state.isMapView){
          return(
              <ScrollView>
                  <View style={{flex:1,flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
                      <Button style={{backgroundColor:ThemeStore.buttonColors,color:ThemeStore.buttonTextColor}}  onPress={() => this.setState({isMapView:true})} block style={{backgroundColor:this.state.disabledColor,width:"90%",marginLeft:"5%"}}>
                          <Text style={{color:ThemeStore.buttonTextColor}}>Pin on map</Text>
                          <Fa  name="map-marker" style={{color:ThemeStore.buttonTextColor,fontSize:30}}/>
                      </Button>
                      <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                          <Item style={{width:"100%",borderBottomColor: "black",borderBottomWidth: 1,marginBottom:10,marginTop:10}}>
                              <Input  value={this.state.houseNumber} onChangeText={(text) => this.setState({houseNumber:text})} placeholder="House No/Falt No" />
                          </Item>
                      </View>
                      <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                          <Item style={{width:"100%",borderBottomColor: "black",borderBottomWidth: 1,marginBottom:10,marginTop:10}}>
                              <Input value={this.state.landmark} onChangeText={(text) => this.setState({landmark:text})} placeholder="Land Mark" />
                          </Item>
                      </View>
                      <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                          <Item style={{width:"100%",borderBottomColor: "black",borderBottomWidth: 1,marginBottom:10,marginTop:10}}>
                              <Input value={this.state.address} onChangeText={(text) => this.setState({address:text})} placeholder="Address" />
                          </Item>
                      </View>
                      <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                          <Item style={{width:"100%",borderBottomColor: "black",borderBottomWidth: 1,marginBottom:10,marginTop:10}}>
                              <Input value={this.state.locationName} onChangeText={(text) => this.setState({locationName:text})} placeholder="Location Name" />
                          </Item>
                      </View>
                      <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                          <Item style={{width:"100%",borderBottomColor: "black",borderBottomWidth: 1,marginBottom:10,marginTop:10}}>
                              <Input value={this.state.area} onChangeText={(text) => this.setState({area:text})} placeholder="Area" />
                          </Item>
                      </View>
                      <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                          <Item style={{width:"100%",borderBottomColor: "black",borderBottomWidth: 1,marginBottom:10,marginTop:10}}>
                              <Input value={this.state.areaLocality} onChangeText={(text) => this.setState({areaLocality:text})} placeholder="AreaLocality" />
                          </Item>
                      </View>
                      <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                          <Item style={{width:"100%",borderBottomColor: "black",borderBottomWidth: 1,marginBottom:10,marginTop:10}}>
                              <Input value={this.state.zip}  onChangeText={(text) => this.setState({zip:text})} placeholder="Zipcode" />
                          </Item>
                      </View>
                      <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                          <Item style={{width:"100%",borderBottomColor: "black",borderBottomWidth: 1,marginBottom:10,marginTop:10}}>
                              <Input value={this.state.city}  onChangeText={(text) => this.setState({city:text})} placeholder="City" />
                          </Item>
                      </View>
                      <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                          <Item style={{width:"100%",borderBottomColor: "black",borderBottomWidth: 1,marginBottom:10,marginTop:10}}>
                              <Input value={this.state.state}   onChangeText={(text) => this.setState({state:text})} placeholder="State" />
                          </Item>
                      </View>
                      <Button style={{backgroundColor:ThemeStore.buttonColors,color:ThemeStore.buttonTextColor}}  onPress={() => this.saveDetails()} block style={{backgroundColor:this.state.disabledColor,width:"90%",marginLeft:"5%"}}>
                          <Text style={{color:ThemeStore.buttonTextColor}}>Set Location</Text>
                      </Button>
                      <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                      </View>
                  </View>
              </ScrollView>
          );
      }else{
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
                          onDragEnd={(e) => { this.setState({markerLat:e.nativeEvent.coordinate.latitude,markerLong:e.nativeEvent.coordinate.longitude});}}
                          draggable
                      />
                  </MapView>
                  <Button style={{backgroundColor:ThemeStore.buttonColors,color:ThemeStore.buttonTextColor}}  onPress={() => this.saveAddress()} block style={{backgroundColor:this.state.disabledColor,width:"90%",marginLeft:"10%",position:"absolute",bottom:"25%"}}>
                      <Text style={{color:ThemeStore.buttonTextColor}}>Set Location</Text>
                  </Button>
              </View>
          );
      }
  }
}
const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject
    }
});
