import React from "react";
import { observer, inject } from "mobx-react";
import {View,Image,ScrollView, AsyncStorage} from "react-native";
import {Button,Text,Body,Item,Input,DeckSwiper,Icon,Picker,Thumbnail, Row, Col,Container,Content,Card,CardItem,Label,Segment,Left,Right} from "native-base";
import {APP_NAME, PUBLIC_DOMAIN} from "../../constants";

import PhoneInput from "react-native-phone-input";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Fa from "react-native-vector-icons/FontAwesome";
import { ListItem } from "react-native-elements";
const cards = [
    {
        text: "Ganesha Suppliers",
        name: "Coca Cola Water ",
        area:"Hitech City",
        image: {uri:"https://www.coca-colacompany.com/content/dam/journey/us/en/global/2012/10/ProductsWater-604-st-604-337-3df7dd58.rendition.598.336.jpg"},
        thumnail: {uri:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png"},
    },
    {
        text: "Ganesha Suppliers",
        name: "Water Can ",
        area:"Hitech City",
        image: {uri:"http://www.alliedpurchasing.com/images/bottled-water.png"},
        thumnail: {uri:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png"},
    },
    {
        text: "Ganesha Suppliers",
        name: "Aqua Fina ",
        area:"Hitech City",
        image: {uri:"https://cdni.rt.com/files/2015.10/article/5630e7a4c461887e788b4576.jpg"},
        thumnail: {uri:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png"},
    },
    {
        text: "Ganesha Suppliers",
        name: "Bisleri Water Bottles ",
        area:"Hitech City",
        image: {uri:"http://www.afaqs.com/all/news/images/news_story_grfx/2017/08/51204/1-big-Bisleri.jpg"},
        thumnail: {uri:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png"},
    },
];

class CustomImage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            imageUri:this.props.url,
        };
    }
    render(){
        let urlimage = {uri:PUBLIC_DOMAIN+this.state.imageUri};
        return(
            <Image  source={urlimage} style={{height:200,borderRadius:15,flex:1}}
                onError={(e) => this.setState({imageUri: "http://www.novelupdates.com/img/noimagefound.jpg"})}/>
        );
    }
}

@inject(["ThemeStore"],["UserStore"])
@observer
export default class OrderScreen extends React.Component{
  static navigationOptions = ({ navigation,screenProps }) => ({
  });
  static navigationOptions = ({ navigation,screenProps }) => ({
      title:navigation.state.params.data.serviceProviderObj.serviceProvider,
      headerLeft:<Button transparent onPress={()=>navigation.goBack()} style={{width:100}}><Icon name="ios-arrow-back"  style={{color:screenProps.iconColor.color,marginLeft:5,fontSize:20,padding:10}} /></Button>,
      headerRight:<View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
          <Icon name="heart" style={{color:screenProps.iconColor.color,marginRight:10,fontSize:20}} />
          <Icon name="more"  onPress={()=>navigation.navigate("Settings")} style={{color:screenProps.iconColor.color,marginRight:10,fontSize:20}} /></View>,
  });
  constructor(props){
      super(props);
  }
  state = {
      quantity:0,
      deliveryOn:'Pick Time',
      description:'',
      totalprice:0,
  };
   componentWillMount() {
  }
  componentDidMount(){
  }
  placeOrder(){
      const UserStore=this.props.UserStore;
      const navigation=this.props.navigation;
      const CustomerLocationObj=UserStore.customerLocation;
      const serviceProviderObj=navigation.state.params.data; // This data is from pervios screen.Passed As data Param
      let postOrderData={
          "serviceID": "string",
          "serviceType": "string",
          "serviceItemBrand": "string",
          "customer": "string",
          "customerContactNumber": "string",
          "customerLocationID": "string",
          "deliveryDay": "string",
          "deliveryOn": this.state.deliveryOn, // Delivery time is saving as selected of current state.
          "quantity": this.state.quantity,
          "totalPrice": this.state.totalprice,
          "serviceProvider": serviceProviderObj.serviceProviderObj.serviceProvider,
          "serviceProviderID": "string",
          "customerHouseNumber": "string",
          "customerAddress": "string",
          "customerLandmark": "string",
          "customerArea": "string",
          "customerAreaLocality": "string",
          "customerZip": "string",
          "customerCity": "string",
          "customerState": "string",
      };
      let post_json={
        "serviceID": "string",
        "serviceType": "string",
        "serviceItemBrand": "string",
        "customer": "string",
        "customerContactNumber": "string",
        "customerLocationID": "string",
        "deliveryDay": "string",
        "deliveryOn": this.state.deliveryOn, // Delivery time is saving as selected of current state.
        "quantity": this.state.quantity,
        "totalPrice": this.state.totalprice,
        "serviceProvider": serviceProviderObj.serviceProviderObj.serviceProvider,
        "serviceProviderID": "string",
        "customerHouseNumber": "string",
        "customerAddress": "string",
        "customerLandmark": "string",
        "customerArea": "string",
        "customerAreaLocality": "string",
        "customerZip": "string",
        "customerCity": "string",
        "customerState": "string",
        "image":serviceProviderObj.serviceProviderObj.serviceProviderIconPath,
        "item":serviceProviderObj.serviceObj.item,
        "itemDefinition": serviceProviderObj.serviceObj.itemDefinition
    };

     AsyncStorage.setItem("item",JSON.stringify(navigation.state.params.data.serviceObj.item));
    AsyncStorage.setItem("imageurl",JSON.stringify(navigation.state.params.data.serviceProviderObj.serviceProviderIconPath));
    //   AsyncStorage.setItem("totalprice",JSON.stringify(this.state.totalprice));

      UserStore.placeOrder(postOrderData);
      navigation.navigate("ConfirmOrder", {post_json:post_json});
   }
  multiSliderValuesChange = (values) => {
  }
  handleIncCount=()=> {
    const navigation=this.props.navigation;
      this.setState({quantity: this.state.quantity+1, totalprice: this.state.totalprice+navigation.state.params.data.serviceProviderServiceObj.pricePerItem})
  }
  handleDecCount=()=> {
    const navigation=this.props.navigation;
    if(this.state.quantity <=0) {
      return;
    }
    this.setState({quantity: this.state.quantity-1, totalprice: this.state.totalprice-navigation.state.params.data.serviceProviderServiceObj.pricePerItem})
  }
  render() {
    const ThemeStore=this.props.ThemeStore;
    const navigation=this.props.navigation;
    return(
        <Container>
        <Content>
            {/* <View style={{flex:1,flexDirection:"column"}}>
            <CustomImage url={navigation.state.params.data.serviceProviderObj.serviceProviderIconPath} />
             <Text style={{color:ThemeStore.textColor,fontSize:20}}><Fa style={{fontSize:20}} name="rupee"/>{" "}{navigation.state.params.data.serviceProviderServiceObj.pricePerItem}</Text>
             <Text style={{color:ThemeStore.textColor,fontSize:20}}>{navigation.state.params.data.serviceObj.item}--{navigation.state.params.data.serviceObj.itemDefinition}</Text> 
             </View> */}
             <View style={{flex:1,flexDirection:"column"}}>
                    <Card style={{height: 300, width: "auto"}}>
        <CardItem>
            {/* <Image source={urldata}style={{height: 250, width: null, flex: 1}}/> */}
            <CustomImage url={navigation.state.params.data.serviceProviderObj.serviceProviderIconPath} /> 
            </CardItem> 
            <CardItem>
            <Left>
              <Text>{navigation.state.params.data.serviceObj.item}--{navigation.state.params.data.serviceObj.itemDefinition}</Text>
            </Left> 
            <Right>
              <Text>₹{navigation.state.params.data.serviceProviderServiceObj.pricePerItem}</Text>
            </Right>
          </CardItem>
            </Card>
             </View>


            {/* <Image
             style={{width: 50, height: 50}}
          source={PUBLIC_DOMAIN+navigation.state.params.data.serviceProviderObj.serviceProviderIconPath}
        /> */}
                {/* <DeckSwiper
                    ref={(c) => this._deckSwiper = c}
                    dataSource={cards}
                    renderEmpty={() =>
                        <View style={{ alignSelf: "center" }}>
                            <Text>Over</Text>
                        </View>
                    }
                    renderItem={item =>
                        <Card style={{ elevation: 3 }}>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={item.thumnail} />
                                    <Body>
                                        <Text>{item.text}</Text>
                                        <Text note>{item.area}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image style={{ height: 150, flex: 1 }} source={item.image} />
                            </CardItem>
                            <CardItem>
                                <Icon name="heart" style={{ color: "#ED4A6A" }} />
                                <Text>{item.name}</Text>
                            </CardItem>
                        </Card>
                    }
                /> */}
                {/* <Content style={{marginTop:50}}> */}
                    <Card>
                        <CardItem>
                        <View style={{flex:1,flexDirection:"row"}}>
                            <Label>Quantity</Label>
                            <Button rounded onPress={this.handleIncCount}><Text>+</Text></Button> 
                            <Text>{this.state.quantity}</Text>
                            <Button rounded onPress={this.handleDecCount}><Text>-</Text></Button></View>
                            </CardItem>
                            
                    </Card>
                    <Card>
                        <CardItem style={{flex:1,flexDirection:"row"}}>
                            <Label>Delivery on </Label>
                            <Picker
                                mode="dropdown"
                                iosHeader="Delivery On"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                selectedValue={this.state.deliveryOn}
                                onValueChange={(val)=>this.setState({deliveryOn:val})}
                            >
                                <Picker.Item label='Pick Time' value='Pick time' />
                                <Picker.Item label='9am - 1pm' value='9am - 1pm' />
                                <Picker.Item label='1pm - 5pm' value='1pm - 5pm' />
                                <Picker.Item label='5pm - 9pm' value='5pm - 9pm' />
                            </Picker>
                        </CardItem>
                    </Card>  
                  <Card>
                    <CardItem style={{flex:1,flexDirection:"row"}}>
                    <Label>Total :</Label><Text>{this.state.totalprice}</Text>
                   </CardItem></Card>
                        <View style={{margin:10,alignItems:"center",justifyContent:"center"}}>
              <Item style={{width:"100%",borderBottomColor: "black",borderBottomWidth: 1,marginBottom:10,marginTop:10}}>
                  <Input  onChangeText={(text) => this.setState({description:text})} placeholder="Product Description" />
              </Item>
              </View>        
                    <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:10,marginBottom:10}}>
                        <Button rounded  onPress={()=>this.placeOrder(navigation.state.params.data)} block style={{backgroundColor:ThemeStore.buttonColors,width:"40%"}}>
                            <Text>Order </Text>
                        </Button>
                    </View>
                </Content>
        </Container>
    );
}
}