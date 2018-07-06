import React from "react";
import { observer, inject } from "mobx-react";
import { StyleSheet, Text,View,ActivityIndicator} from "react-native";
import { Container, Header, Content,Body,Title,Button } from "native-base";
import Fa from "react-native-vector-icons/FontAwesome";
import {CirclesLoader, PulseLoader, CirclesRotationScaleLoader, EatBeanLoader} from "react-native-indicator";
@inject(["ThemeStore"])
@observer
export default class ThemeChanging extends React.Component {
    constructor(props){
        super(props);
        const ThemeStore=this.props.ThemeStore;
        const navigation=this.props.navigation;
        this.state={
            text1:"Changing Theme",
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
    title:"Theme Changing",
    headerRight:<View  style={{marginRight:5}} />,
    headerLeft: <View  style={{marginLeft:5}} />,
});
componentWillMount(){
    const ThemeStore=this.props.ThemeStore;
    const navigation=this.props.navigation;
}
componentDidMount(){
    const ThemeStore=this.props.ThemeStore;
    const navigation=this.props.navigation;
    setTimeout(function(){
        this.setState({
            text1:"Successfully Theme Changed!",
            text2:"Redirecting to Home Screen..",
        });
    }.bind(this), 3000);
    setTimeout(function(){
        navigation.navigate("Home");
    }, 7000);
}
render() {
    const ThemeStore=this.props.ThemeStore;
    const navigation=this.props.navigation;
    return (
        <View style={{backgroundColor:ThemeStore.contentBackgroundColor,flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
            <Text style={{color:ThemeStore.buttonColors}}>{this.state.text1}</Text>
            <Text style={{color:ThemeStore.buttonColors}}>{this.state.text2}</Text>
            <CirclesRotationScaleLoader color={ThemeStore.buttonColors} />
        </View>
    );
}
}
