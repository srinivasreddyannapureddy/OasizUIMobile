import { observable, action } from "mobx";
import {AsyncStorage} from "react-native";
export default class ThemeStore{
    @observable headerBackgroundColor="#2196F3";
    @observable lightHeaderBackgroundColor="#e3f2fd";
    @observable statusBarBackgroundColor="#2286c3";
    @observable contentBackgroundColor="";
    @observable headerTextColor="#fff";
    @observable buttonColors="#4A148C";
    @observable buttonTextColor="#fff";
    @observable textColor="#000";
    @observable purple_theme=false;
    @observable red_theme=false;
    @observable pink_theme=false;
    @observable indigo_theme=false;
    @observable purple_theme=false;
    @observable teal_theme=true;
    @observable green_theme=false;
    @observable orange_theme=false;
    @observable lime_theme=false;
    @observable grey_theme=false;
    @observable blue_theme=true;
    @action PurpleTheme(){
        AsyncStorage.setItem("selectedTheme", "purple");
        this.headerBackgroundColor="#4A148C";
        this.lightHeaderBackgroundColor="#f3e5f5";
        this.statusBarBackgroundColor="#0D47A1";
        this.contentBackgroundColor="";
        this.headerTextColor="#fff";
        this.buttonColors="#009688";
        this.buttonTextColor="#fff";
        this.textColor="#000";
        this.purple_theme=true;
        this.red_theme=false;
        this.pink_theme=false;
        this.indigo_theme=false;
        this.blue_theme=false;
        this.teal_theme=false;
        this.green_theme=false;
        this.orange_theme=false;
        this.lime_theme=false;
    }
    @action RedTheme(){
        AsyncStorage.setItem("selectedTheme", "red");
        this.headerBackgroundColor="#F44336";
        this.lightHeaderBackgroundColor="#ffebee";
        this.statusBarBackgroundColor="#B71C1C";
        this.contentBackgroundColor="";
        this.headerTextColor="#fff";
        this.buttonColors="#F44336";
        this.buttonTextColor="#fff";
        this.textColor="#000";
        this.purple_theme=false;
        this.red_theme=true;
        this.pink_theme=false;
        this.indigo_theme=false;
        this.blue_theme=false;
        this.teal_theme=false;
        this.green_theme=false;
        this.orange_theme=false;
        this.lime_theme=false;
    }
    @action PinkTheme(){
        AsyncStorage.setItem("selectedTheme", "pink");
        this.headerBackgroundColor="#E91E63";
        this.lightHeaderBackgroundColor="#fce4ec";
        this.statusBarBackgroundColor="#880E4F";
        this.contentBackgroundColor="";
        this.headerTextColor="#fff";
        this.buttonColors="#E91E63";
        this.buttonTextColor="#fff";
        this.textColor="#000";
        this.purple_theme=false;
        this.red_theme=false;
        this.pink_theme=true;
        this.indigo_theme=false;
        this.blue_theme=false;
        this.teal_theme=false;
        this.green_theme=false;
        this.orange_theme=false;
        this.lime_theme=false;
    }
    @action IndigoTheme(){
        AsyncStorage.setItem("selectedTheme", "indigo");
        this.headerBackgroundColor="#3F51B5";
        this.lightHeaderBackgroundColor="#e8eaf6";
        this.statusBarBackgroundColor="#1A237E";
        this.contentBackgroundColor="";
        this.headerTextColor="#fff";
        this.buttonColors="#3F51B5";
        this.buttonTextColor="#fff";
        this.textColor="#000";
        this.purple_theme=false;
        this.red_theme=false;
        this.pink_theme=false;
        this.indigo_theme=true;
        this.blue_theme=false;
        this.teal_theme=false;
        this.green_theme=false;
        this.orange_theme=false;
        this.lime_theme=false;
    }
    @action BlueTheme(){
        AsyncStorage.setItem("selectedTheme", "blue");
        this.headerBackgroundColor="#2196F3";
        this.lightHeaderBackgroundColor="#e3f2fd";
        this.statusBarBackgroundColor="#2286c3";
        this.contentBackgroundColor="";
        this.headerTextColor="#fff";
        this.buttonColors="#2196F3";
        this.buttonTextColor="#fff";
        this.textColor="#000";
        this.purple_theme=false;
        this.red_theme=false;
        this.pink_theme=false;
        this.indigo_theme=false;
        this.blue_theme=true;
        this.teal_theme=false;
        this.green_theme=false;
        this.orange_theme=false;
        this.lime_theme=false;
    }
    @action TealTheme(){
        AsyncStorage.setItem("selectedTheme", "teal");
        this.headerBackgroundColor="#009688";
        this.lightHeaderBackgroundColor="#e0f2f1";
        this.statusBarBackgroundColor="#004D40";
        this.contentBackgroundColor="";
        this.headerTextColor="#fff";
        this.buttonColors="#009688";
        this.buttonTextColor="#fff";
        this.textColor="#000";
        this.purple_theme=false;
        this.red_theme=false;
        this.pink_theme=false;
        this.indigo_theme=false;
        this.blue_theme=false;
        this.teal_theme=true;
        this.green_theme=false;
        this.orange_theme=false;
        this.lime_theme=false;
    }
    @action GreenTheme(){
        AsyncStorage.setItem("selectedTheme", "green");
        this.headerBackgroundColor="#4CAF50";
        this.lightHeaderBackgroundColor="#e8f5e9";
        this.statusBarBackgroundColor="#1B5E20";
        this.contentBackgroundColor="";
        this.headerTextColor="#fff";
        this.buttonColors="#4CAF50";
        this.buttonTextColor="#fff";
        this.textColor="#000";
        this.purple_theme=false;
        this.red_theme=false;
        this.pink_theme=false;
        this.indigo_theme=false;
        this.blue_theme=false;
        this.teal_theme=false;
        this.green_theme=true;
        this.orange_theme=false;
        this.lime_theme=false;
    }
    @action OrangeTheme(){
        AsyncStorage.setItem("selectedTheme", "orange");
        this.headerBackgroundColor="#FF5722";
        this.lightHeaderBackgroundColor="#fff3e0";
        this.statusBarBackgroundColor="#BF360C";
        this.contentBackgroundColor="";
        this.headerTextColor="#fff";
        this.buttonColors="#FF5722";
        this.buttonTextColor="#fff";
        this.textColor="#000";
        this.purple_theme=false;
        this.red_theme=false;
        this.pink_theme=false;
        this.indigo_theme=false;
        this.blue_theme=false;
        this.teal_theme=false;
        this.green_theme=false;
        this.orange_theme=true;
        this.lime_theme=false;
    }
    @action LimeTheme(){
        AsyncStorage.setItem("selectedTheme", "lime");
        this.headerBackgroundColor="#CDDC39";
        this.lightHeaderBackgroundColor="#f9fbe7";
        this.statusBarBackgroundColor="#827717";
        this.contentBackgroundColor="";
        this.headerTextColor="#000";
        this.buttonColors="#CDDC39";
        this.buttonTextColor="#000";
        this.textColor="#fff";
        this.purple_theme=false;
        this.red_theme=false;
        this.pink_theme=false;
        this.indigo_theme=false;
        this.blue_theme=false;
        this.teal_theme=false;
        this.green_theme=false;
        this.orange_theme=false;
        this.lime_theme=true;
    }
    @action GreyTheme(){
        AsyncStorage.setItem("selectedTheme", "grey");
        this.headerBackgroundColor="#e0e0e0";
        this.lightHeaderBackgroundColor="#fafafa";
        this.statusBarBackgroundColor="#bdbdbd";
        this.contentBackgroundColor="";
        this.headerTextColor="#000";
        this.buttonColors="#e0e0e0";
        this.buttonTextColor="#000";
        this.textColor="#000";
        this.purple_theme=false;
        this.red_theme=false;
        this.pink_theme=false;
        this.indigo_theme=false;
        this.blue_theme=false;
        this.teal_theme=false;
        this.green_theme=false;
        this.orange_theme=false;
        this.lime_theme=false;
        this.grey_theme=true;
    }
}
