import React from "react";
import {View,Text,StyleSheet,Button,Image,Platform,StatusBar,AsyncStorage} from "react-native";
import { observer, inject } from "mobx-react";
import Drawer from "./router";
import Fa from "react-native-vector-icons/FontAwesome";
import {Draw as Home} from "./bridge";
@inject(["ThemeStore"])
@observer
export default class WholeComponent extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        const navigation=this.props.navigation;
        const ThemeStore=this.props.ThemeStore;
        return (
            <View>
                <Drawer style={{backgroundColor: ThemeStore.headerBackgroundColor}} screenProps={{ headerStyle: { backgroundColor:ThemeStore.headerBackgroundColor },headerTitleStyle: {textAlign: "center",alignSelf:"center",color:ThemeStore.headerTextColor},iconColor:{color:ThemeStore.headerTextColor}}} backgroundColor={ThemeStore.headerBackgroundColor}  />
            </View>
        );
    }
}
