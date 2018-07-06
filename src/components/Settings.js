import React, {Component} from "react";
import {Text,View,TouchableWithoutFeedback,Linking,Share,Platform,AsyncStorage} from "react-native";
import { observer, inject } from "mobx-react";
import { Container, Header,Body,Card,CardItem,Content, ListItem, Button, Radio, Right } from "native-base";
import Fa from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
import {APP_NAME,APP_DESCRIPTION,ANDROID_APP_URL,IOS_APP_URL} from "../../constants";
@inject(["ThemeStore"],["TankStore"])
@observer
export default class Settings extends Component {
    constructor(props){
        super(props);
        const ThemeStore=this.props.ThemeStore;
    }
  static navigationOptions = ({ navigation,screenProps }) => ({
      title:"Settings",
      headerLeft:<Button transparent onPress={()=>navigation.goBack()} style={{width:100}}><Icon name="md-arrow-back"  style={{color:screenProps.iconColor.color,marginLeft:5,fontSize:20,padding:10}} /></Button>,
      headerRight:<View  style={{marginRight:5}} />,
  });
  componentDidMount(){
  }
  signOut(){
      const navigation = this.props.navigation;
      AsyncStorage.setItem("isLoggedIn","false");
      //  alert("Successfully Logged Out!");
      navigation.navigate("SplashScreen");
  }
  render() {
      const navigation = this.props.navigation;
      const ThemeStore=this.props.ThemeStore;
      const ChatStore=this.props.ChatStore;
      return (
          <Container style={{backgroundColor:ThemeStore.otherContentBackground}}>
              <Content>
                  <TouchableWithoutFeedback onPress={()=>navigation.navigate("UpdateProfile")}>
                      <Card style={{backgroundColor:ThemeStore.buttonColors}} >
                          <CardItem style={{backgroundColor:ThemeStore.buttonColors}}>
                              <Fa name="user" style={{fontSize:15,color:ThemeStore.buttonTextColor,marginRight:10}} />
                              <Body>
                                  <Text style={{color:ThemeStore.buttonTextColor}}>Update Profile</Text>
                              </Body>
                          </CardItem>
                      </Card>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={()=>navigation.navigate("ThemeSettings")}>
                      <Card style={{backgroundColor:ThemeStore.buttonColors}} >
                          <CardItem style={{backgroundColor:ThemeStore.buttonColors}}>
                              <Fa name="magic" style={{fontSize:15,color:ThemeStore.buttonTextColor,marginRight:10}} />
                              <Body>
                                  <Text style={{color:ThemeStore.buttonTextColor}}>Theme Settings</Text>
                              </Body>
                          </CardItem>
                      </Card>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={()=>Linking.openURL((Platform.OS === "ios")?IOS_APP_URL:ANDROID_APP_URL)}>
                      <Card style={{backgroundColor:ThemeStore.buttonColors}} >
                          <CardItem style={{backgroundColor:ThemeStore.buttonColors}}>
                              <Fa name="star" style={{fontSize:15,color:ThemeStore.buttonTextColor,marginRight:10}} />
                              <Body>
                                  <Text style={{color:ThemeStore.buttonTextColor}}>Rate Us</Text>
                              </Body>
                          </CardItem>
                      </Card>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={()=>
                      Share.share({
                          message: APP_DESCRIPTION+" "+Platform.OS === "ios"?IOS_APP_URL:ANDROID_APP_URL,
                          url: (Platform.OS === "ios")?IOS_APP_URL:ANDROID_APP_URL,
                          title: APP_NAME
                      }, {
                          dialogTitle:APP_NAME,
                          excludedActivityTypes: [
                              "com.apple.UIKit.activity.PostToTwitter"
                          ],
                          tintColor: "green"
                      })
                          .then(this._showResult).catch((error) => this.setState({result: "error: " + error.message}))}>
                      <Card style={{backgroundColor:ThemeStore.buttonColors}} >
                          <CardItem style={{backgroundColor:ThemeStore.buttonColors}}>
                              <Fa name="share-alt" style={{fontSize:15,color:ThemeStore.buttonTextColor,marginRight:10}} />
                              <Body>
                                  <Text style={{color:ThemeStore.buttonTextColor}}>Share App</Text>
                              </Body>
                          </CardItem>
                      </Card>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={()=>this.signOut()}>
                      <Card style={{backgroundColor:ThemeStore.buttonColors}} >
                          <CardItem style={{backgroundColor:ThemeStore.buttonColors}}>
                              <Fa name="star" style={{fontSize:15,color:ThemeStore.buttonTextColor,marginRight:10}} />
                              <Body>
                                  <Text style={{color:ThemeStore.buttonTextColor}}>Logout</Text>
                              </Body>
                          </CardItem>
                      </Card>
                  </TouchableWithoutFeedback>
              </Content>
          </Container>
      );
  }
}
