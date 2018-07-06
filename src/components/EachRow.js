import React from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
import { observer, inject } from "mobx-react";
import Fa from "react-native-vector-icons/FontAwesome";
import {Text, Image,TouchableHighlight,Alert,View,TouchableOpacity, AsyncStorage} from "react-native";
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
            <Image  source={{uri:PUBLIC_DOMAIN+this.state.imageUri}} style={{height:50,width:50,borderRadius:25, width: null,flex:1}}
                onError={(e) => this.setState({imageUri: "http://www.novelupdates.com/img/noimagefound.jpg"})}/>
        );
    }
}
@inject(["ThemeStore"],["TankStore"])
@observer
export default class EachRow extends React.Component {
    selectSupplier(data){
        const TankStore=this.props.TankStore;
        const navigation=this.props.navigation;
        TankStore.getServiceProvidersInfo(data.serviceProviderObj.id);
        AsyncStorage.setItem("serviceprovider",JSON.stringify(data.serviceProviderObj.serviceProvider));
        navigation.navigate("OrderScreen",{data:data});
    }
    render(){
        const ThemeStore=this.props.ThemeStore;
        const navigation=this.props.navigation;
        const data=this.props.data;
        return(
            <TouchableOpacity onPress={()=>this.selectSupplier(data)}>
                <Card  key={data.id}>
                    <CardItem style={{flex:1,flexDirection:"row"}}>
                        <View style={{width:50,height:50,marginRight:10}}>
                            <CustomImage url={data.serviceProviderObj.serviceProviderIconPath} />
                        </View>
                        <View style={{width:180}}>
                            <Text style={{color:ThemeStore.textColor}}>{data.serviceProviderObj.serviceProvider}{"\n"}</Text>
        
                            <RatingComponent rating={data.avgRating}/>
                            <Text style={{color:ThemeStore.textColor}}>{"\n"} Delivery In {data.maxTimeToServeExpress}</Text>
                        </View>
                        <View style={{width:70,position:"absolute",right:10}}>
                            <Text style={{color:ThemeStore.textColor,fontSize:20}}><Fa style={{fontSize:20}} name="rupee"/>{" "}{data.serviceProviderServiceObj.pricePerItem}</Text>
                            <Text style={{marginLeft:20,color:ThemeStore.textColor,fontSize:10}}>{data.serviceObj.itemDefinition}</Text>
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
