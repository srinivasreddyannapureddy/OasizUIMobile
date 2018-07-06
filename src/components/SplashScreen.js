import React from "react";
import { observer, inject } from "mobx-react";
import { StyleSheet, Text,View,ActivityIndicator,Image,AsyncStorage} from "react-native";
import { Container, Header, Content,Body,Title,Button } from "native-base";
import Fa from "react-native-vector-icons/FontAwesome";
import {LinesLoader, DoubleCircleLoader, CirclesRotationScaleLoader, EatBeanLoader} from "react-native-indicator";
import {LOGO_IMG} from "../../constants";
@inject(["ThemeStore"],["UserStore"],["TankStore"])
@observer
export default class SplashScreen extends React.Component {
    constructor(props){
        super(props);
        const ThemeStore=this.props.ThemeStore;
        const navigation=this.props.navigation;
        this.state={
            text1:"Chaning Theme",
            text2:"Please Wait.."
        };
    }
    componentWillReceiveProps() {
        const ThemeStore=this.props.ThemeStore;
        const navigation=this.props.navigation;
        if (ThemeStore && !navigation.state.params) {
            navigation.setParams({headerTextColor: ThemeStore.textColor,headerColor:ThemeStore.headerColor});
        }
    }
static navigationOptions = ({ navigation,screenProps }) => ({
    headerRight:<View  style={{marginRight:5}} />,
    headerLeft: <View  style={{marginLeft:5}} />,
});
componentWillMount(){
    const ThemeStore=this.props.ThemeStore;
    const navigation=this.props.navigation;
}
async componentDidMount(){
    const ThemeStore=this.props.ThemeStore;
    const UserStore=this.props.UserStore;
    const TankStore=this.props.TankStore;
    const navigation=this.props.navigation;
    await AsyncStorage.getItem("authToken").then((value) => {UserStore.changeValues(value,"authToken");TankStore.changeValues(value,"authToken");});
    await AsyncStorage.getItem("isLoggedIn").then((value) =>{
        if(value=="true"){
            setTimeout(function(){
                navigation.navigate("Home");
            }, 2000);
        }else{
            setTimeout(function(){
                navigation.navigate("LoginScreen");
            }, 2000);
        }
    });
}
render() {
    const ThemeStore=this.props.ThemeStore;
    const navigation=this.props.navigation;
    return (
        <View style={{backgroundColor:ThemeStore.headerBackgroundColor,flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
            <Image source={LOGO_IMG} style={{width:150,height:150,backgroundColor:"transparent",borderRadius:75,borderWidth:1,borderColor:ThemeStore.headerTextColor}} />
            <Text>{"\n"}</Text>
            <DoubleCircleLoader  color={ThemeStore.buttonTextColor} />
        </View>
    );
}
}
