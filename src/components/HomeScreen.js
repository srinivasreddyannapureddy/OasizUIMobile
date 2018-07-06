import React from "react";
import { observer, inject } from "mobx-react";
import {View,ActivityIndicator,FlatList,ScrollView, Text} from "react-native";
import { Container,Button, Header, Content, Tab, Icon, Tabs } from "native-base";
import {APP_NAME} from "../../constants";
import TankerList from "./TankerList";
import TopBrandList from "./TopBrands";
@inject(["ThemeStore"],["TankStore"],["UserStore"])
@observer
export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation,screenProps }) => ({
      title:APP_NAME,
      headerRight:<View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
          <Icon name="search"  style={{color:screenProps.iconColor.color,marginRight:10,fontSize:20}} />
          <Icon name="heart" onPress={()=>navigation.navigate("MyFavourites")} style={{color:screenProps.iconColor.color,marginRight:10,fontSize:20}} /><Icon name="more"  onPress={()=>navigation.navigate("Settings")} style={{color:screenProps.iconColor.color,marginRight:10,fontSize:20}} /></View>,
  });
  constructor(props){
      super(props);
  }
  componentWillMount(){
      const UserStore=this.props.UserStore;
      UserStore.getCustomerLocation();
  }
  componentDidMount(){

  }
  render() {
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      const UserStore= this.props.UserStore;
    //   let  TankList;
    // if(UserStore.customerLocation.length==0){
    //   TankList=<View style={{marginTop:200,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
    //         <Text style={{color:ThemeStore.buttonColors}}>No Water Suppliers in your area!.</Text>
    //     </View>;
    // }else{
    //    alert('data'+JSON.stringify(UserStore.customerLocation));
    //     TankList=  <View>
    //         {UserStore.customerLocation}
    //         </View>
    // }
      return (
          <Container>
              <Tabs>
                  <Tab tabStyle={{backgroundColor: ThemeStore.contentBackgroundColor}} textStyle={{color: ThemeStore.textColor}} activeTabStyle={{backgroundColor: ThemeStore.contentBackgroundColor}} activeTextStyle={{color: ThemeStore.textColor}} heading="TANKERS">
                      <TankerList navigation={navigation}/>
                  </Tab>
                  <Tab tabStyle={{backgroundColor: ThemeStore.contentBackgroundColor}} textStyle={{color: ThemeStore.textColor}} activeTabStyle={{backgroundColor: ThemeStore.contentBackgroundColor}} activeTextStyle={{color: ThemeStore.textColor}} heading="TOPBRANDS">
                      <TopBrandList navigation={navigation}/>
                  </Tab>
                  <Tab tabStyle={{backgroundColor: ThemeStore.contentBackgroundColor}} textStyle={{color: ThemeStore.textColor}} activeTabStyle={{backgroundColor: ThemeStore.contentBackgroundColor}} activeTextStyle={{color: ThemeStore.textColor}} heading="BUBBLETOP">
                      <TankerList navigation={navigation}/>
                  </Tab>
              </Tabs>
          </Container>
      );
  }
}

