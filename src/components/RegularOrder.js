
import React, {Component} from "react";
import { observer, inject } from "mobx-react";
import {Text,WebView, View,ActivityIndicator,ScrollView,Platform,TouchableOpacity, FlatList} from "react-native";
import { Container,Col,Row, ListItem,Input,Item, Content,Body,Title,Button,Icon,Card,CardItem,Label,Picker,Form} from "native-base";
import Fa from "react-native-vector-icons/FontAwesome";
import {NineCubesLoader, DoubleCircleLoader, TextLoader, CirclesRotationScaleLoader} from "react-native-indicator";
import Ionicon from "react-native-vector-icons/Ionicons";
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {APP_NAME} from "../../constants";
import EachRowRegularOrder from './EachRowRegularOrder';
@inject(["ThemeStore"],["UserStore"],["TankStore"])
@observer
export default class RegularOrder extends Component {
  static navigationOptions = ({ screenProps }) => ({
      title:'set Regular Order',
   headerRight:<View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
   <Icon name="heart" style={{color:screenProps.iconColor.color,marginRight:10,fontSize:20}} /><Icon name="more"  onPress={()=>navigation.navigate("Settings")} style={{color:screenProps.iconColor.color,marginRight:10,fontSize:20}} />
  </View>
  });
  constructor(props){
      super(props);
      this.state = {
        Supplier: "Select Supplier",
        Brand: "Select Brand",
        duration: [],
        delivery:"Pick Time",
        service: "",
        quantity:0,
        pricePerItem:0,
        price:0
      };
  };
  
