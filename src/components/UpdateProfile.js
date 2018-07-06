import React from "react";
import { observer, inject } from "mobx-react";
import {View,Image,StyleSheet,TouchableOpacity,PixelRatio} from "react-native";
import {Button,Text,Item,Input,Footer,Container } from "native-base";
import {APP_NAME,GOOGLE_MAPS_API_KEY} from "../../constants";
import CustomMultiPicker from "react-native-multiple-select-list";
import Fa from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-picker";
@inject(["ThemeStore"],["UserStore"])
@observer
export default class UpdateProfile extends React.Component{
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
      state: "",
      avatarSource: null,
  };
  componentWillMount() {
  }
  componentDidMount(){
  }
  selectPhotoTapped() {
      const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
              skipBackup: true
          }
      };
      ImagePicker.showImagePicker(options, (response) => {
          console.log("Response = ", response);
          if (response.didCancel) {
              console.log("User cancelled photo picker");
          }
          else if (response.error) {
              console.log("ImagePicker Error: ", response.error);
          }
          else if (response.customButton) {
              console.log("User tapped custom button: ", response.customButton);
          }
          else {
              let source = { uri: response.uri };
              // You can also display the image using data:
              // let source = { uri: 'data:image/jpeg;base64,' + response.data };
              this.setState({
                  avatarSource: source
              });
          }
      });
  }
  saveDetails(){
      const UserStore=this.props.UserStore;
      const navigation=this.props.navigation;
      UserStore.createCustomerLocation(this.state);
      navigation.navigate("Home");
  }
  saveAddress(){
      this.getAddressComponents(this.state.markerLat,this.state.markerLong);
      this.setState({isMapView:false});
  }
  render() {
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      return( <View style={{flex:1,flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                  { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                      <Image style={styles.avatar} source={this.state.avatarSource} />
                  }
              </View>
          </TouchableOpacity>
          <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
              <Item style={{width:"100%",borderBottomColor: "black",borderBottomWidth: 1,marginBottom:10,marginTop:10}}>
                  <Input  onChangeText={(text) => this.setState({houseNumber:text})} placeholder="Full Name" />
              </Item>
          </View>
          <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
              <Item style={{width:"100%",borderBottomColor: "black",borderBottomWidth: 1,marginBottom:10,marginTop:10}}>
                  <Input  onChangeText={(text) => this.setState({landmark:text})} placeholder="Mobile Number" />
              </Item>
          </View>
          <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
              <Item style={{width:"100%",borderBottomColor: "black",borderBottomWidth: 1,marginBottom:10,marginTop:10}}>
                  <Input value={this.state.area} onChangeText={(text) => this.setState({area:text})} placeholder="Alternative Phone Number" />
              </Item>
          </View>
          <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
              <Item style={{width:"100%",borderBottomColor: "black",borderBottomWidth: 1,marginBottom:10,marginTop:10}}>
                  <Input value={this.state.zip}  onChangeText={(text) => this.setState({zip:text})} placeholder="Email-Id" />
              </Item>
          </View>
          <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
              <Item style={{width:"100%",borderBottomColor: "black",borderBottomWidth: 1,marginBottom:10,marginTop:10}}>
                  <Input value={this.state.city}  onChangeText={(text) => this.setState({city:text})} placeholder="Delivery Adress" />
              </Item>
          </View>
          <Button style={{backgroundColor:ThemeStore.buttonColors,color:ThemeStore.buttonTextColor}}  onPress={() => alert("Updated!")} block style={{backgroundColor:this.state.disabledColor,width:"90%",marginLeft:"5%"}}>
              <Text style={{color:ThemeStore.buttonTextColor}}>Update</Text>
          </Button>
          <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
          </View>
      </View>
      );
  }
}
const styles = StyleSheet.create({
    avatarContainer: {
        borderColor: "#9B9B9B",
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150
    }
});
