import { observable, action } from "mobx";
import {AsyncStorage,AppState} from "react-native";
import {PUBLIC_DOMAIN} from "../../constants";
import UserStore from "./UserStore";
export default class TankStore{
    @observable TankerList=[{id:1,avgRating:5,maxTimeToServeExpress:"30mins",serviceProviderServiceObj:{pricePerItem:"850"},serviceObj:{itemDefinition:"10Ltrs"},serviceProviderObj:{serviceProviderIconPath:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png",serviceProvider:"Zugae Supplier"}},{id:1,avgRating:5,maxTimeToServeExpress:"30mins",serviceProviderServiceObj:{pricePerItem:"850"},serviceObj:{itemDefinition:"10Ltrs"},serviceProviderObj:{serviceProviderIconPath:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png",serviceProvider:"Zugae Supplier"}},{id:1,avgRating:5,maxTimeToServeExpress:"30mins",serviceProviderServiceObj:{pricePerItem:"850"},serviceObj:{itemDefinition:"10Ltrs"},serviceProviderObj:{serviceProviderIconPath:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png",serviceProvider:"Zugae Supplier"}},{id:1,avgRating:5,maxTimeToServeExpress:"30mins",serviceProviderServiceObj:{pricePerItem:"850"},serviceObj:{itemDefinition:"10Ltrs"},serviceProviderObj:{serviceProviderIconPath:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png",serviceProvider:"Zugae Supplier"}},{id:1,avgRating:5,maxTimeToServeExpress:"30mins",serviceProviderServiceObj:{pricePerItem:"850"},serviceObj:{itemDefinition:"10Ltrs"},serviceProviderObj:{serviceProviderIconPath:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png",serviceProvider:"Zugae Supplier"}},{id:1,avgRating:5,maxTimeToServeExpress:"30mins",serviceProviderServiceObj:{pricePerItem:"850"},serviceObj:{itemDefinition:"10Ltrs"},serviceProviderObj:{serviceProviderIconPath:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png",serviceProvider:"Zugae Supplier"}},{id:1,avgRating:5,maxTimeToServeExpress:"30mins",serviceProviderServiceObj:{pricePerItem:"850"},serviceObj:{itemDefinition:"10Ltrs"},serviceProviderObj:{serviceProviderIconPath:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png",serviceProvider:"Zugae Supplier"}},{id:1,avgRating:5,maxTimeToServeExpress:"30mins",serviceProviderServiceObj:{pricePerItem:"850"},serviceObj:{itemDefinition:"10Ltrs"},serviceProviderObj:{serviceProviderIconPath:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png",serviceProvider:"Zugae Supplier"}},{id:1,avgRating:5,maxTimeToServeExpress:"30mins",serviceProviderServiceObj:{pricePerItem:"850"},serviceObj:{itemDefinition:"10Ltrs"},serviceProviderObj:{serviceProviderIconPath:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png",serviceProvider:"Zugae Supplier"}},{id:1,avgRating:5,maxTimeToServeExpress:"30mins",serviceProviderServiceObj:{pricePerItem:"850"},serviceObj:{itemDefinition:"10Ltrs"},serviceProviderObj:{serviceProviderIconPath:"http://dev.oasiz.in:3030/assets/serviceProviders/SP01/sri-sai-ganesh-water-suppliers.png",serviceProvider:"Zugae Supplier"}}];
    @observable TopBrandList=[];
    @observable ServiceProviderInfo=[];
    @observable isLoading=true;
    @observable noData=false;
    @observable userList=[];
    @observable authToken="";
    @observable internet_connection=true;
    @action FetchTankerList(){
        this.internet_connection=true;
        fetch(PUBLIC_DOMAIN+"api/mobile/enduser/home/Tarnaka/Hyderabad/Telangana/", {
            method: "GET",
            headers: {},
        }).then((response) => response.json()).then((responseJson) => {
            this.TankerList=responseJson.statusResult;
            console.log("tankerList"+JSON.stringify(this.TankerList));
            this.isLoading=false;
        }).catch((error) => {
            this.internet_connection=false;
            this.isLoading=false;
            console.log("fetch error: "+ error);
        });
    }
    // @action FetchTankerList(getData){
    //     this.internet_connection=true;
    //     fetch(PUBLIC_DOMAIN+"api/mobile/enduser/home/"+getData.area+"/"+getData.city+"/"+getData.state, {
    //         method: "GET",
    //         headers: {},
    //     }).then((response) => response.json()).then((responseJson) => {
    //         alert(JSON.stringify(responseJson.statusResult));
    //         this.TankerList=responseJson.statusResult;
    //         console.log("tankerList"+JSON.stringify(this.TankerList));
    //         this.isLoading=false;
    //     }).catch((error) => {
    //         this.internet_connection=false;
    //         this.isLoading=false;
    //         console.log("fetch error: "+ error);
    //     });
    // }
    // @action.bound
    async  FetchTopBrands(){
        this.isLoading=true;
        console.log("UserStore.authToken");
        console.log("UserStore.authToken"+this.authToken);
        await AsyncStorage.getItem("authToken").then((value) => this.authToken=value);
        var headers = {"Accept": "application/json", "Content-Type": "application/json","token":this.authToken};
        fetch(PUBLIC_DOMAIN+"api/mobile/endusers/serviceproviders/services/topbrands/Hyderabad/Telangana/", {
            method: "GET",
            headers: headers
        }).then((response) => response.json()).then((responseJson) => {
            alert(JSON.stringify(responseJson.statusResult)+'=========');
            this.TopBrandList=responseJson.statusResult;
            console.log("TopBrandList"+JSON.stringify(responseJson));
            this.isLoading=false;
        }).catch((error) => {
            this.internet_connection=false;
            this.isLoading=false;
            console.log("fetch error: "+ error);
        });
    }
    @action.bound
    async  getServiceProvidersInfo(serviceProviderID){
        await AsyncStorage.getItem("authToken").then((value) => this.authToken=value);
        var headers = {"Accept": "application/json", "Content-Type": "application/json","token":this.authToken};
        fetch(PUBLIC_DOMAIN+"api/serviceproviders/services/servicesinfo/"+serviceProviderID, {
            method: "GET",
            headers: headers,
        }).then((response) => response.json()).then((responseJson) => {
            this.ServiceProviderInfo=responseJson.statusResult;
            console.log("Service providers info"+JSON.stringify(responseJson));
            this.isLoading=false;
        }).catch((error) => {
            this.internet_connection=false;
            this.isLoading=false;
            console.log("fetch error: "+ error);
        });
    }
    @action changeValues(text,field){
        this[field]=text;
    }
}
