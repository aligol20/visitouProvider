import React, {Component} from 'react';
import {
    ListView,StyleSheet, AsyncStorage, TextInput, Dimensions, Image, ActivityIndicator, ScrollView, Alert
} from 'react-native';
import {
    Container, Button, List, ListItem,
    Text, Thumbnail, View, Body,
    Content, Footer, FooterTab,
    Badge, Radio, Right, Left, Root, Center, Item
} from 'native-base';
import Picker from 'react-native-picker';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import {Actions} from 'react-native-router-flux';
import {ProgressDialog} from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
const styles = StyleSheet.create({
Active: {height:30,backgroundColor:'#00B16A',borderRadius:0,width:'100%'},
deActive: {height:30,backgroundColor:'red',borderRadius:0,width:'100%'}
});
let moz = [];

export default class Final extends Component {
    constructor(props) {
        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {

            dataSource: dss.cloneWithRows([]),
            headerSource: dss.cloneWithRowsAndSections([]),
            addressM: [],
            localM: '',
            deliveryTimeM: '',
            orderDescM: 'a',
            orderPhoneM: '0',
            shokhm: [],
            times: [],
            timeApp: [],
            value: 0,
            text: '',
            myTime: false,
            todayEvening: false,
            tomorrowMorning: false,
            tomorrowEvening: false,
            isLoading: true,
            dialogVisible: false,
            deliveryCost: 0,
            normalDelivery: 0,
            vipDelivery: 0,
            totalCost: 0,
            indexRadio: -1,
            availableToSet: true,
            timeSelecting: [],
            myTimeTxt: 'زمان من',
            description: '',
            gooz:[],
            choos:[],
            dataraw:[],
            catchCross:0,

        };
        //console.log(this.state.list, 'asdfghjk');


    }

    componentDidMount() {
        // this.listOrder();
        // this.timesList();
        this.listOrder();
        this.setOrder();
        // this.calculateCosts();

        Toast.toastInstance = null;


    }

    timesList() {
        AsyncStorage.getItem('deliveryCost', (err, store) => {
            let cost = JSON.parse(store);
            //console.log(parseInt(cost[0].delivery_price), 'mahnazparivash33');
            this.setState({
                normalDelivery: parseInt(cost[0].delivery_price),
                vipDelivery: parseInt(cost[1].delivery_price)
            })

        });
        AsyncStorage.getItem('deliveryTimes', (err, store) => {
            let time = JSON.parse(store);
            //console.log(time, 'mahnazparivash37');
            this.setState({
                times: time.map(function (jh) {
                    return jh.time_text
                }),
                timeApp: time,
            });
            this.availableTimes();
        });

    }

    availableTimes() {
        let day = new Date().getDay();
        switch (day) {
            case 4:
                this.setState({tomorrowMorning: true, tomorrowEvening: true});
                break;
            case 5:
                this.setState({tomorrowMorning: true, todayEvening: true});
                break;
        }
        //console.log(this.state.timeApp, 'mahnazparivash38');

        //console.log(new Date().getHours(), 'sdlkvmdkld');
        if (new Date().getHours() > this.state.timeApp[1].time_start - 4) {
            this.setState({todayEvening: true})
        }
        if (new Date().getHours() > this.state.timeApp[1].time_end) {
            this.setState({tomorrowMorning: true});
            this.setState({todayEvening: true});
            this.setState({myTime: false});

        }
        if (new Date().getHours() > 16) {
            this.setState({todayEvening: true});


        }
        // this.timeAdjusting('امروز');

    }

