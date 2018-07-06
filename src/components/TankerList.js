import React from "react";
import { observer, inject } from "mobx-react";
import {Text,WebView, View,ActivityIndicator,FlatList,ScrollView,Platform,AsyncStorage} from "react-native";
import { Container, Header, Content,Body,Title,Button,Icon } from "native-base";
import Fa from "react-native-vector-icons/FontAwesome";
import Ionicon from "react-native-vector-icons/Ionicons";
import EachRow from "./EachRow";
import {NineCubesLoader, DoubleCircleLoader, TextLoader, CirclesRotationScaleLoader} from "react-native-indicator";
import {APP_NAME} from "../../constants";
@inject(["ThemeStore"],["TankStore"],["UserStore"])
@observer
export default class TankerList extends React.Component {
  static navigationOptions = () => ({
      title:APP_NAME ,
  });
  constructor(props){
      super(props);
      this.state = {
            area:0,
            city:0,
            state:0
     }
  }

  componentDidMount(){
      const TankStore=this.props.TankStore;
      TankStore.changeValues(true,"isLoading");
    //  let loc=  this.props.locationdata;
    //   alert(loc.area+'==================');
      setTimeout(function(){
        //  TankStore.FetchTankerList(this.state);
          TankStore.FetchTankerList(this.state);
      }, 3000);
  }
//   async componentWillMount(){
//     await AsyncStorage.getItem('area').then((value) => this.setState({ area: value }));
//     await AsyncStorage.getItem('city').then((value) => this.setState({ city: value }));
//     await AsyncStorage.getItem('state').then((value) => this.setState({ state: value }));
//   }    
  ListHeader = () => {
      const ThemeStore=this.props.ThemeStore;
      const TankStore=this.props.TankStore;
      const navigation=this.props.navigation;
      return (
          <View style={{
              width: "100%",
              height: 45,
              backgroundColor: ThemeStore.lightHeaderBackgroundColor,
              alignItems: "center",
              flexDirection:"row"
          }}>
              <Text style={{color:ThemeStore.textColor}}>{"   "}{TankStore.TankerList.length}{" Tanker Water suppliers in your Area!"}</Text>
              <Fa onPress={()=>navigation.navigate("SelectArea")} name="map-marker" style={{color:ThemeStore.buttonColors,fontSize:30,position:"absolute",right:10}}/>
          </View>
      );
  };
  render() {
      const TankStore=this.props.TankStore;
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      const UserStore= this.props.UserStore;

     
    //   let  CustomerLoc;
    //   if(UserStore.customerLocation.length==0){
    //     CustomerLoc=<View style={{marginTop:200,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
    //           <Text style={{color:ThemeStore.buttonColors}}>No Water Suppliers in your area!.</Text>
    //       </View>;
    //   }else{
    //     alert(UserStore.customerLocation[0].area);
    //     alert(UserStore.customerLocation[0].city);
    //     alert(UserStore.customerLocation[0].state);
    //         this.setState({area: UserStore.customerLocation[0].area,city:UserStore.customerLocation[0].city,
    //         state:UserStore.customerLocation[0].state});
    //      <View>
    //         CustomerLoc =   {UserStore.customerLocation[0].area}
    //           </View>
    //   }


      let TankList=
        <View style={{marginTop:200,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <DoubleCircleLoader  color={ThemeStore.buttonColors} />
        </View>;
      if(TankStore.TankerList.length==0){
          TankList=<View style={{marginTop:200,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <Ionicon name="ios-water-outline" style={{color:ThemeStore.buttonColors,fontSize:50}} />
              <Text style={{color:ThemeStore.buttonColors}}>No Water Suppliers in your area!.</Text>
          </View>;
      }else{
          if(TankStore.isLoading){
              TankList=<View style={{marginTop:200,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                  <DoubleCircleLoader  color={ThemeStore.buttonColors} />
              </View>;
          }else {
              TankList=
              <View style={{justifyContent: "center",  flex:1,  paddingTop: (Platform.OS === "iOS") ? 20 : 0}}>
                  <FlatList
                      data={TankStore.TankerList}
                      renderItem={({item,index}) => <EachRow  navigation={navigation} data={item} key={item._id}/>}
                      keyExtractor={(item, index) => index}
                      ListHeaderComponent={this.ListHeader}
                      stickyHeaderIndices={[0]}
                  />
              </View>;
          }
      }
      return (
          <Container>
              {TankList}
          </Container>
      );
  }
}
