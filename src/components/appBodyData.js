import React, {Component} from 'react';
import {
    Container, Button, Header,
    Icon, List, Thumbnail, ListItem, Title, Right, Left, Text, Toast, View, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
import AppFooter from './appFooter.js';
import {
    Modal,
    Linking, AsyncStorage, ActivityIndicator, ScrollView, NativeModules,
    StatusBar, Image, Alert, renderRow, ListView, Platform, Dimensions, Switch,
} from 'react-native';
import {ProgressDialog} from 'react-native-simple-dialogs';

import AppBanner from '../components/appBanner';
import {Actions} from 'react-native-router-flux';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon6 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon5 from 'react-native-vector-icons/Entypo';
import Image2 from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

export default class AppBodyData extends React.Component {


    constructor(props) {

        super(props);

        this.getData();


        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            imageLoading: true,
            isLoading: true,

            asb: [],
            rrr: '123',
            dataSource: dss.cloneWithRows([]),
            forRank: dss.cloneWithRows([]),
            list: [],
            first: 1,
            reload: true,
            dialog: [],
            loaded: false,
            isUpdateReady: false,
            upDateLink: '',
            modalSeen: false,
            citys: [],
            citySource: dss.cloneWithRows([]),
            rankInfo: [],
            getRank: false,
            rankSetted: [],
            rarra: 3,
            dialogVisible: false,
            user: [],
        };

        AsyncStorage.getItem('AmIlogged', (err, store) => {
            console.log('axsasaa', JSON.parse(store).user);
            this.setState({user: JSON.parse(store)});
            let pp = {provider:JSON.parse(store).user};
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
    sendToServer(value, id) {
        this.setState({dialogVisible: true});
        switch (value) {
            case true:
                let pp = {avai: 1, id: id};
                let ff = this.state.user;
                //console.log(value, 'mnmnmmnm');

                fetch('http://visitou.ir/api/changeState.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pp)
                }).then((response) =>
                    response.json()
                        .then((responseJson) => {
                                fetch('http://visitou.ir/api/logProIN.php', {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(ff)
                                }).then((response) =>
                                    response.json()
                                        .then((responseJson) => {
                                            let r = '';
                                            //AsyncStorage.setItem('proList', JSON.stringify(responseJson));
                                            console.log(responseJson, 'gggggggg4');
                                            for (let i = 0; i < responseJson.length; i++) {
                                                r = r + responseJson[i].product_id + ',';
                                            }
                                            r = r + '0';
                                            // Actions.feed();
                                            //console.log(JSON.stringify(r), 'gggggggg467');

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
                                                            //console.log(responseJson, 'gggggggg46777');
                                                            this.getData();

                                                        }
                                                    ))

                                        })
                                )
                            }
                        ));
                break;
            case false:
                let pp3 = {avai: 0, id: id};

                fetch('http://visitou.ir/api/changeState.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pp3)
                }).then((response) =>
                    response.json()
                        .then((responseJson) => {
                                let ff = this.state.user;
                                fetch('http://visitou.ir/api/logProIN.php', {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(ff)
                                }).then((response) =>
                                    response.json()
                                        .then((responseJson) => {
                                            console.log(responseJson, 'gggggggg666');

                                            let r = '';
                                            //AsyncStorage.setItem('proList', JSON.stringify(responseJson));
                                            //console.log(responseJson, 'gggggggg4');
                                            for (let i = 0; i < responseJson.length; i++) {
                                                r = r + responseJson[i].product_id + ',';
                                            }
                                            r = r + '0';
                                            // Actions.feed();
                                            //console.log(JSON.stringify(r), 'gggggggg467');

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
                                                            //console.log(responseJson, 'gggggggg46');
                                                            this.getData();

                                                        }
                                                    ))

                                        })
                                )
                            }
                        ));
                break;
        }


    }

    changeProState(value, id, name) {
        let fffff = 'آیا می خواهید'+' '+name+' '+'را موجود کنید؟';
        let ggggg = 'آیا می خواهید'+' '+name+' '+'را ناموجود کنید؟';
        switch (value) {
            case true:
                Alert.alert(
                    'توجه',
                    fffff,

                    [
                        {text: 'بله', onPress: () => this.sendToServer(value, id)},
                        {text: 'خیر', onPress: () =>null} //console.log('Cancel Pressed'), style: 'cancel'},

                    ],
                    {cancelable: false}
                );
                break;
            case false:
                Alert.alert(
                    'توجه',
                   ggggg,

                    [
                        {text: 'بله', onPress: () => this.sendToServer(value, id)},
                        {text: 'خیر', onPress: () =>null} //console.log('Cancel Pressed'), style: 'cancel'},

                    ],
                    {cancelable: false}
                );
                break;

        }
    }

    getData() {


        try {
            AsyncStorage.getItem('proList', (err, stores) => {

                const listArray = JSON.parse(stores);
                // //console.log(store, 'ghghghghgh');
                // //console.log(err,'ghghghghgh');

                const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                //console.log(listArray, 'mahnaz777');

                this.setState({
                    list: listArray,
                    isLoading: false,
                    dialogVisible: false,
                    dataSource: dss.cloneWithRows(listArray.map(function (tt) {
                        return tt
                    })),
                });
            });

        } catch (err) {
            //console.log(err, 'hyhyhyhyhy')
        }
        //get offer list from koala server


        // //console.log(this.state.dataSource,'rtrtrtrt');


        // //console.log(this.state.names[i]);
        this.getRate();

    }

    getRate() {
        AsyncStorage.getItem('userInfo', (err, store) => {
            if (store !== null) {
                //console.log(JSON.parse(store)[0].phone, 'mahnazparivash899999');
                let pop = JSON.parse(store)[0].phone;
                const phone = {phone: pop};

                fetch('http://visitou.ir/api/get_ready_for_rate.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(phone)
                }).then((response) => {
                    //console.log(JSON.parse(response._bodyInit), 'pqpqpqpqsws2');
                    const l = JSON.parse(response._bodyInit).length;
                    const info = JSON.parse(response._bodyInit);
                    let ko = [];
                    for (let i = 0; i < info.length; i++) {
                        if (!ko.map(function (t) {
                                return t.provider_details
                            }).includes(info[i].provider_details)) {
                            ko.push(info[i])
                        }
                    }
                    //console.log(ko, 'alalalalal');
                    if (l > 0) {
                        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

                        this.setState({
                            getRank: true, rankInfo: ko,
                            forRank: dss.cloneWithRows(ko.map(function (tt) {
                                return tt
                            }))
                        })
                    }
                });

            }
        });
    }

    goh() {
        let aaaan = {
            "to": "/topics/ahmad",
            "data": {
                "message": "This is a Firebase Cloud Messaging Topic Message!",
            }
        };
        //console.log(JSON.stringify(aaaan), 'mamamamamam');
        fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Authorization': 'key=AIzaSyDa_jg-APcHVFYlnPpPR-sR1ESsrEq_Hy4',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(aaaan)

        }).then((response) =>null
            //console.log(response, 'mamamamamam2')
        );
    }

    buttonPress() {
        navigation.navigate('Details');

        //console.log('hamashoon dozdan');
    }

    koon(ggoh) {
        return (
            ggoh.map(function (item) {
                let offers = item.offerprice;
                let prices = item.unitprice;
                let names = item.product_name;

                return {
                    offer: offers,
                    price: prices,
                    name: names
                };
            }))

    }

    gogo() {
        //AsyncStorage.setItem('product',fox);
        // return(
        //     Actions.details
        // )
        //console.log('salaaaaaam');

    }

    test(moz, navi) {
        return (

            <View style={{backgroundColor: 'green'}}>

                {moz.map(function (item) {
                    function Test(uiui) {
                        AsyncStorage.setItem('product', JSON.stringify(uiui));
                        //console.log(uiui, 'qwerty');
                        return (
                            Actions.details
                        )

                    }

                    // //console.log(item,'jgjgjgjggj');
                    return (

                        <Button style={{width: 400, backgroundColor: 'yellow'}}
                                onPress={Test(1)}>


                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{backgroundColor: 'red', flexDirection: 'column'}}>
                                    <Text>
                                        {item.offerprice}
                                    </Text>
                                    <Text>
                                        {item.unitprice}
                                    </Text>

                                </View>
                                <Text>
                                    {item.product_name}

                                </Text>
                            </View>
                        </Button>

                    )


                })}


            </View>

        )
    }

    introduce() {
        Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
                {text: 'Ask me later', onPress: () =>null}, //console.log('Ask me later pressed')},
                {text: 'Cancel', onPress: () =>null}, //console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () =>null}, //console.log('OK Pressed')},
            ],
            {cancelable: false}
        )
    }

    shoombol() {
        return (
            <Image source={require('../imageSource/koalaborder.png')}
            />

        )
    }

    upGradeButton() {
        if (this.state.isUpdateReady) {


            return (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>

                    <Icon6 style={{marginTop: 5}}
                           name='update'
                           color="#ffffff" size={27}
                           onPress={() => introduce()}/>
                </View>
            )
        }
        return (
            <View>

            </View>
        )
    }

    updateMe() {
        Alert.alert(
            'کوالای جدید آماده است',
            'آن را نصب کنید  و از کوالای بهتر لذت ببرید',
            [

                {text: 'بعدا', onPress: () => null},//console.log('OK lklklkllkll Pressed')},
                {text: 'باشه', onPress: () => this.upgrade()},

            ],
            {cancelable: true}
        )
    }

    upgrade() {
        // let filePath = RNFS.ExternalDirectoryPath + '/visitouproviderprovider.apk';

        // NativeModules.InstallApk.install(filePath);

        Linking.canOpenURL(this.state.upDateLink).then(supported => {
            if (supported) {
                Linking.openURL(this.state.upDateLink);
                //console.log("know how to open URI:fffdfdddfdf " + this.state.upDateLink);

            } else {
                //console.log("Don't know how to open URI: " + this.state.upDateLink);
            }
        });

    }

    selectingRate(eee) {
        //console.log(eee, 'fdfdfdfdf');
        this.setState({rarra: eee})
    }

    readyForRank(rowData, rowID, sectionID) {
        let height = Dimensions.get('window').height; //full width
        const pp = parseInt(sectionID);
        const r = this.state.rankInfo;
        //console.log(r, 'aqazxsss');
        for (let i = 0; i < r.length; i++) {

        }
        // if(r[pp+1].provider_details===r[pp].provider_details){
        // return(
        //     <View style={{backgroundColor:'red'}}>
        //
        //     </View>
        // )
        // }
        return (
            <View style={{marginTop: 40, backgroundColor: 'white', justifyContent: 'center'}}>
                <View style={{
                    backgroundColor: '#00000000',
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    borderRadius: 7,
                    borderWidth: 2,
                    height: 0.1 * height,
                    borderColor: '#22313F',
                    margin: 7,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{width: '40%'}}>
                        <StarRatingBar
                            starStyle={{
                                width: 20,
                                height: 20,
                            }}
                            readOnly={false}
                            continuous={true}
                            score={3.7}
                            allowsHalfStars={true}
                            accurateHalfStars={true}
                            onStarValueChanged={(score) => {
                                //console.log('new score:' + score);
                            }}
                        />
                    </View>
                    <Text style={{
                        alignItems: 'center', textAlign: 'right'
                        , fontFamily: 'B Koodak', fontSize: 23, width: '40%', backgroundColor: 'white'
                    }}>
                        {rowData.provider_details}

                    </Text>
                </View>
            </View>
        )
    }

    caneclVote() {
        let pip = this.state.rankInfo;
        for (let i = 0; i < pip.length; i++) {
            if (pip[i].vote_rate === '0') {
                pip[i].vote_rate = 0.1
            }
        }
        //console.log(pip, 'aqwqwqwqw');
        fetch('http://visitou.ir/api/set_rank.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pip)
        }).then((response) => {
            //console.log(response, 'koaoaads'), this.setState({getRank: false})
        })

    }

    setIt() {
        let pip = this.state.rankInfo;
        for (let i = 0; i < pip.length; i++) {
            if (pip[i].vote_rate === '0') {
                pip[i].vote_rate = 0.1
            }
        }
        //console.log(pip, 'aqwqwqwqw');
        fetch('http://visitou.ir/api/set_rank.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pip)
        }).then((response) => {
            //console.log(response, 'koaoaads'), this.setState({getRank: false})
        })

    }

    setRank(score, id, provider_details, orderer_phone) {
        let opop = this.state.rankInfo;
        //console.log(id, 'ssssssssss')
        opop[parseInt(id)].vote_rate = score;
        this.setState({rankInfo: opop});
        const op = {phone: orderer_phone, provider: provider_details, score: score};


        //console.log(this.state.rankInfo, 'vasasas');
    }

    render() {


        function shest(uiui) {
            AsyncStorage.setItem('product', JSON.stringify(uiui));
            return (
                Actions.details()

            )


        }

        function goTelegram() {
            //console.log('hihibyebye');
            Linking.canOpenURL('https://t.me/koalafruit').then(supported => {
                if (supported) {
                    Linking.openURL('https://t.me/koalafruit');
                    //console.log("Don't know how to open URI:fffdfdddfdf " + 'https://t.me/koalafruit');

                } else {
                    //console.log("Don't know how to open URI: " + 'https://t.me/koalafruit');
                }
            });

        }





        if (this.state.isLoading) {

            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        let width = Dimensions.get('window').width; //full width
        let height = Dimensions.get('window').height; //full width
        //console.log(width, 'frfrfrfrfrfr');

        return (
            <Container>
                <ProgressDialog
                    visible={this.state.dialogVisible}
                    title="ثبت وضعیت ..."
                    message="لطفا صبر کنید"
                />


                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: 50,
                    backgroundColor: '#1c375c'
                }}>
                    <View style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '30%',
                        flexDirection: 'row'
                    }}>

                        <View style={{height: 0, width: '70%', backgroundColor: 'red'}}/>


                    </View>

                    <View style={{alignItems: 'center', justifyContent: 'center', width: '40%'}}>
                        <Text style={{
                            width: '100%', textAlign: 'center',
                            fontSize: 23, color: '#ffd500', fontFamily: 'DastNevis',
                        }}>ویزیتو</Text>

                    </View>
                    <View style={{width: '30%'}}/>

                    <View/>
                </View>
                <Content style={{backgroundColor: '#00000000'}}>

                    <ScrollView style={{backgroundColor: '#00000000'}}>
                        <View style={{backgroundColor: 'white', height: 2, width: width}}/>


                        <ListView

                            style={{width: width, backgroundColor: '#00000000'}}
                            dataSource={this.state.dataSource}
                            renderRow={(rowData, rowID, sectionID) =>

                                <View style={{
                                    backgroundColor: '#00000000',
                                    width: width
                                }}>
                                    <View style={{
                                        marginBottom: 2,
                                        marginRight: 5,
                                        marginLeft: 5,
                                        marginTop: 1,
                                        borderRadius: 7,
                                    }}>
                                        <Button style={{backgroundColor: 'white', height: 80}}
                                                onPress={() =>null}>


                                            <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                                                <View style={{flexDirection: 'column',width:'35%'}}>
                                                    <Text style={{
                                                        marginBottom: 10,
                                                        marginTop: 10,
                                                        textAlign:'center',
                                                        color: 'green',
                                                        fontFamily: 'B Koodak'
                                                    }}>
                                                        {rowData.unitprice} تومان

                                                    </Text>


                                                </View>
                                                <Switch
                                                    value={rowData.available === '1'}
                                                    onValueChange={(value) => this.changeProState(value, rowData.product_id, rowData.product_name)}/>
                                                <Right>
                                                    <Text style={{
                                                        alignItems: 'center', marginRight: 7
                                                        , fontFamily: 'B Koodak'
                                                    }}>
                                                        {rowData.product_name}

                                                    </Text>
                                                </Right>
                                            </View>

                                            <View style={{overflow: 'hidden', margin: 10, borderRadius: 7}}>
                                                <Image2
                                                    key={rowID}
                                                    source={{uri: rowData.small_image_link, cache: 'force-cache',}}

                                                    style={{
                                                        width: 60,
                                                        height: 60
                                                    }}/>

                                            </View>


                                        </Button>

                                    </View>
                                </View>

                            }/>


                    </ScrollView>
                </Content>

                <AppFooter/>
            </Container>
        );

    }

}


module.export = AppBodyData;