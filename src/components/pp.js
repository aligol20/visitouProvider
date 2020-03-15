import React from 'react';
import { StyleSheet,View,Text,Image,AsyncStorage} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Actions} from 'react-native-router-flux';
import {Container,Button} from 'native-base';
import Icon5 from 'react-native-vector-icons/Feather'


export default class Pp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

        // this.fetchJsons();

    }





    fetchJsons() {

        //console.log('ridim...');
        fetchURLs();
        async function fetchURLs() {
            try {
                // Promise.all() lets us coalesce multiple promises into a single super-promise
                let data = await Promise.all([
                    /* Alternatively store each in an array */
                    // var [x, y, z] = await Promise.all([
                    // parse results as json; fetch data response has several reader methods available:
                    //.arrayBuffer()
                    //.blob()
                    //.formData()
                    //.json()
                    //.text()
                    fetch('http://koalafruit.com/api/readProducts_offer.php').then((response) => response.json()),
                    fetch('http://koalafruit.com/api/readProducts.php').then((response) => response.json()),// parse each response as json
                    fetch('http://koalafruit.com/api/readCategory.php').then((response) => response.json()),
                    fetch('http://koalafruit.com/api/readLocals.php').then((response) => response.json()),
                    fetch('http://koalafruit.com/api/read_delivery_time.php').then((response) => response.json()),
                    fetch('http://koalafruit.com/api/read_delivery_text.php').then((response) => response.json()),
                    fetch('http://koalafruit.com/api/get_dialogs.php').then((response) => response.json()),
                    fetch('http://koalafruit.com/api/checkupdate.php').then((response) => response.json()),
                    fetch('http://koalafruit.com/api/read_delivery_costs.php').then((response) => response.json()),
                    fetch('http://koalafruit.com/api/get_dialogs.php').then((response) => response.json()),


                ]);

                //console.log(data[1], 'kooni0');
                AsyncStorage.setItem('offerList', JSON.stringify(data[0]));
                AsyncStorage.setItem('allProducts', JSON.stringify(data[1]));
                AsyncStorage.setItem('categoryList', JSON.stringify(data[2]));
                AsyncStorage.setItem('localsList', JSON.stringify(data[3]));
                AsyncStorage.setItem('deliveryTimes', JSON.stringify(data[4]));
                AsyncStorage.setItem('deliveryText', JSON.stringify(data[5]));
                AsyncStorage.setItem('dialogs', JSON.stringify(data[6]));
                AsyncStorage.setItem('checkUpdates', JSON.stringify(data[7]));
                AsyncStorage.setItem('deliveryCost', JSON.stringify(data[8]));
                //console.log(data[9].filter(x => x.dialog_type === 'randomdialog')
                    , 'kokoko');


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


            } catch (error) {


                //console.log(error, 'akhond dozd');

            }

        }
    }

    render() {

            AsyncStorage.getItem('introSeen',(err,store)=>{
            if(store){
                this.setState({first:2});
                //console.log(store,'kjkjkjkk')

            }else {
                this.setState({first:3});
                //console.log(store,'kjkjkjkk2')

            }
        });
            switch (this.state.first){
                case 3:

                    Actions.intro();

                    break;
                case 2:

                    Actions.feed();
                break;

            }

        return (
            <Container>
                  {this.state.first}


            </Container>
        );


    }
}
module.exports = Pp;