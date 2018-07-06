import React from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
import { observer, inject } from "mobx-react";
import Fa from "react-native-vector-icons/FontAwesome";
import {Text, Image,TouchableHighlight,Alert,View,TouchableOpacity} from "react-native";
import { Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from "native-base";
import {PUBLIC_DOMAIN} from "../../constants";
class RatingComponent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let ratings="";
        switch(this.props.rating) {
        case 1:
            return( <Fa name="star"/>);
            break;
        case 2:
            return( <View style={{flexDirection:"row"}}>
                <Fa name="star"/>
                <Fa name="star"/>
            </View>);
            break;
        case 3:
            return( <View style={{flexDirection:"row"}}>
                <Fa name="star"/>
                <Fa name="star"/>
                <Fa name="star"/>
            </View>);
            break;
        case 4:
            return( <View style={{flexDirection:"row"}}>
                <Fa name="star"/>
                <Fa name="star"/>
                <Fa name="star"/>
                <Fa name="star"/>
            </View>);
            break;
        case 5:
            return(<View style={{flexDirection:"row"}}>
                <Fa name="star"/>
                <Fa name="star"/>
                <Fa name="star"/>
                <Fa name="star"/>
                <Fa name="star"/>
            </View>);
            break;
        default:
            return(<View style={{flexDirection:"row"}}>
                <Fa name="star"/>
                <Fa name="star"/>
                <Fa name="star"/>
                <Fa name="star"/>
                <Fa name="star"/>
            </View>);
        }
    }
}
class CustomImage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            imageUri:this.props.url,
        };
    }
    render(){
        return(
            <Image  source={{uri:this.state.imageUri}} style={{height:50,width:50,borderRadius:25, width: null,flex:1}}
                onError={(e) => this.setState({imageUri: "http://www.novelupdates.com/img/noimagefound.jpg"})}/>
        );
    }
}
@inject(["ThemeStore"])
@observer
export default class EachRowFavourite extends React.Component {
    render(){
        const ThemeStore=this.props.ThemeStore;
        const navigation=this.props.navigation;
        const data=this.props.data;
        return(
            <TouchableOpacity onPress={()=>navigation.navigate("OrderScreen")}>
                <Card  key={data.orderid}>
                    <CardItem style={{flex:1,flexDirection:"row"}}>
                        <View style={{width:50,height:50,marginRight:10}}>
                            <CustomImage url={data.image} />
                        </View>
                        <View style={{width:180}}>
                            <Text style={{color:ThemeStore.textColor}}>{data.name}{"\n"}</Text>
                            <RatingComponent rating={data.rating}/>
                            <Text style={{color:ThemeStore.textColor}}>{"\n"} Order Id : {data.orderid}</Text>
                        </View>
                        <View style={{width:50,position:"absolute",right:10}}>
                            {data.status=="D"?<Image  source={require("../../assets/heart.png")} style={{height:30,width:50,borderRadius:25, width: null,flex:1}}
                                onError={(e) => this.setState({imageUri: "http://www.novelupdates.com/img/noimagefound.jpg"})}/>:<Text style={{fontSize:40}}>P</Text>
                            }
                        </View>
                    </CardItem>
                    <CardItem>
                        <Body>
                        </Body>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        );
    }
}
