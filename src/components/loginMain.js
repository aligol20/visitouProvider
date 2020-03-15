import React, {Component} from 'react';
import {Text, AsyncStorage,Dimensions,Alert,ScrollView,Image} from 'react-native';
import {Content, View,Spinner, Form,Root, Button, Item, Input, Header, Label, Icon} from 'native-base';
import {Actions} from 'react-native-router-flux';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Toast from 'react-native-simple-toast';

let delay=60;
export default class LoginMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verfiCode: '0',
            dialogVisible:false,
            visible:true,
            reSendTxt:10,

        }
    }
    componentDidMount() {


        this.interval = setInterval(() => {
            this.timer()
        }, 1000);

    }
    timer(){
        if(delay>0){
            delay--;
            this.setState({reSendTxt:delay})
        }else {
        this.setState({visible:false});
            this.deim()
        }
    }
    resendCode() {
        this.setState({dialogVisible: true});
        try {
            AsyncStorage.getItem('preNumber',(err,store)=>{
                let gooz={phoneNumber:JSON.parse(store)};

            let test = fetch('http://koalafruit.ir/api/get_api_id.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gooz)
            }).then((response) => this.sendSms(response,store));
            //console.log(test, '123444444');


            //console.log(JSON.stringify(gooz),'123444444');
            });
        } catch (error) {
            Toast.show({
                text: 'Wrong password!',
                position: 'bottom',
                buttonText: 'Okay'
            })
        }

    }
    sendSms(response,ph){
        let y=JSON.parse(ph);

        //console.log(y,'khkhkhkk');
        let aan = JSON.parse(response._bodyInit).id;
        if (aan !== 1) {
            fetch( "https://api.kavenegar.com/v1/" +
                    "74555654645A4E6D6C6F6A714E6D45306A5176394B673D3D/" +
                    "verify/lookup.json?" +
                    "receptor="+y+"&" +
                    "token="+aan+"&" +
                    "template=koalafruit").then((response) =>//console.log(response, 'mahnazparivash222'));
            //console.log(aan,ph, 'mahnazparivash222');
            setTimeout(() => {
                this.setState({dialogVisible: false,visible:true})
            }, 20000);

        }
        this.setState({dialogVisible: false})

    }
    goMain(status) {

        switch (status) {
            case 200:

                this.setState({dialogVisible: false});

                break
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    sendToServer() {
        if(this.state.verfiCode.length===5) {


            this.setState({dialogVisible: true});
            setTimeout(() => {
                this.setState({dialogVisible: false});

            }, 20000);
            AsyncStorage.getItem('userPhoneNumber', (err, store) => {
                //console.log(JSON.parse(store), 'mahnazparivash2');
                let koon = JSON.parse(store);
                let yuy = [{passCode: this.state.verfiCode, phoneNumber: '09185409343'}];
                // yuy.push({passCode: this.state.verfiCode,phoneNumber: store});
                try {
                    fetch('http://koalafruit.ir/api/login.php', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(yuy)

                    }).then((response) => this.finalProcesses(response));
                    // this.finalProcesses(JSON.parse(response._bodyInit))
                    //console.log(JSON.stringify(yuy), 'mahnazparivash4');
                }
                catch (error) {
                    //console.log(error,'mahnaz111');

                    Toast.show({
                        text: 'Wrong password!',
                        position: 'bottom',
                        buttonText: 'Okay'
                    })
                }

            })
        }else {
            Toast.show('کد وارد شده را بررسی کنید');

        }

    }
     deim(){
        if(this.state.visible){
            return(
                <Spinner visible={this.state.visible} color='white'/>
            )
        }else {
            return(
                <Text style={{color: '#1c4473', margin: 10,fontSize:13}}>ارسال مجدد کد</Text>

            )
        }
    }
    finalProcesses(rrr) {
        let userData=JSON.parse(rrr._bodyInit);
        //console.log(userData[0].phonenumber, 'mahnazparivash5');
        //console.log(userData[0].name, 'mahnazparivash6');
        //console.log('ckjjkjjk', 'mahnazparivash7');
        if (userData[0].phonenumber !== null) {
            let userInfo = [];
            userInfo.push({name: userData[0].name, family: userData[0].family, phone: userData[0].phonenumber})
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                this.setState({dialogVisible:false});

            setTimeout(() => {

                Alert.alert(
                    'پیغام',
                    'به ویزیتو خوش آمدید',

                    [

                        {text: 'خب', onPress: () => //console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )

            }, 500);
            Actions.feed();

        }else {

                Alert.alert(
                    'پیغام',
                    'کد وارد شده صحیح نیست',

                    [

                        {text: 'خب', onPress: () => //console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )


        }

    }
    render() {

        let width = Dimensions.get('window').width; //full width

        return (
            <ScrollView style={{backgroundColor: '#ffd500'}}>
                <Content style={{backgroundColor: '#ffd500'}}>
                <ProgressDialog
                    visible={this.state.dialogVisible}
                    title="در حال بررسی..."
                    message="لطفا صبر کنید..."
                />
                    <View style={{ flex:1,flexDirection:'column',justifyContent: 'center', alignItems: 'center', margin: 20}}>
                        <View style={{width:0,marginBottom:30,borderWidth:0,
                            borderColor:'white',borderRadius:7}}>
                        </View>
                        <Image
                            style={{marginTop:width/8,width: (width / 3), height: (width / 3)}}

                            source={require('../imageSource/visitouprovider.png')}
                        />
                        <View style={{width:width/3}}>

                        <Item style={{backgroundColor: 'white', borderRadius: 7,
                            borderColor:'white',borderWidth:3,margin:7}}>

                    <Input placeholder='xxxxx'
                           maxLength={5}
                           textAlign={'center'}
                           style={{fontSize:25,padding:10}}
                           keyboardType={'phone-pad'}
                           onChangeText={(value => this.setState({verfiCode: value}))}/>
                </Item>
                        </View>
                    <View>
                <Button style={{
                        width:width/3,
                        backgroundColor: '#ffd500',
                        margin:10,
                        alignItems:'center',
                        justifyContent:'center',
                        borderColor: '#1c4473', borderWidth: 2,borderRadius:7
                    }} onPress={() => this.sendToServer()}>
                        <Text style={{color: '#1c4473', margin: 10,fontSize:23,fontFamily:'B Koodak'}}>تایید</Text>
                    </Button>
                    </View>
                        <View>
                            <Button bordered disabled={this.state.visible} style={{
                                backgroundColor: '#ffd500',
                                margin:10,
                                width:width/3,
                                alignItems:'center',
                                justifyContent:'center',
                                borderColor: 'white', borderWidth: 2,borderRadius:7
                            }} onPress={() => this.resendCode()}>
                                {this.deim()}
                            </Button>
                        </View>
                        <View>

                            <Text style={{textAlign:'center',alignItems:'center',
                                justifyContent:'center',color: '#1c4473', margin: 10,fontSize:15,fontFamily:'B Koodak'}} onPress={() => Actions.account()}>شماره  را اشتباه نوشته اید؟</Text>
                    </View>
                        <View>
                            <Text style={{textAlign:'center',color:'#1c4473',marginTop:20,fontFamily:'B Koodak'}}>پیامکی حاوی کد پنج رقمی برای شما ارسال شد،آن را در کادر بالا وارد نمایید</Text>

                        </View>
                    </View>
            </Content>
            </ScrollView>
        );
    }
}

module.export = LoginMain;