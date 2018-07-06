import { observable, action } from "mobx";
import {AsyncStorage,AppState} from "react-native";
import {PUBLIC_DOMAIN} from "../../constants";
import { Permissions, Notifications } from "expo";
export default class UserStore{
    @observable LoginResponse="";
    @observable authToken="";
    @observable VerifyResponse="";
    @observable isVerfied=false
    @observable isLoading=true;
    @observable internet_connection=true;
    @observable UserName="";
    @observable customerLocation=[];
    @observable suppliersList=[];
    @observable brandsList={};
    @observable myFavourites=[{name:"Supplier Name",rating:5,orderid:"sup0909009",status:"D",image:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png"},{name:"Supplier Name",rating:5,orderid:"sup0909009",status:"P",image:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png"},{name:"Supplier Name",rating:5,orderid:"sup0909009",status:"D",image:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png"}];
    @observable confirmOrderResponse={}
    // SAMPLE ORDER HISTORY
    @observable OrderHistory=[{name:"Supplier Name",rating:5,orderid:"sup0909009",status:"D",image:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png"},{name:"Supplier Name",rating:5,orderid:"sup0909009",status:"P",image:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png"},{name:"Supplier Name",rating:5,orderid:"sup0909009",status:"D",image:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png"}];
    @action userLogin(post_json){
        var headers = {"Accept": "application/json", "Content-Type": "application/json","token":this.authToken};
        this.internet_connection=true;
        fetch(PUBLIC_DOMAIN+"api/mobile/endusers/registration/otp", {
            method: "POST",
            headers: headers,
            body:JSON.stringify(post_json)
        }).then((response) => {
            this.authToken=response.headers.get("token");
          AsyncStorage.setItem("authToken", String(this.authToken));
            response.json().then((responseJson) => {
                this.LoginResponse=responseJson;
                console.log("Login response", responseJson);
            });
        })
            .catch((error) =>{
                console.error("login error",error);
            });
    }
    @action userValidate(post_json,navigation){
        this.internet_connection=true;
        var headers = {"Accept": "application/json", "Content-Type": "application/json","token":this.authToken};
        fetch(PUBLIC_DOMAIN+"api/mobile/endusers/registration/otp/validation", {
            method: "POST",
            headers: headers,
            body:JSON.stringify(post_json)
        }).then((response) => {
            this.authToken=response.headers.get("token");
            AsyncStorage.setItem("authToken", String(this.authToken));
            console.log("responsestatus", response.status);
            if(response.status==200){
                AsyncStorage.setItem("isLoggedIn", "true");
                navigation.navigate("SelectArea");
            }else{
                this.isVerfied=false;
                AsyncStorage.setItem("isLoggedIn", "false");
            }
            response.json().then((responseJson) => {
                this.VerifyResponse=responseJson;
                console.log("validate response", responseJson);
            });
        })
            .catch((error) =>{
                console.error("validate error",error);
            });
    }
    @action createCustomerLocation(post_json){
        var headers = {"Accept": "application/json", "Content-Type": "application/json","token":this.authToken};
        fetch(PUBLIC_DOMAIN+"api/mobile/customers/locations", {
            method: "POST",
            headers: headers,
            body:JSON.stringify(post_json)
        }).then((response) => response.json()).then((responseJson) => {
            console.log("create location response", responseJson);
        }).catch((error) => {
            console.log("fetch location error: "+ error);
        });
    }
    @action getCustomerLocation(post_json){
        var headers = {"Accept": "application/json", "Content-Type": "application/json","token":this.authToken};
        fetch(PUBLIC_DOMAIN+"api/mobile/customers/locations", {
            method: "GET",
            headers: headers,
        }).then((response) => response.json()).then((responseJson) => {
            alert('==========='+JSON.stringify(responseJson.statusResult))
            this.customerLocation=responseJson.statusResult;
            console.log("get location response", responseJson);
        }).catch((error) => {
            console.log("get location error: "+ error);
        });
    }
    @action placeOrder(post_json){
        var headers = {"Accept": "application/json", "Content-Type": "application/json","token":this.authToken};
        console.log("authToken", this.authToken);
        fetch(PUBLIC_DOMAIN+"api/mobile/endusers/service/orders/normalorder/incart", {
            method: "POST",
            headers: headers,
            body:JSON.stringify(post_json)
        }).then((response) => response.json()).then((responseJson) => {
            console.log("Place order History response", responseJson);
        }).catch((error) => {
            console.log("Place order History error: "+ error);
        });
    }
    @action getSuppliersList(postData){
        var headers = {"Accept": "application/json", "Content-Type": "application/json","token":this.authToken};
        console.log("authToken", this.authToken);
        fetch(PUBLIC_DOMAIN+"api/mobile/endusers/serviceproviders/services/"+postData.serviceType+"/"+postData.area+"/"+postData.city+"/"+postData.state, {
            method: "GET",
            headers: headers,
        }).then((response) => response.json()).then((responseJson) => {
            alert(JSON.stringify(responseJson));
            this.suppliersList= responseJson.statusResult;
            alert(JSON.stringify(responseJson.statusResult))
            console.log("get suppliers list", responseJson);
        }).catch((error) => {
            console.log("get suppliers error: "+ error);
        });
    }
    @action getBrandsList(supplier) {
        var headers = {"Accept": "application/json", "Content-Type": "application/json","token":this.authToken};
        console.log("authToken", this.authToken);
        fetch(PUBLIC_DOMAIN+"/api/serviceproviders/services/servicesinfo/"+supplier, {
            method: "GET",
            headers: headers,
        }).then((response) => response.json()).then((responseJson) => {
            this.brandsList= responseJson.statusResult;
            console.log("get brands list", responseJson);
        }).catch((error) => {
            console.log("get brands error: "+ error);
        });
    }
    @action placeRegularOrder(post_json){
        var headers = {"Accept": "application/json", "Content-Type": "application/json","token":this.authToken};
        console.log("authToken", this.authToken);
        fetch(PUBLIC_DOMAIN+"api/mobile/endusers/orders/regularorders", {
            method: "POST",
            headers: headers,
            body:JSON.stringify(post_json)
        }).then((response) => response.json()).then((responseJson) => {
            console.log("place regular order response", responseJson);
        }).catch((error) => {
            console.log("Place regular order error: "+ error);
        })
    }
    @action placeExpressOrder(post_json){
        var headers = {"Accept": "application/json", "Content-Type": "application/json","token":this.authToken};
        console.log("authToken", this.authToken);
        fetch(PUBLIC_DOMAIN+"api/mobile/endusers/service/orders/normalorder/incart", {
            method: "POST",
            headers: headers,
            body:JSON.stringify(post_json)
        }).then((response) => response.json()).then((responseJson) => {
            console.log("Place order History response", responseJson);
        }).catch((error) => {
            console.log("Place order History error: "+ error);
        });
    }
    @action confirmOrder(post_json){
        var headers = {"Accept": "application/json", "Content-Type": "application/json","token":this.authToken};
        fetch(PUBLIC_DOMAIN+"api/mobile/endusers/service/orders/normalorder/placeorder", {
            method: "POST",
            headers: headers,
        }).then((response) => response.json()).then((responseJson) => {
            this.confirmOrderResponse=responseJson.statusResult;
            console.log("get location response", responseJson);
        }).catch((error) => {
            console.log("get location error: "+ error);
        });
    }
    @action getOrderHistory(){
        var headers = {"Accept": "application/json", "Content-Type": "application/json","token":this.authToken};
        console.log("authToken", this.authToken);
        fetch(PUBLIC_DOMAIN+"api/mobile/endusers/ordershistory/neworder", {
            method: "GET",
            headers: headers,
        }).then((response) => response.json()).then((responseJson) => {
            this.OrderHistory=responseJson.statusResult;
            console.log("get order History response", responseJson);
        }).catch((error) => {
            console.log("get order History error: "+ error);
        });
    }
    @action getCustomerFavourites(){
        alert('request')
        var headers = {"Accept": "application/json", "Content-Type": "application/json","token":this.authToken};
        console.log("authToken", this.authToken);
        fetch(PUBLIC_DOMAIN+"api/mobile/endusers/favorites", {
            method: "GET",
            headers: headers,
        }).then((response) => response.json()).then((responseJson) => {
            alert(JSON.stringify(responseJson))
            this.myFavourites=responseJson.statusResult;
            console.log("get favourites response", responseJson);
        }).catch((error) => {
            alert(JSON.stringify(error))
            console.log("get favourites error: "+ error);
        });
    }
   
    @action async registerForPushNotificationsAsync() {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();
        // POST the token to your backend server from where you can retrieve it to send push notifications.
        var headers = {"Accept": "application/json", "Content-Type": "application/json","token":this.authToken};
        let post_json={
            token:token,
            platform:Platform.OS
        };
        fetch(PUBLIC_DOMAIN+"Service to insert push token", {
            method: "POST",
            headers: headers,
            body:JSON.stringify(post_json)
        }).then((response) => response.json()).then((responseJson) => {
            console.log("Register Push Token response", responseJson);
        }).catch((error) => {
            console.log("Register Push Token error: "+ error);
        });
        AsyncStorage.setItem("device_registered",true);
    }
    @action changeValues(text,field){
        this[field]=text;
    }
}
