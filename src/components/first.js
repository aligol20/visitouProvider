import React, {Component} from 'react';
import {Container, Content, Header, Item,Right, Input, Icon, Button, Text, List, ListItem, View} from 'native-base';
import {StyleSheet, AsyncStorage, ActivityIndicator,Dimensions,Image,renderRow,ListView} from 'react-native';
import Icon3 from 'react-native-vector-icons/Ionicons'
import {Actions} from 'react-native-router-flux';
import RNExitApp from 'react-native-exit-app';


export default class First extends Component {
    constructor(props) {
        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


    }
    componentDidMount() {
       
        // this.justForFun();
        // this.title();


        // Optional: Check if the device is blocking background tasks or not
        this.fetchJsons();

        // BackgroundTask.schedule({
        //     period: 1800, // Aim to run every 30 mins - more conservative on battery
        // });
        // this.setTimeout(this.fetchJsons, 500)
        // this.checkStatus()

        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
    }
    fetchJsons(){


        //console.log('ridim...');
        fetchURLs();
        async function fetchURLs() {
            try {
                // Promise.all() lets us coalesce multiple promises into a single super-promise
                var data = await Promise.all([
                    /* Alternatively store each in an array */
                    // var [x, y, z] = await Promise.all([
                    // parse results as json; fetch data response has several reader methods available:
                    //.arrayBuffer()
                    //.blob()
                    //.formData()
                    //.json()
                    //.text()
                    fetch('http://koalafruit.com/api/readProducts_offer.php').then((response) => response.json()),
                    fetch('http://koalafruit.ir/api/readProducts.php').then((response) => response.json()),// parse each response as json
                    fetch('http://koalafruit.ir/api/readCategory.php').then((response) => response.json()),
                    fetch('http://koalafruit.ir/api/readLocals.php').then((response) => response.json()),
                    fetch('http://koalafruit.ir/api/read_delivery_time.php').then((response) => response.json()),
                    fetch('http://koalafruit.ir/api/read_delivery_text.php').then((response) => response.json()),
                    fetch('http://koalafruit.ir/api/get_dialogs.php').then((response) => response.json()),
                    fetch('http://koalafruit.ir/api/checkupdate.php').then((response) => response.json()),
                    fetch('http://koalafruit.com/api/read_delivery_costs.php').then((response) => response.json()),
                    fetch('http://koalafruit.com/api/get_dialogs.php').then((response) => response.json()),


                ]);

                //console.log(data[1],'kooni0');
                AsyncStorage.setItem('offerList',JSON.stringify(data[0]));
                AsyncStorage.setItem('allProducts',JSON.stringify(data[1]));
                AsyncStorage.setItem('categoryList',JSON.stringify(data[2]));
                AsyncStorage.setItem('localsList',JSON.stringify(data[3]));
                AsyncStorage.setItem('deliveryTimes',JSON.stringify(data[4]));
                AsyncStorage.setItem('deliveryText',JSON.stringify(data[5]));
                AsyncStorage.setItem('dialogs',JSON.stringify(data[6]));
                AsyncStorage.setItem('checkUpdates',JSON.stringify(data[7]));
                AsyncStorage.setItem('deliveryCost',JSON.stringify(data[8]));
                //console.log(data[9].filter(x => x.dialog_type==='randomdialog')
                //     ,'kokoko');


                // for (var i of data) {
                //     //console.log(`RESPONSE ITEM \n`);
                //     for (var obj of i) {
                //         //console.log(obj);
                //         //console.log(i,'kooni');
                //         //console.log(obj,'kooni');
                //         //logger utility method, logs output to screen
                //         ////console.log(obj);
                //     }
                // }
                AsyncStorage.getItem('offerList', (err, store) => {
                        if(store){
                        Actions.feed();
                        }

                    }
                );
            } catch (error) {

                // RNExitApp.exitApp();

                //console.log(error,'akhond dozd');

            }
        }
    }

    render() {
        let height = Dimensions.get('window').height; //full width

        return (
            <Content style={{backgroundColor:'white'}}>
                <View style={{height:height,alignItems:'center',justifyContent:'center'}}>
                    <Icon3 color="gray"
                           name="ios-cart" size={100}/>
                    <Text>سبد شما خالی است</Text>

                </View>



            </Content>
        );
    }
}

module.export = First;