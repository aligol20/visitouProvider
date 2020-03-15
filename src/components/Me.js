/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Container, Body, Center, Content,Item,Input, Right, Root, Icon, Button, Text} from 'native-base';
import {Modal,Linking,StyleSheet,TouchableWithoutFeedback,Picker,Share,ListView, View, Dimensions,Alert, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon4 from 'react-native-vector-icons/MaterialIcons'
import Icon5 from 'react-native-vector-icons/Feather'
import {ProgressDialog} from 'react-native-simple-dialogs';
import moment from 'jalali-moment';
import AppFooter from './appFooter.js';
import Icon7 from 'react-native-vector-icons/MaterialCommunityIcons'

let PickerItem = Picker.Item;
let choose = 0;
const BannerWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    button:{width:'100%',height:73,alignItems:'center',marginBottom:3,justifyContent:'flex-end',marginTop:3
    ,backgroundColor:'white'},
    text:{textAlign:'right',fontFamily:'B Koodak',color:'#1c375c'},
    laws:{fontFamily:'B Koodak',textAlign:'right'},
    njn:{fontFamily:'B Koodak',textAlign:'right',width:'80%'}


});

export default class Me extends Component {
    constructor(props, context) {
        super(props, context);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // this.getInfo();
        this.state = {
            visible:false,
            waiting: false,
            v:false,
            laws:false,
            rrr: '123',
            selectedCat: '',
            dataSource: dss.cloneWithRows([]),
            city: [],
            isLoading:false,
            item: '',
            asb: [],
            myCity:'',
            editDialog:false,
            info:[],
            buttonLabel:'',
            myLocation:'',
            address:'',
            nameChanged:'',
            familyChanged:'',
            addressChanged:'',
            messages:dss.cloneWithRows([]),
            stratddd:'',
            enddddd:''




        };
        let selectedFormat = "YYYY-MM-DD";

        AsyncStorage.getItem('providerInfo',(err,store)=>{
            //console.log(store,'1q1q');
            this.setState({myCity: JSON.parse(store),stratddd:moment(JSON.parse(store).start_date.substring(0,10),selectedFormat).format( "jDD-jMM-jYYYY"),enddddd:moment(JSON.parse(store).end_date.substring(0,10),selectedFormat).format( "jDD-jMM-jYYYY")});

            this.getInfo(JSON.parse(store).location,JSON.parse(store).provider_name)
            //console.log(JSON.parse(store).end_date.substring(0,10),'dlkjdklfd2');
            //console.log(JSON.parse(store).start_date.substring(0,10),'dlkjdklfd3');
            //console.log(JSON.parse(store).start_date.substring(0,10),'dlkjdklfd3');
        })


    }
    getInfo(loc,pro){
        let pp={loc:loc,pro:pro};
        fetch('http://visitou.ir/api/readMessages.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pp)
        }).then((response) =>
            response.json()
                .then((responseJson) => {
                //console.log(responseJson,'kakakakaka');
                    const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

                    this.setState({
                        isLoading: false,
                        dialogVisible: false,
                        messages: dss.cloneWithRows(responseJson.map(function (tt) {
                            return tt
                        })),
                    });

                }));


    }
    searchMe(value) {

        this.setState({isLoading:true});
        if (value === '') {
            value = 'nothing';

        }
        let r = this.state.city;
        //console.log(r, 'zxsawssdcsdc');

        let ghoo = r.filter(x => x.city_name.includes(value) );

        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.setState({
            list: ghoo,
            isLoading: false,
            dataSource: dss.cloneWithRows(ghoo.map(function (itit) {
                return (
                    itit
                )
            })),
        });

        ////console.log(ghoo,'mahnazparivash14');


    }
    getProductList() {
        AsyncStorage.getItem('cityList',(err,stores)=>{
            let r = JSON.parse(stores);
            const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            //console.log(r,'aqaqaqaq5');
            this.setState({
                city: r,
                visible:true,
                isLoading: false,
                dataSource: dss.cloneWithRows(r.map(function (itit) {
                    return (
                        itit
                    )
                })),
            });



        });
        //console.log(this.state.dataSource,'rtrtrtrt');

    }
    shest(uiui) {
        this.setState({waiting:true,visible:false});
        AsyncStorage.setItem('whereAmI',JSON.stringify(uiui));
        let pp = {city: uiui};
        this.setState({myCity:uiui});
        setTimeout(() => {
            this.setState({waiting:false})

        }, 10000);
        //console.log(pp,'nananana3');
        fetch('http://visitou.ir/api/readProducts_offer_new.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pp)
        }).then((response) => {
                //console.log(JSON.parse(response._bodyInit), 'nananana');
                AsyncStorage.setItem('offerList', response._bodyInit);

            }
        );

        fetch('http://visitou.ir/api/readProducts_new.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pp)
        }).then((response) => {
                AsyncStorage.setItem('allProducts', response._bodyInit);
                //console.log(response._bodyInit, 'nananana2');
                this.setState({waiting:false});

            }
        );




    }
    updateInfo(){
        let yt=[{
            family: this.state.familyChanged,
            name: this.state.nameChanged,
            phone: this.state.info[0].phone,
        }];
        AsyncStorage.setItem('userInfo',JSON.stringify(yt));
        let frf={address: this.state.addressChanged};
        AsyncStorage.setItem('AddHistory',JSON.stringify(frf));

            this.setState({editDialog:false});

    this.getInfo();
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


    share() {
        Alert.alert(
            '',
            'ویزیتو را به دوستان خود نیز معرفی کنید:',
            [
                {text: 'بستن', onPress: () => null},//console.log('OK lklklkllkll Pressed')},
                {text: 'ارسال اپ اندروید', onPress: () => Share.share({message:'https://cafebazaar.ir/app/ir.manaseh.manzoom/?l=fa',dialogTitle:'https://t.me/koalafruit'})},
                {text: 'ارسال اپ ios', onPress: () => Share.share({message:'https://cafebazaar.ir/app/ir.manaseh.manzoom/?l=fa',dialogTitle:'https://t.me/koalafruit'})},

            ],
            {cancelable: false}
        )
    }
    suggest() {
        Alert.alert(
            '',
            ' در کنارتان هستیم'+'\n'+'پذیرای پیشنهادات سازنده شما می باشیم.'+'\n',
            [

                {text: 'خب', onPress: () => null},//console.log('OK lklklkllkll Pressed')},
                {text: 'کانال ما در تلگرام', onPress: () => this.goTelegram()},
                {text: 'ارتباط با ما', onPress: () => this.callKoala()}

            ],
            {cancelable: true}
        )
    }
    groupWork() {
        Alert.alert(
            '',
            ' حمایت از کالای ایرانی'+'\n'+'تامین کنندگان کالا در هر گروه صنفی می توانند جهت معرفی و فروش محصولات خود به خانواده ویزیتو ملحق شوند.'+'\n'+'جهت عضویت به آیدی تلگرامی @visitouprovider مراجعه نمایید.',
            [

                {text: 'خب', onPress: () =>null}, //console.log('OK lklklkllkll Pressed')},
                {text: 'کانال ما در تلگرام', onPress: () => this.goTelegram()},
                {text: 'ارتباط با ما', onPress: () => this.callKoala()}

            ],
            {cancelable: true}
        )
    }
    guide() {
        Alert.alert(
            'در خدمتیم!',
            'جهت ارتباط با واحد پشتیبانی به آیدی تلگرامی @visitouprovider مراجعه نمایید.'+'پذیرای پیشنهادات سازنده شما می باشیم.'+''+' در کنارتان هستیم',
            [

                {text: 'خب', onPress: () =>null}, //console.log('OK lklklkllkll Pressed')},
                {text: 'کانال ما در تلگرام', onPress: () =>this.goTelegram()},
                {text: 'ارتباط با ما', onPress: () => this.callKoala()}

            ],
            {cancelable: true}
        )
    }
    moshtari() {
        Alert.alert(
            '',
           ' در کنارتان هستیم'+'\n'+'پذیرای پیشنهادات سازنده شما می باشیم.'+'\n'+'جهت ارتباط با واحد پشتیبانی به آیدی تلگرامی @visitouprovider مراجعه نمایید.',
            [

                {text: 'خب', onPress: () => null},//console.log('OK lklklkllkll Pressed')},
                {text: 'کانال ما در تلگرام', onPress: () => this.goTelegram()},
                {text: 'ارتباط با ما', onPress: () => this.callKoala()}

            ],
            {cancelable: true}
        )
    }
    signOut() {
        Alert.alert(
            'خروج از حساب ...',
            'آیا مطمین هستید؟',
            [
                {text: 'آره', onPress: () => {AsyncStorage.removeItem('AmIlogged');
        Actions.loginFirst()}},
                {text: 'نه', onPress: () =>null}, //console.log('Cancel Pressed'), style: 'cancel'},

            ],
            {cancelable: false}
        );

    }
    editting(){

        this.setState({editDialog:true});
    }
    getFavoriteIds(pop){
        const phone={userphone:pop};
        fetch('http://visitou.ir/api/favorite_ids.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(phone)
        }).then((response) => {//console.log(response,'pqpqpqpqp2')
            this.findFavorites(JSON.parse(response._bodyInit)) });
        // this.findFavorites(JSON.parse(response._bodyinit))

    }
    findFavorites(ids){
        //console.log(ids,'pqpqpqpqp');
        AsyncStorage.getItem('allProducts',(err,stores)=>{
            let r = JSON.parse(stores);
            let finded=[];
            for (let i=0;i<ids.length;i++){
                finded.push(r.filter(x => x.product_id === ids[i].product_id)[0]);
                //console.log(r.filter(x => x.product_id === ids[i].product_id)[0],'frfegehfghefhd')
                // //console.log(JSON.parse(finded),'frfegehfghefhd2')

            }
            const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            //console.log(finded,'frfegehfghefhd3');
            //console.log(r,'aqaqaqaq5');

            this.setState({
                list: finded,
                isLoading: false,
                favoriteList: dss.cloneWithRows(finded.map(function (itit) {
                    return (
                        itit
                    )
                })),
            })
        });
    }
    favL(){
        this.setState({v:true});
    }


    render() {
        function   ccccc() {
            AsyncStorage.removeItem('AmIlogged');
            Actions.loginFirst();
        }
        let selectedFormat = "YYYY-MM-DD";
        // let moment = require('moment-jalaali');
        let rrr=moment().format(selectedFormat);

        function shest(uiui) {
            AsyncStorage.setItem('product',JSON.stringify(uiui));
            //console.log(uiui.product_name,'qwerty');
            return(
                Actions.details({ title: uiui.product_name })

            )


        }
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
                <Container>
                    <ScrollView>
                <ProgressDialog
                    visible={this.state.waiting}

                    message="لطفا صبر کنید"
                />
                <Modal visible={this.state.visible}>

                             <View style={{backgroundColor:'#ffd500',flexDirection:'row',alignItems:'center',height:47}}>
                            <Text style={{fontFamily: 'B Koodak',color:'#1c375c',width:'100%',textAlign:'center'}}>لیست پیام ها</Text>
                             </View>

                            <ListView

                                style={{ backgroundColor: '#00000000'}}
                                dataSource={this.state.messages}
                                renderRow={(rowData, rowID, sectionID) =>
                                    <View
                                        style={{width:'100%',alignItems:'center',justifyContent:'flex-end',backgroundColor:'white',flexDirection:'row'}}>
                                        <Text style={{
                                            fontFamily: 'B Koodak',width:'80%',marginRight:13,
                                            color:'black',textAlign:'right',marginBottom:7,marginTop:7}}>{rowData.message_text}</Text>
                                        <Text style={{
                                            fontFamily: 'B Koodak',width:'20%',marginRight:7,fontSize:13,
                                            color:'grey',textAlign:'right',marginBottom:7,marginTop:7}}>{':'+moment(rowData.message_date,'YYYY-MM-DD').format('jYYYY/jMM/jDD')}</Text>

                                    </View>
                                }/>
                    <View style={{justifyContent:'center',flexDirection:'row'}}>

                        <Button
                            style={{backgroundColor:'#1c375c',borderRadius:0,borderColor:'#1c375c',borderWidth:2,width:'100%',justifyContent:'center'}}
                            onPress={()=>this.setState({visible:false})}>
                            <Text style={{color:'white'}}>بستن پنجره</Text>
                        </Button>
                    </View>

                </Modal>

                <View style={{height:37,width:'100%',backgroundColor:"white",marginBottom:0,justifyContent:'center'}}>
                <Text style={{marginRight:20,textAlign:'right',fontFamily:'B Koodak',fontSize:17,color:'#1c375c'}}>{'نام تامین کننده:'+' '+this.state.myCity.persian_name}</Text>
                </View>
                <View style={{height:37,width:'100%',backgroundColor:"white",marginBottom:0,justifyContent:'center'}}>
                <Text style={{marginRight:20,textAlign:'right',fontFamily:'B Koodak',fontSize:17,color:'#1c375c'}}>{'منطقه فعالیت:'+' '+this.state.myCity.location}</Text>
                </View>
                <View style={{height:37,width:'100%',backgroundColor:"white",marginBottom:0,justifyContent:'center'}}>
                <Text style={{marginRight:20,textAlign:'right',fontFamily:'B Koodak',fontSize:17,color:'#1c375c'}}>{'تلفن:'+' '+this.state.myCity.provider_phone}</Text>
                </View>
                <View style={{height:37,width:'100%',backgroundColor:"white",marginBottom:0,justifyContent:'center'}}>
                <Text style={{marginRight:20,textAlign:'right',fontFamily:'B Koodak',fontSize:17,color:'#1c375c'}}>{'تاریخ شروع قرارداد:'+' '+ this.state.stratddd}</Text>
                </View>
                <View style={{height:1}}/>
                <View style={{height:27,width:'100%',backgroundColor:"white",marginBottom:3,justifyContent:'center'}}>
                <Text style={{marginRight:20,textAlign:'right',fontFamily:'B Koodak',fontSize:17,color:'#1c375c'}}>{'تاریخ پایان قرارداد:'+' '+this.state.enddddd}</Text>
                </View>
                        <View style={{height:47,width:'100%',backgroundColor:"white",marginBottom:3,justifyContent:'center'}}>

                        <Button style={styles.button}
                onPress={()=>this.setState({visible:true})}>
                    <Text style={styles.text}>پیام ها</Text>
                    <Icon5 style={{marginRight: 5}}
                           name='mail'
                           color="#fdb913" size={29}
                    />
                </Button>
                        </View>
                        <View style={{height:47,width:'100%',backgroundColor:"white",marginBottom:3,justifyContent:'center'}}>

                        <Button style={styles.button}
                        onPress={()=>this.share()}>
                    < Text style={styles.text}>معرفی به دوستان</Text>
                    <Icon5 style={{marginRight: 5}}
                           name='share-2'
                           color="#19B5FE" size={29}
                    />
                </Button>
                        </View>
                        <View style={{height:47,width:'100%',backgroundColor:"white",marginBottom:3,justifyContent:'center'}}>

                        <Button style={styles.button}
                        onPress={()=>this.suggest()}>
                    <Text style={styles.text}>نظرات و پیشنهادات</Text>
                    <Icon4 style={{marginRight: 5}}
                           name='chat'
                           color="#1c375c" size={29}
                    />
                </Button>
                        </View>
                        <View style={{height:47,width:'100%',backgroundColor:"white",marginBottom:3,justifyContent:'center'}}>

                        <Button style={styles.button}
                        onPress={()=>this.groupWork()}>
                        < Text style={styles.text}>همکاری با ما</Text>
                        <Icon4 style={{marginRight: 5}}
                               name='group-add'
                               color="#00B16A" size={29}
                        />
                    </Button>
                        </View>
                        <View style={{height:47,width:'100%',backgroundColor:"white",marginBottom:3,justifyContent:'center'}}>

                            <Button style={styles.button}
                                    onPress={()=>this.moshtari()}>
                                < Text style={styles.text}>خدمات مشتریان</Text>
                                <Icon4 style={{marginRight: 5}}
                                       name='contact-mail'
                                       color="purple" size={29}
                                />
                            </Button>

                        </View>
                        <View style={{height:47,width:'100%',backgroundColor:"white",marginBottom:3,justifyContent:'center'}}>

                        <Button style={styles.button}
                        onPress={()=>this.setState({laws:true})}>
                        < Text style={styles.text}>راهنما</Text>
                        <Icon4 style={{marginRight: 5}}
                               name='receipt'
                               color="#F39C12" size={29}
                        />
                    </Button>

                        </View>
                        <View style={{height:47,width:'100%',backgroundColor:"white",marginBottom:3,justifyContent:'center'}}>

                            <Button style={styles.button}
                            onPress={()=>this.signOut()}>
                                < Text style={styles.text}>خروج از حساب</Text>
                                <Icon4 style={{marginRight: 5}}
                                       name='exit-to-app'
                                       color="red" size={29}
                                />
                            </Button>

                        </View>
                    </ScrollView>
                    <Modal
                        visible={this.state.laws}>
                        <ScrollView>

                        <View style={{flexDirection:'column',margin:7,borderRadius:5,borderWidth:2,borderColor:'#1c375c',padding:3}}>

                            <Text style={styles.laws}>
                                پس از ثبت نام و اختصاص حساب کاربری، سفارش مشتریانی که در محدوده فعالیت شما قرار دارند و درخواست محصولات شما را داشته باشند در قسمت درخواست برای شما ارسال می شود. پس از بررسی موجودی و قیمت محصول نسبت به تایید فاکتور و تحویل فاکتور اقدام نمایید.                            </Text>
                            <Text style={styles.laws}>
                                فاکتورهای تایید شده به قسمت سوابق منتقل می شوند. پس از تحویل فاکتور نسبت به تغییر وضعیت سفارش اقدام نمایید.
                            </Text>
                            <View style={{flexDirection:'row',marginRight:2,alignItems:'center',justifyContent:'flex-end'}}>
                                <Text style={styles.njn}>: محصولاتی که منتظر تایید باشند با این علامت مشخص می شود.</Text>
                                <Icon7 style={{marginLeft: 2}}
                                       name='clock'
                                       color="blue" size={29}
                                />

                            </View>
                            <View style={{flexDirection:'row',marginRight:2,alignItems:'center',justifyContent:'flex-end'}}>
                                <Text style={styles.njn}>: محصولاتی که تایید شده باشند با این علامت مشخص می شود.</Text>
                                <Icon7 style={{marginLeft: 2}}
                                       name='truck'
                                       color="#22A7F0" size={29}
                                />

                            </View>
                            <View style={{flexDirection:'row',marginRight:2,alignItems:'center',justifyContent:'flex-end'}}>
                                <Text style={styles.njn}>: محصولاتی که تایید نشده باشند با این علامت مشخص می شود.</Text>
                                <Icon7 style={{marginLeft: 2}}
                                       name='close'
                                       color="red" size={29}
                                />

                            </View>
                            <View style={{flexDirection:'row',marginRight:2,alignItems:'center',justifyContent:'flex-end'}}>
                                <Text style={styles.njn}>: محصولاتی که تحویل شده باشند با این علامت مشخص می شود.</Text>
                                <Icon7 style={{marginLeft: 2}}
                                       name='check'
                                       color="green" size={29}
                                />

                            </View>

                            <Text style={styles.laws}>
                                کاربر گرامی خواهشمند است موارد زیر را جهت استفاده بهینه از خدمات و برنامه های کاربردی ویزیتو مطالعه فرمایید:
                            </Text>
                            <Text style={styles.laws}>
                                *تامین کنندگان می پذیرند که ویزیتو شرکت پخش محصولات نیست بلکه تنها خدمات نرم افزاری است که ارتباط بین کاربر سفارش دهنده(مشتری) و شرکت پخش(تامین کننده) را به منظور تسهیل در روند سفارش محصولات فراهم می نماید.
                            </Text>
                            <Text style={styles.laws}>
                                *ویزیتو 7 روز هفته به صورت شبانه روز امکان خدمات رسانی به مشتریان را دارد و کلیه سفارش های ثبت شده در صف پردازش قرار می گیرد و پس از تایید با توجه به برنامه پخش شرکت ها در روزهای کاری تحویل می گردد.
                            </Text>
                            <Text style={styles.laws}>
                                * کاربران با ثبت نام در سامانه و هربار استفاده از خدمات ویزیتو می پذیرند که قوانین و مقررات جاری شرکت را بصورت کامل مطالعه نموده و با اطلاع کامل از مفاد مندرج، آن را می پذیرند. این مقررات ممکن است در طول زمان تغییر یابد، مطالعه قوانین و اطلاع از بروزرسانی آن بعهده کاربران می باشد.                            </Text>
                            <Text style={styles.laws}>
                                *مسئولیت حفظ امنیت حساب کاربری به عهده کاربر می باشد و در صورت مفقود شدن یا سرقت اطلاعات حساب و یا تلفن همراه، کاربر موظف است در اولین فرصت موضوع را به اطلاع واحد پشتیبانی ویزیتو برساند. بدیهی است مسئولیت فعالیتها از طریق حساب کاربری به عهده کاربر می باشد.                            </Text>
                            <Text style={styles.laws}>
                                *تامین کننده موظف است قبل از تایید فاکتور نسبت به کنترل قیمت محصول، تعداد موجودی محصول و تعداد سفارش محصولات اقدام نماید.                            </Text>
                            <Text style={styles.laws}>
                                *تامین کننده موظف به بروزرسانی محصولات موجود در سامانه می باشد و در صورت عدم موجودی محصول در اسرع وقت نسبت به تغییر وضعیت محصول به ناموجود اقدام نماید.                            </Text>
                            <Text style={styles.laws}>
                                *تامین کننده موظف است سفارشات خود را روزانه بررسی نموده و نسبت به تایید اقلام موجود اقدام نماید.                            </Text>
                            <Text style={styles.laws}>
                                *تامین کننده موظف است سفارشات را بموقع و مطابق با لیست سفارش نهایی تایید شده مشتری تحویل نماید.                            </Text>
                            <Text style={styles.laws}>
                                *با توجه به تعداد کاربران و عدم امکان بررسی صحت اطلاعات آنها توسط ویزیتو، اعتبار سنجی مشتریان و تسویه حساب فاکتورها به عهده تامین کننده می باشد.                             </Text>
                            <Text style={styles.laws}>
                                *مسئولیت مربوط به کیفیت، قیمت محصولات، بسته بندی، شرایط،حمل، تحویل کالا و تسویه فاکتور بر عهده تامین کننده است و مسئولیتی متوجه ویزیتو نخواهد بود.                            </Text>
                            <Text style={styles.laws}>
                                *از آنجا که قیمت های ارائه شده در ویزیتو دقیقا مطابق با لیست قیمتهای ارسالی از تامین کنندگان می باشد، تامین کننده موظف است در صورت تغییر قیمت، تخفیف و شرایط ویژه فروش محصولات، تغییرات را در اسرع وقت به واحد پشتیبانی ویزیتو اطلاع دهد و هرگونه مغایرت در این خصوص پس از اخطار از طرف ویزیتو قابل پیگیری خواهد بود.                            </Text>
                            <Text style={styles.laws}>
                                *تامین کننده موظف است در صورت تغییر مشخصات یا بسته بندی محصولات یا افزوده شدن محصولات جدید به مجموعه در اسرع وقت نسبت به اطلاع رسانی واحد پشتیبانی ویزیتو اقدام نماید.                            </Text>
                            <Text style={styles.laws}>
                                *تامین کننده موظف است هرگونه مشکل یا خطا در سامانه را در اسرع وقت به واحد پشتیبانی ویزیتو اطلاع دهد.                            </Text>
                            <Text style={styles.laws}>
                                جهت حمایت از ما نظرات، پیشنهادات و انتقادات خود را برای ما ارسال نمایید.
                                امید داریم تسهیل در فرآیند خرید باعث معرفی ویزیتو به دوستان تان و پویایی هرچه بیشتر این مجموعه باشد.                            </Text>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableWithoutFeedback
                            onPress={()=>this.setState({laws:false})}>
                                <View style={{width:40,height:40,backgroundColor:'#1c375c',borderRadius:3,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{padding:7,color:'white',fontFamily:'B Koodak'}}>خب</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            </View>
                        </View>
                        </ScrollView>

                    </Modal>
                    <AppFooter/>
                </Container>
        )

    }
}
    module.export = Me;
