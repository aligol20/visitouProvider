import React, {Component} from 'react';
import {Container, Content, Header, Item,Right, Input, Icon, Button, Text, List, ListItem, View} from 'native-base';
import {StyleSheet,Alert, AsyncStorage,Image,TouchableWithoutFeedback, Linking,ActivityIndicator,Dimensions,TouchableHighlight,renderRow,ListView,TextInput} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ProgressDialog} from 'react-native-simple-dialogs';
import  moment from 'jalali-moment';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import AppFooter from './appFooter.js';
import RNExitApp from 'react-native-exit-app-no-history';

const styles = StyleSheet.create({
    buttonNo:{height:40,borderColor:'#95A5A6',borderWidth:2,borderRadius:7,width:'50%'
        ,alignItems:'center',justifyContent:'center',backgroundColor:'#ffd500'},
    buttonYes:{height:40,borderColor:'#1c4473',borderWidth:2,borderRadius:7
        ,alignItems:'center',justifyContent:'center',backgroundColor:'#ffd500'},
    textYes:{color:'#1c4473',fontFamily:'B Koodak'},
    textNo:{color:'#95A5A6',fontFamily:'B Koodak'}

});
export default class LoginFirst extends Component {
    constructor(props) {
        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            userName:'',
            pass:'',
            enableButton:false,
            isLoading:false,
        }
    }


    what(){
        Alert.alert(
            'در خدمتیم!',
            'جهت سفارش های خاص خود و یا ارتباط با ادمین کانال کوالافروت میتوانید با شماره زیر تماس حاصل فرمایید.۰۹۳۸۶۳۶۷۳۶۱',
            [

                {text: 'خب', onPress: () => null},//console.log('OK lklklkllkll Pressed')},
                {text: 'کانال ما در تلگرام', onPress: () => goTelegram()},
                {text: 'تماس با ما', onPress: () => callKoala()}

            ],
            {cancelable: true}
        )
    }
    getProducts(){

        if(this.state.userName && this.state.pass.length===7) {
            //console.log(this.state.pass.length,'lkkfldfll');


            let pp = {user: this.state.userName.toLowerCase(), pass: this.state.pass.toLowerCase()};
            console.log('lqaqswl;dw',pp);
            setTimeout(() => {

                this.setState({isLoading: false})

            }, 5000);
            // let fff = JSON.stringify(pp);
            //AsyncStorage.setItem('AmIlogged',JSON.stringify(pp));
            this.setState({isLoading: true});
            //console.log(JSON.stringify(pp), 'alalalalal45');
            let mm = {provider: this.state.userName.toLowerCase()};

            fetch('http://visitou.ir/api/readRequestMount.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mm)
            }).then((response) =>
                response.json()
                    .then((responseJson) => {
                        console.log(responseJson,'fff000qazx');
                        AsyncStorage.setItem('orderMount',JSON.stringify(responseJson.length));

                    }));
            fetch('http://visitou.ir/api/logProIN.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pp)
            }).then((response) =>
                response.json()
                    .then((responseJson) => {
                        let r = '';
                        //AsyncStorage.setItem('proList', JSON.stringify(responseJson));
                        console.log(responseJson, 'alalalalal4');
                        //console.log(responseJson[0], 'flkslkejfljfkwe');
                        for (let i = 0; i < responseJson.length; i++) {
                            r = r + responseJson[i].product_id + ',';
                        }
                        r = r + '0';
                        // Actions.feed();
                        //console.log(JSON.stringify(r), 'alalalalal467');
                        //console.log(responseJson[0],'llkkl');

                        if(responseJson[0]) {
                            //console.log(responseJson[0],'llkkl');
                            fetch('http://visitou.ir/api/getpropro.php', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(r)
                            }).then((response) =>
                                response.json()
                                    .then((responseJson) => {

                                            AsyncStorage.setItem('proList', JSON.stringify(responseJson));
                                            AsyncStorage.setItem('AmIlogged', JSON.stringify(pp));
                                            //console.log(responseJson.length, 'kljdklfjdkfjdklk');
                                            if (responseJson) {
                                                FCM.subscribeToTopic('/topics/'+this.state.userName.toLowerCase());
                                                let jj={user:this.state.userName};
                                                //console.log('/topics/'+this.state.userName.toLowerCase(),'cdsdsdsdsd');
                                                fetch('http://visitou.ir/api/subscribeloaction.php', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify(pp)
                                                }).then((response) =>
                                                    response.json()
                                                        .then((responseJson) => {
                                                            //console.log(responseJson,'cdsdsdsdsd2');

                                                            if(responseJson.length!==0){
                                                        this.setState({isLoading: false});
                                                        //console.log(responseJson[0].location.toLowerCase(),'cdsdsdsdsd2');
                                                        //console.log(responseJson[0],'cdsdsdsdsd4');
                                                        AsyncStorage.setItem('providerInfo',JSON.stringify(responseJson[0]));

                                                        FCM.subscribeToTopic('/topics/'+responseJson[0].location.toLowerCase());
                                                                Actions.feed();
                                                    }else {
                                                        this.setState({isLoading: false});

                                                        //console.log(responseJson,'cdsdsdsdsd3');

                                                    }


                                                        }));
                                            }

                                        }
                                    ))
                        }
                        else {
                            this.setState({isLoading: false});

                            alert('error')

                        }

                    })
            )
        }
        else {
            alert('ورودی های خود را بررسی کنید')
        }
        // response.json()
        //     .then((responseJson) => {
        //         //AsyncStorage.setItem('proList', JSON.stringify(responseJson));
        //         //console.log(responseJson,'alalalalal4');
        //         this.setState({isLoading:false})
        //        // Actions.feed();
        //
        //     });

    }
    entys(type,value){
        this.setState({enableButton:true});

        //console.log(type,value,'alalalalal55');

        switch (type) {
            case 'pass':
                this.setState({pass: value});
                break;
            case 'user':
                this.setState({userName: value});
                break;
        }



    }
    goTelegram() {
        //console.log('hihibyebye');
        Linking.canOpenURL('https://t.me/joinchat/AAAAAEU_VLjRP6dTO1W0Fg').then(supported => {
            if (supported) {
                Linking.openURL('https://t.me/joinchat/AAAAAEU_VLjRP6dTO1W0Fg');
                //console.log("Don't know how to open URI:fffdfdddfdf " + 'https://t.me/joinchat/AAAAAEU_VLjRP6dTO1W0Fg');

            } else {
                //console.log("Don't know how to open URI: " + 'https://t.me/joinchat/AAAAAEU_VLjRP6dTO1W0Fg');
            }
        });

    }
    callKoala() {
        Linking.openURL('https://t.me/visitouprovider');
    }
    salam(){
            Alert.alert(
                '',
                ' حمایت از کالای ایرانی'+'\n'+'تامین کنندگان کالا در هر گروه صنفی می توانند جهت معرفی و فروش محصولات خود به خانواده ویزیتو ملحق شوند.'+'\n'+'جهت عضویت به آیدی تلگرامی @visitouprovider مراجعه نمایید.',
                [

                    {text: 'خب', onPress: () => null},//console.log('OK lklklkllkll Pressed')},
                    {text: 'کانال ما در تلگرام', onPress: () => this.goTelegram()},
                    {text: 'ارتباط با ما', onPress: () => this.callKoala()}

                ],
                {cancelable: true}
            )

    }
    render() {
        function shest(uiui) {
            AsyncStorage.setItem('product', JSON.stringify(uiui));
            //console.log(uiui, 'qwerty');
            return (
                Actions.details()
            )
        }
        let selectedFormat = "jYYYY/jMM/jDD";
        // let moment = require('moment-jalaali');
        let rrr=moment().format(selectedFormat);
        let width = Dimensions.get('window').width; //full width

        return (
            <Container style={{backgroundColor:'#ffd500',width:'100%',justifyContent:'center',alignItems:'center'}}>

                <ProgressDialog
                    visible={this.state.isLoading}
                    title="ثبت اطلاعات شما ..."
                    message="لطفا صبر کنید"
                />
                <Text style={{color:'black',fontFamily:'B Koodak'}}>{rrr}</Text>
                <Image
                    style={{marginBottom:30,marginTop:width/8,width: (width / 3), height: (width / 3)}}

                    source={require('../imageSource/visitouprovider.png')}
                />
                <View style={{width:'70%',height:213,alignItems:'center',justifyContent:'center'}}>
                <TextInput
                    placeholder={'نام کاربری'}
                    onChangeText={(value)=>this.setState({userName: value})}
                    style={{height:50,marginBottom:20,width:'50%', borderWidth: 0,
                    borderRadius: 7, borderColor: 'white'
                    ,color:'#1c4473'
                }}
                    maxHeight={50}
                    placeholderTextColor='#1c4473'

                    textAlign={'right'}>
                </TextInput>
                <TextInput
                    placeholder={'رمز عبور'}
                    placeholderTextColor='#1c4473'


                    onChangeText={(value)=> this.setState({pass: value})}
                    style={{height:50,width:'50%', borderWidth: 0,
                        borderRadius: 7, borderColor: 'white'
                        ,color:'#1c4473',marginBottom:20
                    }}
                    maxHeight={50}
                    caretHidden={false}
                    secureTextEntry={true}

                    textAlign={'right'}>
                </TextInput>
                <View
                    >
                    <Button style={ styles.buttonYes}
                        onPress={()=> this.getProducts()}
                    >
                    <Text style={styles.textYes}>ورود</Text>
                    </Button>
                </View>

                </View>
                <TouchableWithoutFeedback onPress={()=>this.salam()}>
                    <View>
                        <Text style={{fontFamily:'B Koodak'}}>ویزیتو چیست؟</Text>

                    </View>
                </TouchableWithoutFeedback>



            </Container>
        );
    }
}

module.export = LoginFirst;