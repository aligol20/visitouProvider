import React, {Component} from 'react';
import {Container, Content, Header, Item, Right, Input, Icon, Button, Text, List, ListItem, View} from 'native-base';
import {StyleSheet, TouchableHighlight,AsyncStorage, ActivityIndicator, Dimensions,TextInput, Image, renderRow, ListView,Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import foot from './appFooter';
import {ProgressDialog} from 'react-native-simple-dialogs';
import  moment from 'jalali-moment';
import Picker from 'react-native-picker';


import AppFooter from './appFooter.js';

let cdc = [];
let fgfgfg = ''

export default class Search extends Component {
    constructor(props) {
        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            pp:false,
            item: '',
            asb: [],
            isLoading: false,
            dataSource: dss.cloneWithRows([]),
            list: [],
            first: 'wait',
            second: 'wait',
            third: 'wait',
            fourth:'۰',
            today: '',
            month: '',
            year: '',
            CuStDay: '',
            CuStMonth: '',
            CuStYear: '',
            CuEnDay: '',
            CuEnMonth: '',
            CuEnYear: '',
            labelStart:'از تاریخ',
            labelEnd:'تا تاریخ'
        };
        AsyncStorage.getItem('AmIlogged', (err, store) => {
            //console.log('axsasaa', JSON.parse(store).user);
            this.setState({user: JSON.parse(store).user});
            let pp = {provider:JSON.parse(store).user};

            //console.log('axsasaa', JSON.parse(store).user);
            fetch('http://visitou.ir/api/check_active.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pp)
            }).then((response) =>
                response.json()
                    .then((responseJson) => {
                        console.log(responseJson[0].is_active,'kzksjkxce');
                        if(responseJson[0].is_active ==='0'){
                            this.signOut()
                        }

                    }))
            this.getAnalyses(JSON.parse(store).user);


        })
    }
    signOut() {
        Alert.alert(
            'توجه',
            'حساب شما غیرفعال شده است،لطفا با ویزیتو تماس بگیرید',
            [
                {text: 'خب', onPress: () => {AsyncStorage.removeItem('AmIlogged');
                    Actions.loginFirst()}},

            ],
            {cancelable: false}
        );

    }

    searchMe(value) {

        this.setState({isLoading: true});
        if (value === '') {
            this.setState({item: 'nothing'});

        } else {
            this.setState({item: value});

        }
        AsyncStorage.getItem('allProducts', (err, stores) => {
            let r = JSON.parse(stores);
            //console.log(r, 'mahnazparivash15');

            let ghoo = r.filter(x => x.product_name.includes(this.state.item) && x.unitprice !== 'no');

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


        });
    }
    calculate(){
        let d1 = this.state.CuStDay;
        let m1 = this.state.CuStMonth;
        let y1 = this.state.CuStYear;
        let d2 = this.state.CuEnDay;
        let m2 = this.state.CuEnMonth;
        let y2 = this.state.CuEnYear;


        let fromDate = moment(this.state.CuStYear+'/'+this.state.CuStMonth+'/'+this.state.CuStDay, 'jYYYY/jM/jD').format('YYYY-M-D');
        let toDate = moment(this.state.CuEnYear+'/'+this.state.CuEnMonth+'/'+this.state.CuEnDay, 'jYYYY/jM/jD').format('YYYY-M-D');

        //console.log(this.state.CuStYear+'/'+this.state.CuStMonth+'/'+this.state.CuStDay,'aqwderf');
        //console.log(this.state.CuEnYear+'/'+this.state.CuEnMonth+'/'+this.state.CuEnDay,'aqwderf5');
        //console.log(fromDate,'dflfjdkljfkdjfk32');
        //console.log(toDate.length,'dflfjdkljfkdjfk37');
        //console.log(this.state.user,'aqwderf11');
        let dd = {thisDay: fromDate, nextDay: toDate, provider: this.state.user};
        if(fromDate!=='Invalid date' && toDate!=='Invalid date') {
            this.setState({pp:true});

            fetch(
                'http://visitou.ir/api/getAnalys.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dd)
                }
            ).then((response) =>
                response.json()
                    .then((responseJson) => {
                        //console.log(responseJson[0]["SUM(order_mount*order_price)"], 'dlkdklfdk3');
                        //console.log(responseJson,'dfjdfkjdf');

                        if (responseJson["SUM(order_mount*order_price)"] !== null) {
                            //console.log(responseJson[0]["SUM(order_mount*order_price)"],'dfjdfkjdf');
                            this.setState({pp:false,fourth: responseJson["SUM(order_mount*order_price)"]})
                        } else {
                            this.setState({fourth: '0',pp:false})

                        }
                    }));
        }else {
            alert('تاریخ وارد شده را بررسی کنید')
        }

    }
    getAnalyses(id) {

        let yyy = new Date();
        let selectedFormat = "jDD-jMM-jYYYY";
        let rrr = moment(yyy.getTime()).format(selectedFormat);
        let DDD = moment().format('jYYYY-jM-jD');


        let thisDay = moment().format('YYYY-M-D');
        let rrrrr = moment(DDD, 'jYYYY/jM/jD');
        rrrrr.add(1, 'day');
        let nextDay = moment(rrrrr.format('jYYYY/jM/jD'), 'jYYYY/jM/jD').format('YYYY-M-D');


        let ffff = moment(DDD, 'jYYYY/jM/jD');
        let MS = moment().format('jYYYY') + '-' + ffff.format('jMM') + '-' + '1';
        let thisMonth = moment(MS, 'jYYYY-jMM-jD').format('YYYY-M-D');

        let zzzz = moment(MS, 'jYYYY/jM/jD');
        zzzz.add(1, 'jMonth');
        let nMS = zzzz.format('jYYYY') + '-' + zzzz.format('jMM') + '-' + '1';
        let nextMonth = moment(nMS, 'jYYYY-jMM-jD').format('YYYY-M-D');

        let xxxx = moment(DDD, 'jYYYY/jM/jD');
        let YS = moment().format('jYYYY') + '-' + '1' + '-' + '1';
        let thisYear = moment(YS, 'jYYYY-jMM-jD').format('YYYY-M-D');
        xxxx.add(1, 'jYear');
        let nYS = xxxx.format('jYYYY') + '-' + '1' + '-' + '1';
        let nextYear = moment(nYS, 'jYYYY-jMM-jD').format('YYYY-M-D');

        //console.log(thisYear, nextYear, 'dflfjdkljfkdjfk');
        //console.log(thisMonth, nextMonth, 'dflfjdkljfkdjfk2');
        //console.log(thisDay, nextDay, 'dflfjdkljfkdjfk3');

        //console.log(moment(MS, 'jYYYY-jMM-jD').format('jMMMM'), 'aaaaas');
        //console.log(moment(YS, 'jYYYY-jMM-jD').format('jYYYY'), 'aaaaas2');
        //console.log(moment().format('jYYYY-jMM-jD'), 'aaaaas3');

        this.setState({
            today: moment().format('jYYYY-jMM-jD')
            , month: moment(MS, 'jYYYY-jMM-jD').format('jMMMM'),
            year: moment(YS, 'jYYYY-jMM-jD').format('jYYYY')
        });


        let pp = {thisDay: thisDay, nextDay: nextDay, provider: id};
        fetch(
            'http://visitou.ir/api/getAnalys.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pp)
            }
        ).then((response) =>
            response.json()
                .then((responseJson) => {
                    //console.log(responseJson[0]["SUM(order_mount*order_price)"], 'dlkdklfdk');
                    if (responseJson[0]["SUM(order_mount*order_price)"] !== null) {
                        this.setState({first: responseJson[0]["SUM(order_mount*order_price)"]})
                    } else {
                        this.setState({first: '0'})

                    }
                }));


        let cc = {thisDay: thisMonth, nextDay: nextMonth, provider: id};

        fetch(
            'http://visitou.ir/api/getAnalys.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cc)
            }
        ).then((response) =>
            response.json()
                .then((responseJson) => {
                    //console.log(responseJson[0]["SUM(order_mount*order_price)"], 'dlkdklfdk2');

                    if (responseJson[0]["SUM(order_mount*order_price)"] !== null) {
                        this.setState({second: responseJson[0]["SUM(order_mount*order_price)"]})
                    } else {
                        this.setState({second: '0'})

                    }
                }));


        let dd = {thisDay: thisYear, nextDay: nextYear, provider: id};
        console.log(dd, 'dlkdklfdk3');

        fetch(
            'http://visitou.ir/api/getAnalys.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dd)
            }
        ).then((response) =>
            response.json()
                .then((responseJson) => {
                    if (responseJson[0]["SUM(order_mount*order_price)"] !== null) {
                        this.setState({third: responseJson[0]["SUM(order_mount*order_price)"]})
                    } else {
                        this.setState({third: '0'})

                    }
                }));


        //console.log(cdc, 'kollllllll')
    }

    selectFrom(){
        let months= [
            {
                1: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                2: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                3: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                4: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                5: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                6: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                7: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                8: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                9: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                10: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                11: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                12: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
            }
        ];
        let data = [
            {1397:months},
            {1398:months},
            {1399:months},
            {1400:months},
            {1401:months},
            {1402:months},
            {1403:months},
            {1404:months},
            {1405:months},
            {1406:months},
            {1407:months},
            {1408:months},
            {1409:months},
            {1410:months},
            {1411:months},
            {1412:months},
            {1413:months},
            {1414:months},

        ];
        // for(var i=0;i<100;i++){
        //     data.push(i);
        // }
        console.log(data,'nanaanwmklmkm');


        Picker.init({
            pickerTextEllipsisLen:11,
            wheelFlex:[1,1,1],
            pickerFontSize:17,
            pickerConfirmBtnText:'تایید',
            pickerCancelBtnText:'انصراف',
            pickerTitleText:'از تاریخ ',
            pickerData: data,
            selectedValue: [59],
            onPickerConfirm: data => {
                console.log(data,'gogogoog1');
                this.setState({CuStYear:data[0]});
                this.setState({CuStMonth:data[1]});
                this.setState({CuStDay:data[2]});
                this.setState({labelStart:data[0]+'/' +data[1]+'/'+ data[2] })

            },
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data);
            }
        });
        Picker.show();
    }

    selectTo(){
        let months= [
            {
                1: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                2: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                3: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                4: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                5: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                6: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            {
                7: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                8: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                9: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                10: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                11: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            },
            {
                12: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
            }
        ];
        let data = [
            {1397:months},
            {1398:months},
            {1399:months},
            {1400:months},
            {1401:months},
            {1402:months},
            {1403:months},
            {1404:months},
            {1405:months},
            {1406:months},
            {1407:months},
            {1408:months},
            {1409:months},
            {1410:months},
            {1411:months},
            {1412:months},
            {1413:months},
            {1414:months},

        ];
        // for(var i=0;i<100;i++){
        //     data.push(i);
        // }
        console.log(data,'nanaanwmklmkm');


        Picker.init({
            pickerTextEllipsisLen:11,
            pickerConfirmBtnText:'تایید',
            pickerCancelBtnText:'انصراف',
            pickerTitleText:'تا تاریخ ',
            wheelFlex:[1,1,1],
            pickerFontSize:17,
            pickerData: data,
            onPickerConfirm: data => {
                console.log(data,'gogogoog');
                this.setState({CuEnYear:data[0]});
                this.setState({CuEnMonth:data[1]});
                this.setState({CuEnDay:data[2]});
                this.setState({labelEnd:data[0]+'/' +data[1]+'/'+ data[2] })
            },
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data);
            }
        });
        Picker.show();
    }


    render() {


        let width = Dimensions.get('window').width; //full width
        let yyy = new Date();
        //console.log(yyy.getTime(), 'ddddkfjhdkj');


        if (!this.state.third === 'wait') {
            return (
                <Container style={{flex: 1, paddingTop: 20}}>
                    <Content>
                        <ActivityIndicator />
                    </Content>
                    <AppFooter/>
                </Container>
            );
        }
        return (
            <Container>
                <Content>
                <ProgressDialog
                    visible={this.state.pp}

                    message="لطفا صبر کنید"
                />

                <View style={{
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20
                }}>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }}>
                    <Text style={{
                        width: '30%',
                        fontFamily: 'B Koodak',
                        textAlign: 'center'
                    }}>{this.state.third + ' ' + 'تومان' }</Text>
                    <Text style={{width: '30%', fontFamily: 'B Koodak', textAlign: 'center'}}>{this.state.year}</Text>

                    <Text style={{width: '30%', fontFamily: 'B Koodak', textAlign: 'center'}}>فروش امسال</Text>
                    </View>
                    <View style={{
                        width: '90%',
                        height:2,
                        backgroundColor:'grey',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 40
                    }}/>

                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }}>
                    <Text style={{
                        width: '30%',
                        fontFamily: 'B Koodak',
                        textAlign: 'center'
                    }}>{this.state.second + ' ' + 'تومان'  }</Text>
                    <Text style={{width: '30%', fontFamily: 'B Koodak', textAlign: 'center'}}>{this.state.month}</Text>

                    <Text style={{width: '30%', fontFamily: 'B Koodak', textAlign: 'center'}}>فروش این ماه</Text>
                    </View>
                    <View style={{
                        width: '90%',
                        height:2,
                        backgroundColor:'grey',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 20
                    }}/>

                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }}>
                    <Text style={{
                        width: '30%',
                        fontFamily: 'B Koodak',
                        textAlign: 'center'
                    }}>{this.state.first + ' ' + 'تومان'}</Text>
                    <Text style={{width: '30%', fontFamily: 'B Koodak', textAlign: 'center'}}>{this.state.today}</Text>

                    <Text style={{width: '30%', fontFamily: 'B Koodak', textAlign: 'center'}}>فروش امروز</Text>
                    </View>

                </View>

                <View style={{justifyContent:'center',alignItems:'center'}}>
                <View style={{
                    width: '90%',
                    height:2,
                    backgroundColor:'grey',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 40
                }}/>
                {/*<View style={{flexDirection: 'row',alignItems: 'center',*/}
                    {/*justifyContent: 'center',}}>*/}
                    {/*<TextInput*/}
                        {/*placeholder={'سال'}*/}
                        {/*maxLength={4}*/}

                        {/*keyboardType={'phone-pad'}*/}
                        {/*onChangeText={(value)=>this.setState({CuStYear:value})}*/}
                        {/*textAlign={'center'}>*/}

                    {/*</TextInput>*/}
                    {/*<TextInput*/}
                        {/*placeholder={'ماه'}*/}
                        {/*onChangeText={(value)=>this.setState({CuStMonth:value})}*/}

                        {/*maxLength={2}*/}

                        {/*keyboardType={'phone-pad'}*/}
                        {/*textAlign={'center'}>*/}
                    {/*</TextInput>*/}
                    {/*<TextInput*/}
                        {/*maxLength={2}*/}
                        {/*onChangeText={(value)=>this.setState({CuStDay:value})}*/}

                        {/*keyboardType={'phone-pad'}*/}
                        {/*textAlign={'center'}*/}
                        {/*placeholder={'روز'}>*/}

                    {/*</TextInput>*/}
                    {/*<Text style={{marginLeft:7,fontFamily:'B Koodak'}}>از تاریخ:</Text>*/}
                {/*</View>*/}
                {/*<View style={{flexDirection: 'row',alignItems: 'center',*/}
                    {/*justifyContent: 'center',}}>*/}
                    {/*<TextInput*/}
                        {/*placeholder={'سال'}*/}
                        {/*maxLength={4}*/}
                        {/*onChangeText={(value)=>this.setState({CuEnYear:value})}*/}

                        {/*keyboardType={'phone-pad'}*/}
                        {/*textAlign={'center'}>*/}


                    {/*</TextInput>*/}
                    {/*<TextInput*/}
                        {/*placeholder={'ماه'}*/}
                        {/*maxLength={2}*/}
                        {/*onChangeText={(value)=>this.setState({CuEnMonth:value})}*/}

                        {/*keyboardType={'phone-pad'}*/}
                        {/*textAlign={'center'}>*/}


                    {/*</TextInput>*/}
                    {/*<TextInput*/}
                        {/*placeholder={'روز'}*/}
                        {/*maxLength={2}*/}
                        {/*onChangeText={(value)=>this.setState({CuEnDay:value})}*/}

                        {/*keyboardType={'phone-pad'}*/}
                        {/*textAlign={'center'}>*/}

                    {/*</TextInput>*/}

                    {/*<Text style={{marginLeft:7,fontFamily:'B Koodak'}}>تا تاریخ:</Text>*/}
                {/*</View>*/}
                    <View style={{marginTop:17}}>
                        <TouchableHighlight style={{borderRadius:7,borderWidth:2,margin:3,borderColor:'#1c375c'}}
                                            underlayColor={'white'}
                                            onPress={()=>this.selectFrom()}>
                            <Text style={{margin:10,fontFamily:'B Koodak',color:'#1c375c'}}>{this.state.labelStart}</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{marginTop:17}}>
                        <TouchableHighlight style={{borderRadius:7,borderWidth:2,margin:3,borderColor:'#1c375c'}}
                                            underlayColor={'white'}
                                            onPress={()=>this.selectTo()}>
                            <Text style={{margin:10,fontFamily:'B Koodak',color:'#1c375c'}}>{this.state.labelEnd}</Text>
                        </TouchableHighlight>
                    </View>



                    <View style={{marginTop:37}}>
                    <TouchableHighlight style={{borderRadius:7,borderWidth:2,margin:10,borderColor:'#4B77BE'}}
                                        underlayColor={'white'}
                                        onPress={()=>this.calculate()}>
                        <Text style={{margin:10,fontFamily:'B Koodak',color:'#4B77BE'}}>محاسبه</Text>
                    </TouchableHighlight>
                    </View>
                </View>

                <View style={{width:'100%',flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:10}}>
                    <Text style={{ fontFamily: 'B Koodak', textAlign: 'center'}}>تومان</Text>

                    <Text style={{ fontFamily: 'B Koodak', textAlign: 'center'}}>{this.state.fourth}</Text>
                </View>
                </Content>
                <AppFooter/>
            </Container>
        );
    }
}

module.export = Search;