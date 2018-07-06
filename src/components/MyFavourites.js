import React from "react";
import { observer, inject } from "mobx-react";
import {Text,WebView, View,ActivityIndicator,FlatList,ScrollView,Platform} from "react-native";
import { Container, Header, Content,Body,Title,Button,Icon } from "native-base";
import Fa from "react-native-vector-icons/FontAwesome";
import Ionicon from "react-native-vector-icons/Ionicons";
import EachRowFavourite from "./EachRowFavourite";
import {NineCubesLoader, DoubleCircleLoader, TextLoader, CirclesRotationScaleLoader} from "react-native-indicator";
import {APP_NAME} from "../../constants";
@inject(["ThemeStore"],["UserStore"],["TankStore"])
@observer
export default class MyFavourites extends React.Component {
  static navigationOptions = ({screenProps, navigation}) => ({
      title: 'My Favourite',
      headerRight:<View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
      <Icon name="search"  style={{color:screenProps.iconColor.color,marginRight:10,fontSize:20}} />
      <Icon name="more"  onPress={()=>navigation.navigate("Settings")} style={{color:screenProps.iconColor.color,marginRight:10,fontSize:20}} />
      </View>
  });
  constructor(props){
      super(props);
  }
  componentDidMount(){
      const UserStore=this.props.UserStore;
      UserStore.getCustomerFavourites();
  }
  render() {
      const UserStore=this.props.UserStore;
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      let CustomerFavourites=
        <View style={{marginTop:200,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <DoubleCircleLoader  color={ThemeStore.buttonColors} />
        </View>;
      if(UserStore.myFavourites.length==0){
          alert('empty');
        CustomerFavourites=<View style={{marginTop:200,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <Fa name="gift" style={{color:ThemeStore.buttonColors,fontSize:50}} />
              <Text style={{color:ThemeStore.buttonColors}}>No favourites till now!.</Text>
          </View>;
      }else{
          alert('data', UserStore.myFavourites.length+'==========');
        CustomerFavourites=
              <View style={{justifyContent: "center",  flex:1,  paddingTop: (Platform.OS === "iOS") ? 20 : 0}}>
                <Text style={{color:ThemeStore.buttonColors}}>No favourites till now!.</Text>
                  <FlatList
                      data={UserStore.myFavourites}
                      renderItem={({item,index}) => <EachRowFavourite  navigation={navigation} data={item} key={item._id}/>}
                      keyExtractor={(item, index) => index}
                      stickyHeaderIndices={[0]}
                  />
              </View>;
      }
      return (
          <Container>
              {CustomerFavourites}
          </Container>
      );
  }
}
