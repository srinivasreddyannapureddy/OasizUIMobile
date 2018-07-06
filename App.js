import React from "react";
import Expo from "expo";
import {Platform,View,StyleSheet,StatusBar,Text,Button} from "react-native";
import {Provider} from "mobx-react";
import stores from "./src/stores";
import Bridge from "./src/components/bridge";
import { Font , AppLoading} from "expo";
export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:true
        };
    }
    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            FontAwesome:require("./node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf"),
            Ionicons:require("./node_modules/react-native-vector-icons/Fonts/Ionicons.ttf"),
            "Material Icons":require("./node_modules/react-native-vector-icons/Fonts/MaterialIcons.ttf"),
            MaterialCommunityIcons:require("./node_modules/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf")
        });
        this.setState({ loading: false });
    }
    render() {
        if(!this.state.loading){
            return (
                <Provider {...stores}>
                    <Bridge />
                </Provider>
            );
        }else{
            return (<Text>Loading...</Text>);
        }
    }
}
