import React from "react";
import { observer, inject } from "mobx-react";
import {WebView, View,ActivityIndicator,FlatList,ScrollView,Platform,Image,TouchableOpacity} from "react-native";
import { Text,Container, Header, Card,CardItem,Left,Thumbnail,Body,Content,Right,Title,Button,Icon } from "native-base";
import Fa from "react-native-vector-icons/FontAwesome";
import Ionicon from "react-native-vector-icons/Ionicons";
import MatIcon from "react-native-vector-icons/MaterialIcons";
import {NineCubesLoader, DoubleCircleLoader, TextLoader, CirclesRotationScaleLoader} from "react-native-indicator";
import {APP_NAME,PUBLIC_DOMAIN} from "../../constants";
@inject(["ThemeStore"],["TankStore"])
@observer
export class EachRow extends React.Component{
    selectSupplier(data){
        const TankStore=this.props.TankStore;
        const navigation=this.props.navigation;
     //   TankStore.getServiceProvidersInfo(data.serviceProviderObj.id);
      //  AsyncStorage.setItem("serviceprovider",JSON.stringify(data.serviceProviderObj.serviceProvider));
        navigation.navigate("OrderScreen");
    }
    render(){
        const data=this.props.data;
        return (
            <TouchableOpacity onPress={()=>this.selectSupplier(data)}>
            <Card>
                <CardItem>
                    <Left>
                        <Body>
                            <Text>{data.brand}</Text>
                            <Text note>{data.notes}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{uri: PUBLIC_DOMAIN+data.brandIconPath}} style={{height: 200, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent>
                            <Icon active name="ios-funnel-outline" />
                            <Text>{data.brandDefinition}</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button transparent>
                            <MatIcon active name="label" />
                            <Text>{data.serviceType}</Text>
                        </Button>
                    </Body>
                    <Right>
                        <Button transparent>
                            <MatIcon active name="location-city" />
                            <Text>{data.city}</Text>
                        </Button>
                    </Right>
                </CardItem>
            </Card>
            </TouchableOpacity>
        );
    }
}
@inject(["ThemeStore"],["TankStore"])
@observer
export default class TopBrandList extends React.Component {
  static navigationOptions = () => ({
      title:APP_NAME ,
  });
  constructor(props){
      super(props);
  }
  componentDidMount(){
      const TankStore=this.props.TankStore;
      TankStore.changeValues(true,"isLoading");
      setTimeout(function(){
          TankStore.FetchTopBrands();
      }, 3000);
  }
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
              <Text style={{color:ThemeStore.textColor}}>{"   "}{TankStore.TopBrandList.length}{" Top Brands in your City!"}</Text>
              <Fa onPress={()=>navigation.navigate("SelectArea")} name="map-marker" style={{color:ThemeStore.buttonColors,fontSize:30,position:"absolute",right:10}}/>
          </View>
      );
  };
  render() {
      const TankStore=this.props.TankStore;
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      let TankList=
        <View style={{marginTop:200,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <DoubleCircleLoader  color={ThemeStore.buttonColors} />
        </View>;
      if(TankStore.TopBrandList.length==0){
          TankList=<View style={{marginTop:200,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <Ionicon name="ios-water-outline" style={{color:ThemeStore.buttonColors,fontSize:50}} />
              <Text style={{color:ThemeStore.buttonColors}}>No Top Brands in your area!.</Text>
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
                      data={TankStore.TopBrandList}
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
              <Content>
                  {TankList}
              </Content>
          </Container>
      );
  }
}
