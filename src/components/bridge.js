import React from "react";
import {View,Text,StyleSheet,Button,Image,Platform,StatusBar,AsyncStorage,BackHandler} from "react-native";
import { observer, inject } from "mobx-react";
import Drawer from "./router";
import {Bridge as Home} from "./bridge";
import { Container, Header, Content } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { NavigationActions,StackNavigator } from "react-navigation";
const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor,top:0,left:0 }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);
@inject(["ThemeStore"],["TankStore"])
@observer
export default class Bridge extends React.Component {
    constructor(props){
        super(props);
        this.state={
            selectedTheme:"",
            notification:false,
            device_registered:false
        };
    }
    async componentWillMount(){
        const ThemeStore=this.props.ThemeStore;
        await AsyncStorage.getItem("selectedTheme").then((value) => this.setState({ "selectedTheme": value }));
        await AsyncStorage.getItem("device_registered").then((value) => this.setState({ "device_registered": value }));
        switch(this.state.selectedTheme) {
        case "purple":
            ThemeStore.PurpleTheme();
            break;
        case "red":
            ThemeStore.RedTheme();
            break;
        case "pink":
            ThemeStore.PinkTheme();
            break;
        case "indigo":
            ThemeStore.IndigoTheme();
            break;
        case "teal":
            ThemeStore.TealTheme();
            break;
        case "green":
            ThemeStore.GreenTheme();
            break;
        case "blue":
            ThemeStore.BlueTheme();
            break;
        case "orange":
            ThemeStore.OrangeTheme();
            break;
        case "lime":
            ThemeStore.LimeTheme();
            break;
        default:
            ThemeStore.BlueTheme();
        }
    }
    render() {
        const navigation=this.props.navigation;
        const ThemeStore=this.props.ThemeStore;
        const JobStore=this.props.JobStore;
        return (
            <View style={styles.container}>
                <MyStatusBar  backgroundColor={ThemeStore.statusBarBackgroundColor} barStyle="light-content" />
                <Drawer style={{backgroundColor: ThemeStore.headerBackgroundColor}} screenProps={{ headerStyle: { backgroundColor:ThemeStore.headerBackgroundColor },headerTitleStyle: {textAlign: "center",alignSelf:"center",color:ThemeStore.headerTextColor},iconColor:{color:ThemeStore.headerTextColor}}} backgroundColor={ThemeStore.headerBackgroundColor}  />
            </View>
        );
    }
}
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 0 : StatusBar.currentHeight;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        height: 0,
    },
});
