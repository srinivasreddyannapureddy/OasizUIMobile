import React, {Component} from "react";
import { observer, inject } from "mobx-react";
import {Text, Image } from 'react-native'
import { Container,Button,Icon, ListItem ,Card, CardItem,Thumbnail, Row, Col, Content, Left,Right} from "native-base";
import Dialog from "react-native-dialog";
import {  TouchableOpacity, View, AsyncStorage } from "react-native";
import {APP_NAME, PUBLIC_DOMAIN} from "../../constants";


// const cards = {
    
//     name: 'Bisleri -20L',
//     price: '₹80',
//   //  image: require('../img/image.png'),
//     value: 2
// }
class CustomImage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            imageUri:this.props.url,
        };
    }
    render(){
        return(
            <Image  source={{uri:PUBLIC_DOMAIN+this.state.imageUri}} style={{height:200,borderRadius:15,flex:1}}
                onError={(e) => this.setState({imageUri: "http://www.novelupdates.com/img/noimagefound.jpg"})}/>
        );
    }
}

@inject(["ThemeStore"],["UserStore"],["TankStore"])
@observer
export default class ConfirmOrder extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
    title:'Confirm Order',
        headerLeft:<Button transparent onPress={()=>navigation.goBack()} style={{width:100}}><Icon name="ios-arrow-back"  style={{color:screenProps.iconColor.color,marginLeft:5,fontSize:20,padding:10}} /></Button>,
     headerRight:<View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
     <Icon name="heart" style={{color:screenProps.iconColor.color,marginRight:10,fontSize:20}} /><Icon name="more"  onPress={()=>navigation.navigate("Settings")} style={{color:screenProps.iconColor.color,marginRight:10,fontSize:20}} />
    </View>
    }); 
    constructor(props) {
        super(props);
        this.state = {
            SupplierName: "",
            deliveryOn:"",
            quantity:0,
            totalprice: 0,
            DeliveryAddress: "Snehapuri Colony, Tarnaka",
            item:"",
            imageurl:""
        }
    }
    placeConfirmOrder() {
        const navigation=this.props.navigation;
            navigation.navigate("PaymentScreen");
    }
    async componentWillMount(){
//    await AsyncStorage.getItem("item").then((value) => this.setState({ item: value }));
//    await AsyncStorage.getItem("imageurl").then((value) => this.setState({ imageurl: value }));
   // await AsyncStorage.getItem("totalprice").then((value) => this.setState({ "totalprice": value }));
  //  await AsyncStorage.getItem("serviceprovider").then((value) => this.setState({ "serviceprovider": value }));

     }
       render() {
        const navigation=this.props.navigation;
        const data=navigation.state.params.post_json;
        // const spdata = navigation.props.params.spdata
//const imageurl=navigation.state.params.imagedata;
         const ThemeStore=this.props.ThemeStore;
            let urldata = {uri:PUBLIC_DOMAIN+this.state.imageurl};
        return (
            <Container>
                    <Content>
                    <View style={{flex:1,flexDirection:"column"}}>
                    <Card style={{height: 250, width: "auto"}}>
        <CardItem>
            {/* <Image source={urldata}style={{height: 250, width: null, flex: 1}}/> */}
            <CustomImage url={data.image} /> 
            </CardItem> 
            </Card>
                </View>
        <Card>
         <CardItem>
            <Left>
              <Text>{data.item}--{data.itemDefinition}</Text>
            </Left> 
            <Right>
              <Text>Total:₹{data.totalPrice}</Text>
            </Right>
          </CardItem>
        </Card>
      
    <ListItem style={{height: 60}}>
    <View style={{margin:20}}>
    <Text>Brand Name    :{data.item}</Text>
    </View>
    </ListItem>
    <ListItem style={{height: 60}}>
    <View style={{margin:20}}>
    <Text>Quality    :{data.quantity}</Text>
    </View>
    </ListItem>
    {/* <ListItem style={{height: 60}}>
    <View style={{margin:20}}>
    <Text>Total:{data.totalPrice}</Text>
    </View>
    </ListItem> */}

    <ListItem style={{height: 60}}>

    <View style={{margin:20}}>
    <Text>Delivery Time: {data.deliveryOn}</Text>
    </View>
    </ListItem>
    <ListItem style={{height: 60}}>

    <View style={{margin:20}}>
    <Text>Delivery Address: {this.state.DeliveryAddress}</Text>
    </View>
    </ListItem>
    <ListItem style={{height: 60}}>

    <View style={{margin:20}}>
    <Text>Supplier : {data.serviceProvider}</Text>
    </View>
    </ListItem>

        <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:10,marginBottom:10}}>
            <Button block style={{backgroundColor:ThemeStore.buttonColors,width:"40%"}}  onPress={()=>this.placeConfirmOrder()}>
                <Text>pay Now</Text>
            </Button>
        </View>
        </Content>
         </Container> 
        );
      }
    }