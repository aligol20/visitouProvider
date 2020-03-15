import React, {Component} from 'react';
import {Text, AsyncStorage, Dimensions, StyleSheet,Image} from 'react-native';
import {Content, View, Form, Button, Root, Item, Input, Label, Icon, Spinner} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {ProgressDialog} from 'react-native-simple-dialogs';

import Toast from 'react-native-simple-toast';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

const BOTTOM_COLORS = ['red', 'blue', 'green'];
let LENGTH = 0;
const INTERVAL = 50

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '0',
            dialogVisible: false,
            r1: 0,
            g1: 0,
            b1: 0,
            r2: 0,
            g2: 0,
            b2: 0,


        }
    }

    componentDidMount() {

        Toast.toastInstance = null;
        let y = 0;

        this.interval = setInterval(() => {
            this.loop()
        }, 100);

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    loop() {

        if (LENGTH < 2) {
            this.setState({r2: LENGTH});

            LENGTH++;
            this.setState({r1: LENGTH})
        } else {
            LENGTH = 0;
        }

    }

    check() {
        let value = this.state.number;

        if (value.startsWith('09') && value.length === 11) {
            this.setState({dialogVisible: true});
            setTimeout(() => {
                this.setState({dialogVisible: false})
            }, 20000);
            AsyncStorage.setItem('preNumber', JSON.stringify(value));
            //console.log(this.state.number, 'niniinniin');
            let pp = {phoneNumber: value};
            // fetch('http://koalafruit.ir/api/get_api_id.php')
            //     .then((response) => //console.log(response.json(),'deded'));
            // parse each response as json
            try {
                let test = fetch('http://visitou.ir/api/get_api_id.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pp)
                }).then((response) => this.responseCheck(response));
                //console.log(test, 'mahnazparivash133');


                //console.log(JSON.stringify(pp), '123444444');
            } catch (error) {
                Toast.show({
                    text: 'Wrong password!',
                    position: 'bottom',
                    buttonText: 'Okay'
                })
            }

        } else {
            Toast.show('شماره وارد شده را بررسی کنید');

        }

    }

    responseCheck(response) {
        let aan = JSON.parse(response._bodyInit).id;
        if (aan !== '1') {
            fetch( "https://api.kavenegar.com/v1/" +
                "74555654645A4E6D6C6F6A714E6D45306A5176394B673D3D/" +
                "verify/lookup.json?" +
                "receptor="+this.state.number+"&" +
                "token="+aan+"&" +
                "template=koalafruit").then((response) => this.goMain(JSON.parse(response._bodyInit).return.status));
            //console.log(aan, 'mahnazparivash133');


        }else {
            this.setState({dialogVisible: false});

            setTimeout(() => {
                Actions.register();
                alert('شما هنوز ثبت نام نکرده اید');

            }, 500);
        }

    }

    goMain(status) {
        //console.log(status, 'mahnazparivash13378');

        switch (status) {
            case 200:
                setTimeout(() => {

                    this.setState({dialogVisible: false});
                AsyncStorage.setItem('userPhoneNumber', JSON.stringify(this.state.number));
                    Actions.loginMain();
                }, 500);


                break
        }
    }

    render() {
        let width = Dimensions.get('window').width; //full width

        // //console.log(this.state.r1, 'mahnazmahnaz');
        return (
            <Content style={{backgroundColor: '#ffd500'}}>


                <ProgressDialog
                    visible={this.state.dialogVisible}
                    title="دریافت کد تایید"
                    message="لطفا صبر کنید..."
                />
                <View style={{
                    flex: 1, flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center', margin: 20
                }}>
                    <View style={{
                        width:  1.29*(width / 2), height: width / 2,alignItems:'center', marginBottom: 30, borderWidth: 0,
                        borderColor: 'white', borderRadius: 7
                    }}>
                        <Image
                            style={{marginBottom:30,marginTop:width/8,width: (width / 3), height: (width / 3)}}

                            source={require('../imageSource/visitouprovider.png')}
                        />
                    </View>
                    <View style={{width: width / 2}}>

                        <Input placeholder='09xxxxxxxxx'
                               maxLength={11}
                               style={{
                                   backgroundColor: '#ffd500', borderWidth: 2,
                                   borderRadius: 7, borderColor: 'white'
                                   ,color:'#1c4473'
                               }}
                               keyboardType={'phone-pad'}
                               textAlign={'center'}
                               onChangeText={(value => this.setState({number: value}))}/>
                    </View>
                    <View>
                        <Button
                            style={{
                                width: width / 3,
                                backgroundColor: '#ffd500',
                                margin: 10,
                                borderColor: '#1c4473',
                                justifyContent: 'center',
                                borderWidth: 2,
                                borderRadius: 7,
                                alignItems: 'center'
                            }} onPress={() => this.check()}>
                            <Text style={{color: '#1c4473', textAlign: 'center',fontFamily:'B Koodak'}}>دریافت کد تایید</Text>
                        </Button>
                    </View>
                    <View>

                        <Text style={{fontFamily:'B Koodak',
                            backgroundColor: '#ffd500',
                            justifyContent: 'center',
                            alignItems: 'center', width: width / 3, color: '#1c4473', textAlign: 'center', margin: 10
                        }} onPress={ Actions.register}>ثبت نام نکرده اید؟</Text>
                    </View>
                    <View>
                        <Text style={{textAlign:'center',color:'#1c4473',marginTop:20,fontFamily:'B Koodak'}}>شماره همراه خود را وارد کنید و تایید کنید،کد فعال سازی برای شما ارسال خواهد شد</Text>

                    </View>
                </View>

            </Content>
        );
    }
}
let styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});
module.export = Account;