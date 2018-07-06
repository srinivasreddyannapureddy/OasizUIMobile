import React from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
import { observer, inject } from "mobx-react";
import Fa from "react-native-vector-icons/FontAwesome";
import {Text, Image,TouchableHighlight,Alert,View,TouchableOpacity} from "react-native";
import { Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Picker, Container } from "native-base";
import {PUBLIC_DOMAIN} from "../../constants";
@inject(["ThemeStore"])
@observer
export default class EachRowRegularOrder extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state= {
    //         Supplier: "Select Supplier",
    //     }
    // }
    // onSupplierChange(val) {
    //     this.setState({Supplier:val })
    //     alert(val+'==========');
    //     this.getBrandsList(val);
    //   }
    //   getBrandsList(supplier) {
    //     const UserStore=this.props.UserStore;
    //     const navigation=this.props.navigation;
    //       alert(supplier);
    //     UserStore.getBrandsList(supplier);
    //   }
    
    render(){
        const ThemeStore=this.props.ThemeStore;
        const navigation=this.props.navigation;
        const data=this.props.data;
        alert(JSON.stringify(data)+'=================');
        return(
            <Container>
                </Container>
        //     <Picker
        //     selectedValue={this.state.Supplier}
        //     onValueChange={this.onSupplierChange.bind(this)}
        //     >
        //    {data ? data.map((item, key)=>(
        //         <Picker.Item label={item._id} value={item._id} key={key._id} />))  : ''}
                
        //   </Picker>  
            // <TouchableOpacity onPress={()=>navigation.navigate("OrderScreen")}>
            //     <Card  key={data.id}>
            //         <CardItem style={{flex:1,flexDirection:"row"}}>
            //             <View style={{width:50,height:50,marginRight:10}}>
            //             <Text>Data</Text>
            //             </View>
            //             <View style={{width:180}}>
            //                 <Text style={{color:ThemeStore.textColor}}>{data.city}{"\n"}</Text>
            //                 <Text style={{color:ThemeStore.textColor}}>{"\n"} pricePerItem : {data.pricePerItem}</Text>
            //             </View>
            //         </CardItem>
            //         <CardItem>
            //             <Body>
            //             </Body>
            //         </CardItem>
            //     </Card>
            // </TouchableOpacity>
        );
    }
}
