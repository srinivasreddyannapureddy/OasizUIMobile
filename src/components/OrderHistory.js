import React from "react";
import { observer, inject } from "mobx-react";
import {Text,WebView, View,ActivityIndicator,FlatList,ScrollView,Platform} from "react-native";
import { Container, Header, Content,Body,Title,Button,Icon } from "native-base";
import Fa from "react-native-vector-icons/FontAwesome";
import Ionicon from "react-native-vector-icons/Ionicons";
import EachRowOrder from "./EachRowOrder";
import {NineCubesLoader, DoubleCircleLoader, TextLoader, CirclesRotationScaleLoader} from "react-native-indicator";
import {APP_NAME} from "../../constants";
@inject(["ThemeStore"],["UserStore"],["TankStore"])
@observer
export default class OrderHistory extends React.Component {
  static navigationOptions = () => ({
      title:APP_NAME ,
  });
  constructor(props){
      super(props);
  }
  componentDidMount(){
      const UserStore=this.props.UserStore;
      UserStore.getOrderHistory();
  }
  render() {
      const UserStore=this.props.UserStore;
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      let OrderHistory=
        <View style={{marginTop:200,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <DoubleCircleLoader  color={ThemeStore.buttonColors} />
        </View>;
      if(UserStore.OrderHistory.length==0){
          OrderHistory=<View style={{marginTop:200,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <Fa name="gift" style={{color:ThemeStore.buttonColors,fontSize:50}} />
              <Text style={{color:ThemeStore.buttonColors}}>No Orders till now!.</Text>
          </View>;
      }else{
          OrderHistory=
              <View style={{justifyContent: "center",  flex:1,  paddingTop: (Platform.OS === "iOS") ? 20 : 0}}>
                  <FlatList
                      data={UserStore.OrderHistory}
                      renderItem={({item,index}) => <EachRowOrder  navigation={navigation} data={item} key={item._id}/>}
                      keyExtractor={(item, index) => index}
                      stickyHeaderIndices={[0]}
                  />
              </View>;
      }
      return (
          <Container>
              {OrderHistory}
          </Container>
      );
  }
}
