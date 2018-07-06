import React, {Component} from "react";
import {Text,View,TouchableWithoutFeedback} from "react-native";
import { observer, inject } from "mobx-react";
import { Container, Header,Card,CardItem,Content, ListItem, Button, Radio, Right } from "native-base";
import Fa from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
@inject(["ThemeStore"])
@observer
export default class ThemeSettings extends Component {
    constructor(props){
        super(props);
        const ThemeStore=this.props.ThemeStore;
        this.state={
            red_theme:ThemeStore.red_theme,
            pink_theme:ThemeStore.pink_theme,
            purple_theme:ThemeStore.purple_theme,
            indigo_theme:ThemeStore.indigo_theme,
            blue_theme:ThemeStore.blue_theme,
            teal_theme:ThemeStore.teal_theme,
            green_theme:ThemeStore.green_theme,
            orange_theme:ThemeStore.orange_theme,
            lime_theme:ThemeStore.lime_theme,
            grey_theme:ThemeStore.grey_theme
        };
    }
  static navigationOptions = ({ navigation,screenProps }) => ({
      title:"Theme Settings",
      headerLeft:<Button transparent onPress={()=>navigation.goBack()} style={{width:100}}><Icon name="md-arrow-back"  style={{color:screenProps.iconColor.color,marginLeft:5,fontSize:20,padding:10}} /></Button>,
      headerRight:<View  style={{color:"white",marginRight:5,fontSize:20}} />,
  });
  componentDidMount(){
  }
  RedTheme(){
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      ThemeStore.RedTheme();
      navigation.navigate("ThemeChanging");
  }
  PinkTheme(){
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      ThemeStore.PinkTheme();
      navigation.navigate("ThemeChanging");
  }
  PurpleTheme(){
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      ThemeStore.PurpleTheme();
      navigation.navigate("ThemeChanging");
  }
  IndigoTheme(){
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      ThemeStore.IndigoTheme();
      navigation.navigate("ThemeChanging");
  }
  BlueTheme(){
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      ThemeStore.BlueTheme();
      navigation.navigate("ThemeChanging");
  }
  TealTheme(){
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      ThemeStore.TealTheme();
      navigation.navigate("ThemeChanging");
  }
  GreenTheme(){
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      ThemeStore.GreenTheme();
      navigation.navigate("ThemeChanging");
  }
  OrangeTheme(){
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      ThemeStore.OrangeTheme();
      navigation.navigate("ThemeChanging");
  }
  LimeTheme(){
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      ThemeStore.LimeTheme();
      navigation.navigate("ThemeChanging");
  }
  GreyTheme(){
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      ThemeStore.GreyTheme();
      navigation.navigate("ThemeChanging");
  }
  render() {
      const navigation = this.props.navigation;
      const ThemeStore=this.props.ThemeStore;
      return (
          <Container style={{backgroundColor:ThemeStore.otherContentBackground}}>
              <Content>
                  <TouchableWithoutFeedback  onPress={()=>this.PurpleTheme()}>
                      <Card style={{backgroundColor:"#4A148C"}}>
                          <CardItem style={{backgroundColor:"#4A148C"}}>
                              <Text style={{color:"white"}}>Purple Theme</Text>
                              <Radio onPress={()=>this.PurpleTheme()} style={{color:ThemeStore.textColor,alignSelf:"flex-end",position: "absolute",right:10,top:10}} selected={this.state.purple_theme} />
                          </CardItem>
                      </Card>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={()=>this.RedTheme()}>
                      <Card style={{backgroundColor:"#F44336"}}>
                          <CardItem style={{backgroundColor:"#F44336"}}>
                              <Text style={{color:"white"}}>Red Theme</Text>
                              <Radio style={{alignSelf:"flex-end",position: "absolute",right:10,top:10}}onPress={()=>this.RedTheme()} selected={this.state.red_theme} />
                          </CardItem>
                      </Card>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback  onPress={()=>this.PinkTheme()}>
                      <Card style={{backgroundColor:"#E91E63"}}>
                          <CardItem style={{backgroundColor:"#E91E63"}}>
                              <Text style={{color:"white"}}>Pink Theme</Text>
                              <Radio onPress={()=>this.PinkTheme()} style={{color:ThemeStore.textColor,alignSelf:"flex-end",position: "absolute",right:10,top:10}} selected={this.state.pink_theme} />
                          </CardItem>
                      </Card>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback  onPress={()=>this.IndigoTheme()}>
                      <Card style={{backgroundColor:"#3F51B5"}}>
                          <CardItem style={{backgroundColor:"#3F51B5"}}>
                              <Text style={{color:"white"}}>Indigo Theme</Text>
                              <Radio onPress={()=>this.IndigoTheme()} style={{color:ThemeStore.textColor,alignSelf:"flex-end",position: "absolute",right:10,top:10}} selected={this.state.indigo_theme} />
                          </CardItem>
                      </Card>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback  onPress={()=>this.BlueTheme()}>
                      <Card style={{backgroundColor:"#2196F3"}}>
                          <CardItem style={{backgroundColor:"#2196F3"}}>
                              <Text style={{color:"black"}}>Blue Theme</Text>
                              <Radio onPress={()=>this.BlueTheme()} style={{color:ThemeStore.textColor,alignSelf:"flex-end",position: "absolute",right:10,top:10}} selected={this.state.blue_theme} />
                          </CardItem>
                      </Card>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback  onPress={()=>this.TealTheme()}>
                      <Card style={{backgroundColor:"#009688"}}>
                          <CardItem style={{backgroundColor:"#009688"}}>
                              <Text style={{color:"white"}}>Teal Theme</Text>
                              <Radio onPress={()=>this.TealTheme()} style={{color:ThemeStore.textColor,alignSelf:"flex-end",position: "absolute",right:10,top:10}} selected={this.state.teal_theme} />
                          </CardItem>
                      </Card>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback  onPress={()=>this.GreenTheme()}>
                      <Card style={{backgroundColor:"#4CAF50"}}>
                          <CardItem style={{backgroundColor:"#4CAF50"}}>
                              <Text style={{color:"black"}}>Green Theme</Text>
                              <Radio onPress={()=>this.GreenTheme()} style={{color:ThemeStore.textColor,alignSelf:"flex-end",position: "absolute",right:10,top:10}} selected={this.state.green_theme} />
                          </CardItem>
                      </Card>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback  onPress={()=>this.OrangeTheme()}>
                      <Card style={{backgroundColor:"#FF5722"}}>
                          <CardItem style={{backgroundColor:"#FF5722"}}>
                              <Text style={{color:"black"}}>Orange Theme</Text>
                              <Radio onPress={()=>this.OrangeTheme()} style={{color:ThemeStore.textColor,alignSelf:"flex-end",position: "absolute",right:10,top:10}} selected={this.state.orange_theme} />
                          </CardItem>
                      </Card>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback  onPress={()=>this.LimeTheme()}>
                      <Card style={{backgroundColor:"#CDDC39"}}>
                          <CardItem style={{backgroundColor:"#CDDC39"}}>
                              <Text style={{color:"white"}}>Lime Theme</Text>
                              <Radio onPress={()=>this.LimeTheme()} style={{color:ThemeStore.textColor,alignSelf:"flex-end",position: "absolute",right:10,top:10}} selected={this.state.lime_theme} />
                          </CardItem>
                      </Card>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback  onPress={()=>this.GreyTheme()}>
                      <Card style={{backgroundColor:"#CDDC39"}}>
                          <CardItem style={{backgroundColor:"#bdbdbd"}}>
                              <Text style={{color:"black"}}>Lime Theme</Text>
                              <Radio onPress={()=>this.GreyTheme()} style={{color:ThemeStore.textColor,alignSelf:"flex-end",position: "absolute",right:10,top:10}} selected={this.state.grey_theme} />
                          </CardItem>
                      </Card>
                  </TouchableWithoutFeedback>
              </Content>
          </Container>
      );
  }
}
