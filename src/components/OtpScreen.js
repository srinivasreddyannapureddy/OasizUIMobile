import React from "react";
import { observer, inject } from "mobx-react";
import {View,Image,TextInput,AsyncStorage} from "react-native";
import {Button,Text,Item } from "native-base";
import {APP_NAME} from "../../constants";
import CodeInput from "react-native-confirmation-code-input";
@inject(["ThemeStore"],["UserStore"])
@observer
export default class OtpScreen extends React.Component{
  static navigationOptions = ({ navigation,screenProps }) => ({
      title:APP_NAME,
      headerLeft: <View  style={{marginLeft:5}} />,

  });
  constructor(props){
      super(props);
  }
  state = {
      isValid:true,
      codeInput:""
  };
  componentWillMount() {
  }
  componentDidMount(){
  
  }
  _onFinishCheckingCode2(isValid,code){
      this.setState({isValid:isValid});
      this.refs.codeInputRef2.clear();
  }
  validateOtp(){
      const UserStore=this.props.UserStore;
      const navigation=this.props.navigation;
      let post_json={
          otpNumber  :this.state.codeInput
      };
      UserStore.userValidate(post_json,navigation);
  }
  render() {
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      const UserStore=this.props.UserStore;
      return(
          <View style={{flex:1,flexDirection:"column",justifyContent:"center",padding:20}}>
              <Text style={{color:ThemeStore.textColor}}>Enter the 4 Digit OTP Number here  </Text>
              <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                  <Text>{"\n"}</Text>
              </View>
              <TextInput
                  style={{
                      backgroundColor: ThemeStore.lightHeaderBackgroundColor,
                      height: 50,
                      textAlign: "center",
                      fontSize: 40,
                      fontWeight: "bold",
                      fontFamily: "Courier",
                      color:ThemeStore.textColor
                  }}
                  underlineColorAndroid={"transparent"}
                  autoCapitalize={"none"}
                  autoCorrect={false}
                  onChangeText={(text)=>this.setState({codeInput:text})}
                  placeholder="_ _ _ _"
                  keyboardType={"number-pad"}
                  returnKeyType={"go"}
                  autoFocus
                  selectionColor="white"
                  maxLength={4}
              />
              <View style={{alignItems:"center",justifyContent:"center"}}>
                  <Text>{"\n"}</Text>
              </View>
              <Button disabled={this.state.codeInput.length==4?false:true}  onPress={() => this.validateOtp()} block style={{backgroundColor:this.state.disabledColor,width:"90%",marginLeft:"5%"}}>
                  <Text style={{color:ThemeStore.buttonTextColor}}>Verify</Text>
              </Button>
              <View style={{alignItems:"center",justifyContent:"center"}}>
                  <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
                      <Text style={{color:"red",fontSize:15}}>{UserStore.VerifyResponse==""?"":UserStore.VerifyResponse.statusMessage}</Text>
                  </View>
              </View>
              <Text>{UserStore.LoginResponse!=""?UserStore.LoginResponse.statusResult.otpNumber:""}</Text>
          </View>
      );
  }
}
