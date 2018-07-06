import React from "react";
import { StyleSheet, TouchableWithoutFeedback,Text, View ,ScrollView,ActivityIndicator,Image,TouchableHighlight,BackHandler} from "react-native";
import { Container, Header, Content,Button,Card,CardItem,Body,Icon} from "native-base";
import { StackNavigator,DrawerNavigator } from "react-navigation";
import { DrawerItems, DrawerNavigation,TabNavigator} from "react-navigation";
import { observer, inject } from "mobx-react";
import Fa from "react-native-vector-icons/FontAwesome";
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import ThemeSettings from "./ThemeSettings";
import Settings from "./Settings";
import ThemeChanging from "./ThemeChanging";
import SplashScreen from "./SplashScreen";
import OtpScreen from "./OtpScreen";
import OrderScreen from "./OrderScreen";
import SelectArea from "./SelectArea";
import OrderTrack from "./OrderTrack";
import PaymentScreen from "./PaymentScreen";
import UpdateProfile from "./UpdateProfile";
import OrderHistory from "./OrderHistory";
import ConfirmOrder from "./ConfirmOrder";
import RegularOrder from "./RegularOrder";
import MyFavourites from "./MyFavourites";
import {LOGO_IMG,APP_NAME} from "../../constants";
const Stack = StackNavigator({
    SplashScreen:{screen:SplashScreen},
    Home : {screen:HomeScreen},
    ThemeSettings:{screen:ThemeSettings},
    Settings:{screen:Settings},
    ThemeChanging:{screen:ThemeChanging},
    LoginScreen:{screen:LoginScreen},
    SelectArea:{screen:SelectArea},
    OrderScreen:{screen:OrderScreen},
    OrderTrack:{screen:OrderTrack},
    OtpScreen:{screen:OtpScreen},
    PaymentScreen:{screen:PaymentScreen},
    UpdateProfile:{screen:UpdateProfile},
    OrderHistory:{screen:OrderHistory},
    ConfirmOrder:{screen:ConfirmOrder},
    RegularOrder:{screen:RegularOrder},
    MyFavourites:{screen: MyFavourites}

},
{
    navigationOptions:({navigation,screenProps})=>({
        title:APP_NAME,
        headerTitleStyle :screenProps.headerTitleStyle,
        headerStyle:screenProps.headerStyle,
        headerLeft:<Button transparent onPress={()=>navigation.navigate("DrawerOpen")} style={{width:100}}><Icon name="menu"  style={{color:screenProps.iconColor.color,marginLeft:5,fontSize:20,padding:10}} /></Button>,
    })
});
@inject(["ThemeStore"])
@observer
export default class DrawerContent extends React.Component {
    componentWillMount(){
        const navigation=this.props.navigation;
        const ThemeStore=this.props.ThemeStore;
    }
    render(){
        const JobStore=this.props.JobStore;
        const ThemeStore=this.props.ThemeStore;
        const navigation =this.props.navigation;
        let imgTag=<Image source={LOGO_IMG} style={{width:150,height:150,backgroundColor:"transparent",borderRadius:75,borderWidth:1,borderColor:ThemeStore.headerTextColor}} />;
        return(
            <Container>
                <Content>
                    <View
                        style={{
                            backgroundColor: ThemeStore.statusBarBackgroundColor,
                            height: 150,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {imgTag}
                    </View>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate("Home")}>
                        <Card style={{backgroundColor:ThemeStore.buttonColors}} >
                            <CardItem style={{backgroundColor:ThemeStore.buttonColors}}>
                                <Icon name="ios-home" style={{fontSize:15,color:ThemeStore.buttonTextColor,width:20,marginRight:10}}/>
                                <Body>
                                    <Text style={{color:ThemeStore.buttonTextColor}}>Home</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate("Home")}>
                        <Card style={{backgroundColor:ThemeStore.buttonColors}} >
                            <CardItem style={{backgroundColor:ThemeStore.buttonColors}}>
                                <Fa name="heart" style={{fontSize:15,color:ThemeStore.buttonTextColor,width:20,marginRight:10}}/>
                                <Body>
                                    <Text style={{color:ThemeStore.buttonTextColor}}>Tanker Suppliers</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Card style={{backgroundColor:ThemeStore.buttonColors}} >
                            <CardItem style={{backgroundColor:ThemeStore.buttonColors}}>
                                <Fa name="heart" style={{fontSize:15,color:ThemeStore.buttonTextColor,width:20,marginRight:10}}/>
                                <Body>
                                    <Text style={{color:ThemeStore.buttonTextColor}}>Label</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Card style={{backgroundColor:ThemeStore.buttonColors}} >
                            <CardItem style={{backgroundColor:ThemeStore.buttonColors}}>
                                <Fa name="heart" style={{fontSize:15,color:ThemeStore.buttonTextColor,width:20,marginRight:10}}/>
                                <Body>
                                    <Text style={{color:ThemeStore.buttonTextColor}}>Top Brands</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Card style={{backgroundColor:ThemeStore.buttonColors}} >
                            <CardItem style={{backgroundColor:ThemeStore.buttonColors}}>
                                <Fa name="heart" style={{fontSize:15,color:ThemeStore.buttonTextColor,width:20,marginRight:10}}/>
                                <Body>
                                    <Text style={{color:ThemeStore.buttonTextColor}}>Bubble Top Suppliers</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate("OrderHistory")}>
                        <Card style={{backgroundColor:ThemeStore.buttonColors}} >
                            <CardItem style={{backgroundColor:ThemeStore.buttonColors}}>
                                <Fa name="heart" style={{fontSize:15,color:ThemeStore.buttonTextColor,width:20,marginRight:10}}/>
                                <Body>
                                    <Text style={{color:ThemeStore.buttonTextColor}}>Order History</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate("OrderTrack")}>
                        <Card style={{backgroundColor:ThemeStore.buttonColors}} >
                            <CardItem style={{backgroundColor:ThemeStore.buttonColors}}>
                                <Fa name="heart" style={{fontSize:15,color:ThemeStore.buttonTextColor,width:20,marginRight:10}}/>
                                <Body>
                                    <Text style={{color:ThemeStore.buttonTextColor}}>Track Order</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback  onPress={()=>navigation.navigate("MyFavourites")}>
                        <Card style={{backgroundColor:ThemeStore.buttonColors}} >
                            <CardItem style={{backgroundColor:ThemeStore.buttonColors}}>
                                <Fa name="heart" style={{fontSize:15,color:ThemeStore.buttonTextColor,width:20,marginRight:10}}/>
                                <Body>
                                    <Text style={{color:ThemeStore.buttonTextColor}}>My Favourates</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate("RegularOrder")}>
                        <Card style={{backgroundColor:ThemeStore.buttonColors}} >
                            <CardItem style={{backgroundColor:ThemeStore.buttonColors}}>
                                <Fa name="heart" style={{fontSize:15,color:ThemeStore.buttonTextColor,width:20,marginRight:10}}/>
                                <Body>
                                    <Text style={{color:ThemeStore.buttonTextColor}}>Regular Order</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate("Settings")}>
                        <Card style={{backgroundColor:ThemeStore.buttonColors}} >
                            <CardItem style={{backgroundColor:ThemeStore.buttonColors}}>
                                <Fa name="heart" style={{fontSize:15,color:ThemeStore.buttonTextColor,width:20,marginRight:10}}/>
                                <Body>
                                    <Text style={{color:ThemeStore.buttonTextColor}}>Support</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Card style={{backgroundColor:ThemeStore.buttonColors}} >
                            <CardItem style={{backgroundColor:ThemeStore.buttonColors}}>
                                <Fa name="heart" style={{fontSize:15,color:ThemeStore.buttonTextColor,width:20,marginRight:10}}/>
                                <Body>
                                    <Text style={{color:ThemeStore.buttonTextColor}}>Review</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </TouchableWithoutFeedback>
                </Content>
            </Container>
        );
    }
}
const Drawer = DrawerNavigator(
    {
        Home: {screen: Stack},
    },
    {
        contentComponent: ({ navigation }) => (
            <DrawerContent  navigation={navigation} />
        ),
    }
);
module.exports = Drawer;
