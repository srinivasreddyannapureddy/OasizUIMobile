import React from "react";
import { observer, inject } from "mobx-react";
import {View,Image,TextInput, AsyncStorage} from "react-native";
import {Button,Text,Item,Input} from "native-base";
import {APP_NAME} from "../../constants";
import PhoneInput from "react-native-phone-input";
import { NativeModules } from "react-native";
@inject(["ThemeStore"],["UserStore"])
@observer
export default class LoginScreen extends React.Component{
  static navigationOptions = ({ navigation,screenProps }) => ({
      title:APP_NAME,
      headerLeft: <View  style={{marginLeft:5}} />,
  });
  constructor(props){
      super(props);
  }
  state = {
      isValid:false,
      phoneNumber:"",
      countryCode:"",
      phoneNumberLength:13,
      name:""
  };
  componentWillMount() {
  }
  componentDidMount(){
  }
  VaidateLogin(){
      const UserStore=this.props.UserStore;
      const navigation=this.props.navigation;
      if(this.state.isValid){
          let post_json ={
              "name":this.state.name,
              "mobileNumber":this.phone.getValue()
          };
          AsyncStorage.setItem("customer",JSON.stringify(this.state.name));
          UserStore.userLogin(post_json);
          navigation.navigate("OtpScreen");
      }
  }
  render() {
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      return(
          <View style={{flex:1,flexDirection:"column",alignItems:"center",justifyContent:"center",padding:20}}>
              <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                  <Item style={{width:"100%",borderBottomColor: "black",borderBottomWidth: 1,marginBottom:10,marginTop:10}}>
                      <Input  onChangeText={(text) => this.setState({name:text})} placeholder="Name" />
                  </Item>
              </View>
              <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                  <Item style={{width:"100%",borderBottomColor: "black",borderBottomWidth: 1,marginBottom:10,marginTop:10}}>
                      <PhoneInput
                          textProps={{ maxLength: 11+this.state.countryCode.length }}
                          onChangePhoneNumber={(num)=>this.setState({isValid: this.phone.isValidNumber(),phoneNumber:num,countryCode:num.length>5?this.phone.getCountryCode():""})}  initialCountry="in"    ref={ref => {
                              this.phone = ref;
                          }}/>
                  </Item>
              </View>
              <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                  <Text>{"\n"}To identify you, We will verify this phone number through otp</Text>
              </View>
              <Button block style={{backgroundColor:ThemeStore.buttonColors,width:"80%"}} disabled={!this.state.isValid} onPress={() => this.VaidateLogin()} block style={{backgroundColor:this.state.disabledColor,width:"90%",marginLeft:"5%"}}>
                  <Text style={{color:ThemeStore.buttonTextColor}}>Next</Text>
              </Button>
              <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                  <Text style={{color:"red",fontSize:15}}>{this.state.isValid?"":"* Please enter a valid phone number"}</Text>
              </View>
          </View>
      );
  }
}