  onServiceTypeChange(val) {
    if(val == 'Water Can') {
      this.state.pricePerItem = 30
    } else if(val == 'Select Category') {
        this.state.pricePerItem = 0
    } else
    this.state.pricePerItem = 500

    this.setState({service:val })
    this.getSuppliersList(val);
 }
  getSuppliersList(serviceType) {
    const UserStore=this.props.UserStore;
    const navigation=this.props.navigation;
     let postData = {
         serviceType: serviceType,
         area: "Tarnaka",
         city: "Hyderabad",
         state: "Telangana"
     }
     console.log(postData)
    UserStore.getSuppliersList(postData);
  }
  onSupplierChange(val) {
    this.setState({Supplier:val })
    alert(val);
    this.getBrandsList(val);
  }
  getBrandsList(supplier) {
    const UserStore=this.props.UserStore;
    const navigation=this.props.navigation;
      alert(supplier);
    UserStore.getBrandsList(supplier);
  }
  placeRegularOrder(){
    const UserStore=this.props.UserStore;
    const navigation=this.props.navigation;
    const CustomerLocationObj=UserStore.customerLocation;
    //  const serviceProviderObj=navigation.state.params.data; // This data is from pervios screen.Passed As data Param
    let post_json={
        "serviceID": this.state.service,
        "serviceType": this.state.service,
        "serviceItemBrand":this.state.Brand,
        "customer": this.state.Brand,
        "customerContactNumber": 9989315149,
        "customerLocationID": CustomerLocationObj,
        "serviceProvider": "sai",
        "serviceProviderID": this.state.service,
        "serviceProviderServiceID": this.state.service,
        "deliveryOn": this.state.delivery, // Delivery time is saving as selected of current state.
        "durationType": this.state.duration,
        "duration":this.state.duration,
        "quantity": this.state.quantity,
        "pricePerItem": this.state.pricePerItem,
        "totalPrice": this.state.price,
        "orderStartDate": "2018-10-12"
    };
    UserStore.placeRegularOrder(post_json);
    navigation.navigate("PaymentScreen");
  }
// handleQuantityClick(data) {
//   alert(data+'====')
//     this.setState({quantity: data})
// }
  handleIncCount=()=> {
    if(this.state.service == 'Water Can') {
      this.setState({quantity: this.state.quantity+1, price: this.state.price+30})
    } else 
      this.setState({quantity: this.state.quantity+1, price: this.state.price+500})
  }
  handleDecCount=()=> {
    if(this.state.quantity <=0) {
      return;
    }
    if(this.state.service == 'Water Can') {
      this.setState({quantity: this.state.quantity-1, price: this.state.price-30})
    } else 
      this.setState({quantity: this.state.quantity-1, price: this.state.price-500})
  }
  handleDuration(value) {
    alert(value);
      this.setState({duration: value})
  }
    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked=(date)=> {
    alert(date);
  // date = moment(date).add(30, 'day').format('YYYY-MM-DD'); // for specific format
  date = moment(date).add(1, 'month').format('YYYY-MM-DD');
  alert(date);
  this.setState({duration: date})
    this._hideDateTimePicker();
  };
  componentWillMount(){
    const UserStore=this.props.UserStore;
    // UserStore.getSuppliersList();
  }
  render() {
      const ThemeStore=this.props.ThemeStore;
      const navigation=this.props.navigation;
      const UserStore=this.props.UserStore;
      // let serviceData=
      //   <View style={{marginTop:200,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      //       <DoubleCircleLoader  color={ThemeStore.buttonColors} />
      //   </View>;
      // if(UserStore.suppliersList.length==0){
      //   alert('No Orders');
      //   serviceData=<View style={{marginTop:50,flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      //         <Fa name="gift" style={{color:ThemeStore.buttonColors,fontSize:30}} />
      //         <Text style={{color:ThemeStore.buttonColors}}>No Suppliers Avaialble!.</Text>
      //     </View>;
      // }else{
      //   alert(' Orders');
      //   serviceData=
      //   <View>  
      //   <Picker
      //   selectedValue={this.state.Supplier}
      //   onValueChange={this.onSupplierChange.bind(this)}
      //   >
      //  {UserStore.suppliersList.map((item, key)=> {
      //    return(  <Picker.Item label={item._id} value={item._id} key={key._id} />)})}
            
      // </Picker>
      // </View>
      //  {/* <EachRowRegularOrder navigation={navigation} data={UserStore.suppliersList} />

        // serviceData=
        //       <View style={{justifyContent: "center",  flex:1,  paddingTop: (Platform.OS === "iOS") ? 20 : 0}}>
        //           <FlatList
        //               data={UserStore.suppliersList}
        //               renderItem={({item,index}) => <EachRowRegularOrder  navigation={navigation} data={item} key={item._id}/>}
        //               keyExtractor={(item, index) => index}
        //               stickyHeaderIndices={[0]}
        //           />
        //       </View>;

      return (
          <Container>
            <Form>
            <ListItem>
           <Picker
              iosHeader="Select Category"
              mode="dropdown"
              selectedValue={this.state.service}
              onValueChange={this.onServiceTypeChange.bind(this)}
              // onValueChange={(val) =>this.setState({service: val})}
            >
            <Picker.Item label="Select Category" value="Select Category"/>
              <Picker.Item label="Water Can" value="Water Can" />
              <Picker.Item label="Tanker" value="Tanker" />              
            </Picker>
            </ListItem>
        
       {/* <ListItem>
          <Text>{UserStore.suppliersList ? UserStore.suppliersList.length : 0} Suppliers Avaialble</Text>
           <Picker
        selectedValue={this.state.Supplier}
        onValueChange={this.onSupplierChange.bind(this)}
        >
       {UserStore.suppliersList ? UserStore.suppliersList.map((item, key)=>(
            <Picker.Item label={item._id} value={item._id} key={key} />))  : ''}
            
      </Picker>  
      </ListItem>  */}

             <ListItem> 
              <Picker
              iosHeader="Select Supplier"
              mode="dropdown"
              selectedValue={this.state.Supplier}
              onValueChange={this.onSupplierChange.bind(this)}
            >
            <Picker.Item label="Select Supplier" value="Select Supplier"/>
              <Picker.Item label="Sri Sai Suppliers" value="Sri Sai Suppliers" />
              <Picker.Item label="Sri Ganesh Suppliers" value="Sri Ganesh Suppliers" />
              <Picker.Item label="Evian" value="Evian" />
              <Picker.Item label="Bisleri" value="Bisleri" />
              <Picker.Item label="Aquafina" value="Aquafina" />
            </Picker>  
           </ListItem> 

            <ListItem>
            <Picker
              iosHeader="Select Brand"
              mode="dropdown"
              selectedValue={this.state.Brand}
              onValueChange={(val) =>this.setState({Brand: val})}
            >
            <Picker.Item label="Select Brand" value="Select Brand"/>  
              <Picker.Item label="Manjeera" value="Manjeera" />
              <Picker.Item label="Fiji" value="Fiji" />
              <Picker.Item label="Evian" value="Evian" />
              <Picker.Item label="Bisleri" value="Bisleri" />
              <Picker.Item label="Aquafina" value="Aquafina" />
            </Picker>
            </ListItem>
            <ListItem>
             <Row>
            <Col>
            <Label>Quantity</Label></Col>
          <Button rounded light style={{width: 30,height:30,textAlign:'justify',backgroundColor:"blue",fontSize:24 }} onPress={this.handleIncCount}><Text style={{ paddingLeft:13,color:"white" }}>+</Text></Button>
          <Text style={{width:80,borderWidth:2,marginLeft:10,marginRight:10,fontWeight: 'bold',paddingLeft:35,paddingTop:5}}>{this.state.quantity}</Text>
          <Button rounded light style={{width: 30,height:30,textAlign:'justify',backgroundColor:"blue",fontSize:24}} onPress={this.handleDecCount}><Text style={{ paddingLeft:13,color:"white" }}>-</Text></Button> 
           </Row>
           </ListItem>
           <ListItem>
             <Row><Col>
            <Label>Delivery on </Label></Col>
          <Picker
                mode="dropdown"
                iosHeader="Delivery On"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                selectedValue={this.state.delivery}
                onValueChange={(val)=>this.setState({delivery:val})}
            >
                <Picker.Item label="Pick Time" value="Pick Time"/>
                <Picker.Item label="9am - 1pm" value="9am - 1pm" />
                <Picker.Item label="1pm - 5pm" value="1pm - 5pm" />
                <Picker.Item label="5pm - 9pm" value="5pm - 9pm" />
            </Picker>
            </Row>
       </ListItem>
       <ListItem>
         <Row><Col>
        <Label>Duration </Label></Col>
      <Button light value="Daily" onPress={()=>this.handleDuration("Daily")}><Text>Daily</Text></Button>
        <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this.showDateTimePicker}>
         
        <Text>Monthly</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}

        />
      </View>
        </Row>
        </ListItem>
        <ListItem style={{width: "90%"}}>
        <Row><Col>
        <Label>price PerItem :</Label>
        </Col>
        <Text>{this.state.pricePerItem}</Text>
        </Row>
        </ListItem>
        <ListItem style={{width: "90%"}}>
        <Row><Col>
        <Label>TotalPrice :</Label>
        </Col>
        <Text>{this.state.price}</Text>
        </Row>
        </ListItem>
        <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:10,marginBottom:10}}>
            <Button  onPress={()=>this.placeRegularOrder()} block style={{backgroundColor:ThemeStore.buttonColors,width:"40%"}}>
                <Text>Order</Text>
            </Button>
        </View> 
            </Form>
          </Container>
      );
  }
}