    setOrder() {
        // this.setState({dialogVisible: true});
        let readyToSend = [];
        let lortin = [];
        let jhj = {};
        let koon;
        let addressM = '';
        let localM = '';
        let deliveryTimeM = '';
        let orderDescM = 'a';
        let orderPhoneM = '0';
        let gogogo = 0;
        try {
            AsyncStorage.getItem('userInfo', (err, store) => {
                let rr = JSON.parse(store)[0].phone;
                //console.log(store, 'mahnazparivash27');
                this.setState({orderPhoneM: rr})

            });
            AsyncStorage.getItem('usrAddress', (err, store) => {
                let yyy = JSON.parse(store);

                this.setState({
                    addressM: yyy
                });
                //console.log(this.state.addressM, 'mahnazparivash25');


            });
            AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, stores) => {
                    stores.map((result, i, store) => {
                        let value = store[i][1];
                        let key = store[i][0];


                        // if (key.includes('timeSelected')) {
                        //     this.setState({deliveryTimeM: testes + new Date()});
                        //     //console.log(this.state.deliveryTimeM, 'somewhooooo2');
                        //
                        // }

                        if (key.includes('order')) {
                            let testes = JSON.parse(value);

                            //console.log(this.state.addressM[0].local, 'somewhooooo2xx');

                            gogogo = gogogo + 1;
                            let gooz = {
                                key: key,
                                productName: testes.product_name,
                                productMount: testes.product_mount,
                                productModel: testes.model.model_name,
                                productProvider: testes.providerDetails.provider_name,
                                unitPrice: testes.unitPrice,
                                exAddress: this.state.addressM[0].address,
                                local: this.state.addressM[0].local,
                                description: '',
                                ordererPhone: this.state.orderPhoneM,


                            };
                            moz.push(gooz);
                            //console.log(moz, 'cccccccccc');
                            //console.log(JSON.stringify(moz), '1q1q1q12');
                            this.setState({shokhm: moz});
                            // this.sendToServer(moz)

                        }


                    })

                });
                //console.log(JSON.stringify(moz), 'zaqwsxcderfvbgt');

            });
            //console.log(JSON.stringify(this.state.shokhm), 'cccccccc3');
            // this.sendToServer();

        }
        catch (err) {
            //console.log(err)
        }
        // for (let i = 0; i < readyToSend.length; i++) {
        //     readyToSend.push({
        //         exAddress: 'address', local: 'local', deliveryTime: 'time'
        //         , orderDesc: 'desc', orderPhone: 'phone'
        //     })
        // }


        //this.sendToServer();

    }

    sendToServer() {

        let order = this.state.shokhm;
        for (let r=0;r<order.length;r++){
            order[r].description= this.state.description;
        }
        //console.log(order, '1q1q1q13');

        const url = 'http://visitou.ir/api/oriori.php';

        try {
            let test = fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order)
            });

            //console.log(test, 'choschos');
            AsyncStorage.getAllKeys((err, keys) => {
                // let r = JSON.parse(keys);
                let ghoo = keys.filter(x => x.includes('order'));
                AsyncStorage.multiRemove(ghoo, err => {
                    //console.log(err, 'mahnazparivash26')
                });
                this.setState({dialogVisible: false});

                setTimeout(() => {

                    Alert.alert(
                        'پیغام',
                        'خرید شما با موفقیت ثبت شد',

                        [

                            {text: 'خب', onPress: () => //console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                    )

                }, 500);
                Actions.feed();
                // alert('salma', 'sss');


            });


        }

        catch (error) {
            Toast.show({
                text: 'خطا!',
                position: 'bottom',
                buttonText: 'خب'
            })
        }



    }
    listOrder() {
        // //console.log(this.state.list.product_name,'akhonddozd');
        let aan = [];

        let koon = [];
        //console.log(this.state.list, 'dldjj3');

        AsyncStorage.getAllKeys((err, keys) => {

            AsyncStorage.multiGet(keys, (err, stores) => {
                //const ghgh=JSON.parse(stores);
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];
                    if (key.includes('order')) {
                        let listArray = JSON.parse(value);
                        //console.log(listArray, 'mahnazparivash30');
                        koon.push({provider:listArray.providerDetails});
                        aan.push({
                            name: listArray.product_name,
                            price: listArray.unitPrice,
                            mount: listArray.product_mount,
                            cross: listArray.unitPrice * listArray.product_mount,
                            unit: listArray.orderUnit,
                            image: listArray.image,
                            provider: listArray.providerDetails,
                            model:listArray.model,

                            id: key
                        });
                        //console.log(key, '2nhnhnnh');
                        //console.log(aan, 'nhnhnnh');

                    }
                    //console.log(aan,"vfvfvfvfvf1213");
                    aan.sort(function(a, b){return parseInt(a.provider.provider_id) - parseInt(b.provider.provider_id)});

                    // aan.push({name: listArray.product_name, id: key});
                    // let df=aan.sort(function(a, b){
                    //
                    //     let x = a.provider.provider_id.toLowerCase();
                    //     let y = b.provider.provider_id.toLowerCase();
                    //     //console.log(x,"vfvfvfvfxxxxx");
                    //     //console.log(y,"vfvfvfvfddddd");
                    //
                    //     if (x < y) {return -1;}
                    //     if (x > y) {return 1;}
                    //     return 0;
                    // });

                    // //console.log(df,"vfvfvfvfvf121");
                    let sum=0;
                    for (let e = 0; e < aan.length; e++) {
                        // //console.log(buffer[e].cross,'mahnazparivash35');
                        sum += aan[e].cross;
                        //console.log(sum, '21qw21wee2ee2weww');

                    }

                    const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        dataraw: aan,
                        totalCost:sum,
                        isLoading: false,

                        dataSource: dss.cloneWithRows(aan.map(function (itit) {
                            return (
                                itit
                            )
                        })),
                    })

                    // //console.log(listArray, 'akhonda123');
                    // alert(value);


                });
            });

        });

        // this.chos();
        // this.sortingData(aan);


        //console.log(this.state.list, 'dldjj2');


    }
    calculateCosts() {
        let buffer = this.state.dataraw;
        let coco = this.state.deliveryCost;
        let sum = 0;
        let yty;
        //console.log(buffer.length, '432332323');

        // sum=sum+buffer[r].cross;
        for (let e = 0; e < buffer.length; e++) {
            // //console.log(buffer[e].cross,'mahnazparivash35');
            sum += buffer[e].cross;
            //console.log(sum, '432332323');

        }
        //  sum = buffer.cross.reduce((a, b) => a + b, 0);

        //console.log(this.state.shokhm, 'oioioioioi');


        this.setState({totalCost: yty})
    }
    mySelf() {
        let pickItem = [];
        if (new Date().getHours() > 18) {

            pickItem = [['فردا '], ['9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17']]
        }
    }

    shoomi(){
        let width = Dimensions.get('window').width; //full width

        // if(!this.state.availableToSet){
            return(
                <Button style={{
                    borderRadius: 7,
                    justifyContent: 'center',
                    backgroundColor: '#2ECC71',
                    width: 0.9 * width,
                    marginBottom: 20,
                    marginTop: 5
                }} disabled={false} onPress={() =>
                    Alert.alert(
                        'ثبت سفارش...',
                        'آیا مطمین هستید؟',
                        [
                            {text: 'آره', onPress: () => this.sendToServer()},
                            {text: 'نه', onPress: () => //console.log('Cancel Pressed'), style: 'cancel'},

                        ],
                        {cancelable: false}
                    )
                    }>

                    <Text style={{fontFamily:'B Koodak'}}> ثبت سفارش </Text>
                </Button>
            )

        // return(
        // <Button style={{
        //     borderRadius: 7,
        //     justifyContent: 'center',
        //     backgroundColor: '#6C7A89',
        //     width: 0.9 * width,
        //     marginBottom: 20,
        //     marginTop: 5
        // }} disabled={this.state.availableToSet} onPress={() => this.setOrder()}>
        //
        //     <Text style={{fontFamily:'B Koodak'}}> ثبت سفارش </Text>
        // </Button>
        //
        // );


    }
    sortingData(asa){
        let r=asa;
        //console.log(r,"vfvfvfvfvf");

        let df=r.sort(function(a, b){
            return a.cross - b.cross
        });
        let rrr=r.map(function (hg) {
            return hg
        });

        //console.log(asa[0],"vfvfvfvfvf121")

    }
    whichGel(id){


        let r=parseInt(id)+1;
        //console.log(id,'lqlqlqlqlql');

        if(this.state.dataraw.length-1>=r) {

            let r=parseInt(id)+1;
            let a=this.state.dataraw[id];
            let b=this.state.dataraw[r.toString()];
            if (a.provider.provider_id === b.provider.provider_id) {
                // let x= this.state.catchCross;
                // let f= a.cross;
                // this.setState({catchCross:x+f});
                return (
                    <View >
                    </View>
                )
            }
        }
        let sis=this.state.dataraw;
        const hth=this.state.dataraw[id].provider.provider_id;
        let ghoo = sis.filter(x => x.provider.provider_id === hth );
        let hyh=0;
        for(let i=0;i<ghoo.length;i++){
            hyh=hyh+parseInt(ghoo[i].cross)
        }

        //console.log(ghoo,'gqgqgqgqgq');
        //console.log(hth,'gqgqgqgfgfrfr');
        //console.log(this.state.shokhm,'jqqjqjqjqjq');

        return(
            <View style={{alignItems:'center',flexDirection:'row',height:30,flex:1,backgroundColor:'white',margin:5,borderRadius:5
            }}>
                <Text style={{fontFamily:'B Koodak',margin:3}}>تومان</Text>

                <Text style={{fontFamily:'B Koodak',margin:1}}>{hyh}</Text>
                <Right style={{margin:3}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontFamily:'B Koodak'}}>{sis[id].provider.provider_name}</Text>

                    <Text style={{marginRight:3,marginLeft:3,fontFamily:'B Koodak'}}>مجموع فاکتور شرکت </Text>
                    </View>
                </Right>
            </View>
        )
    }
    render() {

        let width = Dimensions.get('window').width; //full width

        let radio_props = [
            {label: this.state.times[1], value: 0},
            {label: this.state.times[0], value: 1},
            {label: this.state.times[1], value: 2},
            {label: this.state.times[2], value: 3},


        ];
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        // //console.log(this.state.times[0].time_text,'dvjgdvkldklv');
        return (
            <Root>
                <Content>
                    <ProgressDialog
                        visible={this.state.dialogVisible}
                        title="ثبت سفارش ..."
                        message="لطفا صبر کنید"
                    />
                    <View style={{
                        flexDirection: 'row', alignItems: 'center'
                        , justifyContent: 'center', backgroundColor: 'white',
                        paddingTop: 10, paddingBottom: 10, marginBottom: 5, marginTop: 10
                    }}>
                        <Button style={{borderWidth: 2, backgroundColor: '#00000000', borderColor: '#2ECC71'}}>
                            <Icon style={{margin: 10}} name="shopping-cart" color="#2ECC71" size={30}
                            />
                        </Button>

                        <Icon style={{margin: 10}} name="arrow-right" color="#F39C12" size={30}
                        />
                        <Button style={{borderWidth: 2, backgroundColor: '#00000000', borderColor: '#2ECC71'}}>
                            <Icon style={{margin: 10}} name="compass" color="#2ECC71" size={30}
                            />
                        </Button>
                        <Icon style={{marginRight: 10, marginLeft: 10}} name="arrow-right" color="#F39C12" size={30}
                        />
                        <Button style={{borderWidth: 2, backgroundColor: '#00000000', borderColor: '#81CFE0'}}>
                            <Icon style={{margin: 10}} name="clock" color="#81CFE0" size={30}
                            />
                        </Button>

                    </View>
                    <ScrollView>

                        <ListView

                            style={{width: width, backgroundColor: '#00000000'}}
                            dataSource={this.state.dataSource}
                            renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this.whichGel(rowID)}
                            stickySectionHeadersEnabled={true}


                            renderRow={(rowData, rowID, sectionID) =>

                                <View style={{
                                    borderRadius: 5, flexDirection: 'row', backgroundColor: 'white'
                                    , justifyContent: 'center', alignItems: 'center', margin: 2
                                }}>
                                    <Text style={{fontFamily:'B Koodak',margin: 10, color: '#4183D7'}}>{rowData.price * rowData.mount}
                                        تومان</Text>

                                    <Right>
                                        <View>

                                            <Text style={{fontFamily:'B Koodak',margin: 10}}>{rowData.name+rowData.provider.provider_name}</Text>
                                            <View style={{height: 1, backgroundColor: '#009688'}}>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                <Text style={{fontFamily:'B Koodak',margin: 3, color: '#4183D7'}}>{rowData.unit}</Text>
                                                <Text style={{fontFamily:'B Koodak',margin: 3, color: '#4183D7'}}>{rowData.mount}</Text>

                                            </View>
                                        </View>
                                    </Right>
                                    <Image
                                        source={{uri: rowData.image}}


                                        style={{
                                            margin: 10,
                                            width: 80,
                                            height: 80,
                                            borderRadius: 7,
                                            backgroundColor: '#00000000'
                                        }}/>
                                </View>
                            }/>
                        <View style={{width: width}}>


                            <View style={{
                                flexDirection: 'row', alignItems: 'center'
                                , backgroundColor: 'white', margin: 5,
                                justifyContent: 'space-between',
                                borderRadius: 7,


                            }}>
                                <Text style={{fontFamily:'B Koodak',marginLeft: 10, color: '#4183D7'}}>{this.state.totalCost} تومان</Text>
                                <Text style={{fontFamily:'B Koodak',color: '#22313F'}}>جمع نهایی</Text>
                                <Icon2 style={{margin: 10, marginRight: 20}} name="calculator" color="#1BBC9B"
                                       size={40}/>


                            </View>
                        </View>

                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{width: width,backgroundColor:'white', borderRadius: 7, margin: 5,
                                padding: 10}}>
                                <Text style={{fontFamily:'B Koodak',textAlign:'right',color:'#34495E',marginLeft:20,marginRight:20,marginBottom:10}}>در صورت تمایل،می توانید توضیحاتی را در مورد سفارش خود در کادر زیر بنویسید</Text>
                                <TextInput style={{fontFamily:'B Koodak',color:'#34495E',placeholderTextColor:'red',backgroundColor:'white'
                                    , height: 100,borderRadius:7,borderWidth:2,borderColor:'#34495E',padding:5,

                                }}
                                           textAlign="right"
                                           multiline={true}
                                           numberOfLines={5}
                                           maxLength={150}
                                           maxHeight={300}
                                           blurOnSubmit={true}
                                           keyboardType={'default'}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           onChangeText={(value => this.setState({description: value}))}
                                           placeholder='سیب ها سایز متوسط باشند...'
                                           />

                            </View>
                            <View >

                                {this.shoomi()}
                            </View>
                        </View>

                    </ScrollView>

                </Content>
            </Root>
        );
    }
}

module.export = Final;