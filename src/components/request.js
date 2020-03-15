import React, {Component} from 'react';
import {AsyncStorage, renderRow,TouchableWithoutFeedback, ActivityIndicator,Alert, Dimensions,Switch,StyleSheet, ScrollView,Image, ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Picker from 'react-native-picker';
import Icon from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/Ionicons'
import Icon5 from 'react-native-vector-icons/Feather'
import {ProgressDialog} from 'react-native-simple-dialogs';
import moment from 'jalali-moment';
import AppFooter from './appFooter.js';


import {
    Container, Button, Toast,
    Text, Thumbnail, View, Body,
    Content, Footer, FooterTab,
    Badge, Right, Tab, Tabs
} from 'native-base';
import { YellowBox } from 'react-native';
import Address from './address'
let testing = [];
const styles = StyleSheet.create({
    buttonDelYes:{width: '100%',
        backgroundColor: '#2ECC71',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10},
    buttonDelNo:{width: '100%',
        backgroundColor: 'white',
        borderColor:'grey',
        borderRadius:5,
        borderWidth:2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10},
    buttonDelCan:{width: '100%',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10},
    txtDelYes:{fontFamily: 'B Koodak',color:'white'},
    txtDelNo:{fontFamily: 'B Koodak',color:'#2ECC71'},
    txtDelCan:{fontFamily: 'B Koodak',color:'red'},


});
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class Request extends React.Component {
    constructor(props) {
        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });
        this.state = {
            settingWait:false,
            list: [],
            newKeys: [],
            list2: [],
            mount: 1,
            itemlabel: [],
            isLoading: true,
            disable: true,
            background: '#BDC3C7',
            user: '',
            monalisa:[],


            dataSource: dss.cloneWithRows([]),
            gooz: ds.cloneWithRowsAndSections([]),

        };
        //console.log(this.state.list, 'asdfghjk');


    }
    componentWillMount(){
        AsyncStorage.getItem('AmIlogged', (err, store) => {
            //console.log('axsasaa', JSON.parse(store).user);
            this.setState({user: JSON.parse(store).user});
            //console.log('axsasaa', this.state.user);
            // this.loadRequests();
            let pp = {provider:JSON.parse(store).user};

            this.listOrderTotal(JSON.parse(store).user);
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
    loadRequests(){
        AsyncStorage.getItem('loadedRequestT', (err, store) => {
            const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                list: JSON.parse(store),
                dataSource: dss.cloneWithRows(JSON.parse(store).map(function (itit) {
                    return (
                        itit
                    )
                }))
            })
        });
        AsyncStorage.getItem('loadedRequestD',(err,store)=>{
            let responseJson = JSON.parse(store);
            console.log(responseJson, 'axsasaa34');
            let pop = [];
            let nob = [];

            let fgf = responseJson.length;
            for (let i = 0; i <= fgf; i++) {
                nob[i] = [];
            }
            //console.log(responseJson, '1q0');
            let uo = 0;
            if(responseJson.length>1) {
                for (let i = 0; i < fgf; i++) {
                    if (i === fgf - 1) {
                        if (responseJson[i].order_number !== responseJson[i - 1].order_number) {
                            //console.log(responseJson[i].order_number, '1q1');
                            pop.push(responseJson[i]);
                            nob[uo].push(responseJson[i]);
                            uo = uo + 1;
                            //console.log(uo, 'mamamama3')
                        } else {
                            //console.log(responseJson[i], '1q2');
                            //console.log(i, 'mamamama378');
                            pop.push(responseJson[i]);

                            nob[uo].push(responseJson[i]);
                            //console.log(nob[0], 'mamamama377');

                        }
                    } else {
                        if (responseJson[i].order_number !== responseJson[i + 1].order_number) {
                            //console.log(responseJson[i], '1q3');
                            pop.push(responseJson[i]);
                            nob[uo].push(responseJson[i]);
                            uo = uo + 1;
                            //console.log(uo, 'mamamama3')
                        } else {
                            //console.log(responseJson[i], '1q4');
                            //console.log(i, 'mamamama378');

                            nob[uo].push(responseJson[i]);
                            //console.log(nob[0], 'mamamama377');

                        }
                    }
                }
            }




            //console.log(nob.length,'krekfkkhcjddd');

            if(pop.length===0 && nob.length!==0 && responseJson.length!==0){
                pop.push(responseJson[0]);
                nob[0].push(responseJson[0]);
                //console.log(pop,'krekfkkhcj');

            }
            const kol = pop.length;
            const jok = nob.length;
            //console.log(kol,'1q7');
            //console.log(jok,'1q8');
            //console.log(nob,'1q5');

            for (let i=kol;i<jok;i++){
                nob.splice(i)
            }
            //console.log(nob,'1q6');
            //console.log(pop,'1q9');
            //console.log(responseJson[0],'sdhjdwhkjdwhjkww2');

            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
                getRowData: (dataBlob, sectionID, rowID) => nob[sectionID][rowID],
                getSectionHeaderData: (dataBlob, sectionID) => pop[sectionID]
            });
            this.setState({
                list2: responseJson,
                gooz: ds.cloneWithRowsAndSections(nob),
                settingWait:false,
                isLoading: false,

            })
        })


    }
    listOrderTotal(user) {
        let aan = {provider: user};

        let koon = [];
        let mm = {provider: user};

        console.log(aan, 'axsasaa3');
                    // try {
                    //     fetch('http://visitou.ir/api/readRequestMount.php', {
                    //         method: 'POST',
                    //         headers: {
                    //             'Accept': 'application/json',
                    //             'Content-Type': 'application/json',
                    //         },
                    //         body: JSON.stringify(mm)
                    //     }).then((response) =>
                    //         response.json()
                    //             .then((responseJson) => {
                    //                 // console.log(responseJson,'dlfkjdfkldjd4');
                    //
                    //                 AsyncStorage.setItem('orderMount', JSON.stringify(responseJson.length))
                    //             }));
                    // }catch (err){
                    //     console.log(err,'fgfgffgfgddddd')
                    // }

            AsyncStorage.multiGet(['loadedRequestT','lastTime'], (err, store) => {
                console.log(store,'dlkfdklgj');
                let pp = {date: store[1][1],provider:user};
                console.log(pp,'fff11111');
                let date = new Date(store[1][1]);
                let dateNow = new Date(moment().format('YYYY-M-D hh:mm:ss'));
                let seconds = date.getTime(); //1440516958
                let secondsNow = dateNow.getTime(); //1440516958
                let difference =  (secondsNow - seconds)/1000;
                console.log(seconds,secondsNow,difference,'fff11177777');
                console.log(date,dateNow,difference,'fff11177777');

                if (store[0][1]!==null ) {
                    if( difference>180){
                        console.log(store[0][1],'fff111112');
                        console.log('refreshing...','fff11143337');

                        try {
                            console.log(pp,'fff1111133');

                            fetch('http://visitou.ir/api/checkrefresh.php', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(pp)
                            }).then((response) =>
                                response.json()
                                    .then((responseJsonN) => {

                                        console.log(responseJsonN, 'fff11110');
                                        if (responseJsonN[0] === null) {
                                            console.log(store[0][1], 'lkvfkl');
                                            let responseJson = JSON.parse(store[0][1]);
                                            this.setState({isLoading: false});
                                            const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                                            this.setState({
                                                list: responseJson,
                                                dataSource: dss.cloneWithRows(responseJson.map(function (itit) {
                                                    return (
                                                        itit
                                                    )
                                                })),

                                            });
                                            this.listOrderDetails(user)
                                        } else {

                                            this.forceFetchTotal(aan)
                                        }

                                    }));
                        }
                        catch (err){
                            console.log(err,'jhjhhjhjj')
                        }
                    }
                    else {
                        console.log('no need to refresh...','fff1114333');
                        let responseJson = JSON.parse(store[0][1]);
                        this.setState({isLoading: false});
                        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                        this.setState({
                            list: responseJson,
                            dataSource: dss.cloneWithRows(responseJson.map(function (itit) {
                                return (
                                    itit
                                )
                            })),

                        });
                        this.listOrderDetails(user)
                    }
                }

                else {
                    console.log('salam');
                    this.forceFetchTotal(aan)


                }

            })


        // this.listOrderDetails(user);

    }
    forceFetchTotal(aan){
        console.log('fff1119');
        try {

            fetch('http://visitou.ir/api/readRequest.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aan)
            }).then((response) =>
                response.json()
                    .then((responseJson) => {
                console.log(responseJson,'fff111');
                        fetch('http://visitou.ir/api/readRequestDetails.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(aan)
                        }).then((response) =>
                            response.json()
                                .then((responseJsonD) => {
                                    fetch('http://visitou.ir/api/readRequestMount.php', {
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify(aan)
                                    }).then((response) =>
                                        response.json()
                                            .then((responseJsonMM) => {
                                                console.log(responseJsonMM.length,'dlfkjdfkldjd4');

                                                AsyncStorage.setItem('orderMount',JSON.stringify(responseJsonMM.length))
                                            }));
                                    AsyncStorage.setItem('loadedRequestD', JSON.stringify(responseJsonD));
                                    console.log(responseJsonD, 'fgfgfkjgfkgf0');
                                    console.log(responseJsonD,'fff1112');
                                    console.log(responseJson,'fgfgfkjgfkgf1');
                                    AsyncStorage.setItem('loadedRequestT', JSON.stringify(responseJson));
                                    AsyncStorage.setItem('lastTime', moment().format('YYYY-M-D hh:mm:ss'));
                                    console.log(responseJson, 'fff1117');

                                    const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                                    this.setState({
                                        list: responseJson,
                                        dataSource: dss.cloneWithRows(responseJson.map(function (itit) {
                                            return (
                                                itit
                                            )
                                        })),

                                    })
                                    this.listOrderDetails(aan.provider)
                                }));

                        }
                    ));

        }catch (err){
            console.log(err,'ddfdfkl')
        }
    }
    forceFetchDetails(aan){
        try {
            fetch('http://visitou.ir/api/readRequestDetails.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(aan)
            }).then((response) =>
                response.json()
                    .then((responseJson) => {
                        AsyncStorage.setItem('loadedRequestD', JSON.stringify(responseJson));
                            console.log(responseJson, 'axsasaa34');
                            let pop = [];
                            let nob = [];

                            let fgf = responseJson.length;
                            for (let i = 0; i <= fgf; i++) {
                                nob[i] = [];
                            }
                            //console.log(responseJson, '1q0');
                            let uo = 0;
                            if (responseJson.length > 1) {
                                for (let i = 0; i < fgf; i++) {
                                    if (i === fgf - 1) {
                                        if (responseJson[i].order_number !== responseJson[i - 1].order_number) {
                                            //console.log(responseJson[i].order_number, '1q1');
                                            pop.push(responseJson[i]);
                                            nob[uo].push(responseJson[i]);
                                            uo = uo + 1;
                                            //console.log(uo, 'mamamama3')
                                        } else {
                                            //console.log(responseJson[i], '1q2');
                                            //console.log(i, 'mamamama378');
                                            pop.push(responseJson[i]);

                                            nob[uo].push(responseJson[i]);
                                            //console.log(nob[0], 'mamamama377');

                                        }
                                    } else {
                                        if (responseJson[i].order_number !== responseJson[i + 1].order_number) {
                                            //console.log(responseJson[i], '1q3');
                                            pop.push(responseJson[i]);
                                            nob[uo].push(responseJson[i]);
                                            uo = uo + 1;
                                            //console.log(uo, 'mamamama3')
                                        } else {
                                            //console.log(responseJson[i], '1q4');
                                            //console.log(i, 'mamamama378');

                                            nob[uo].push(responseJson[i]);
                                            //console.log(nob[0], 'mamamama377');

                                        }
                                    }
                                }
                            }


                            //console.log(nob.length,'krekfkkhcjddd');

                            if (pop.length === 0 && nob.length !== 0 && responseJson.length !== 0) {
                                pop.push(responseJson[0]);
                                nob[0].push(responseJson[0]);
                                //console.log(pop,'krekfkkhcj');

                            }
                            const kol = pop.length;
                            const jok = nob.length;
                            //console.log(kol,'1q7');
                            //console.log(jok,'1q8');
                            //console.log(nob,'1q5');

                            for (let i = kol; i < jok; i++) {
                                nob.splice(i)
                            }
                            //console.log(nob,'1q6');
                            //console.log(pop,'1q9');
                            //console.log(responseJson[0],'sdhjdwhkjdwhjkww2');

                            const ds = new ListView.DataSource({
                                rowHasChanged: (r1, r2) => r1 !== r2,
                                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
                                getRowData: (dataBlob, sectionID, rowID) => nob[sectionID][rowID],
                                getSectionHeaderData: (dataBlob, sectionID) => pop[sectionID]
                            });
                            this.setState({
                                list2: responseJson,
                                gooz: ds.cloneWithRowsAndSections(nob),
                                settingWait: false,
                                isLoading: false,

                            })
                        }
                    ));
        }catch (err){
            console.log(err,'fgfgffgfg')
        }
    }
    listOrderDetails(user){
        let aan = {provider: user};
        let koon = [];
        console.log(aan, 'fff1113');
        AsyncStorage.multiGet(['loadedRequestD','lastTime'], (err, store) => {
            console.log(store,'fff1114');
            console.log(store[0][1],'fff1116');
            let pp = {date: store[1][1],provider:user};
            console.log(pp,'fff1117');
            console.log(user,'fff1118');

            if (store[0][1]!==null) {
                fetch('http://visitou.ir/api/checkrefresh.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pp)
                }).then((response) =>
                    response.json()
                        .then((responseJsonN) => {
                            console.log(responseJsonN ,'dlkfdklgjllllll');
                            if(responseJsonN[0]===null){
                                console.log(store[0][1],'lkvfkl');
                                let responseJson = JSON.parse(store[0][1]);
                                console.log(responseJson, 'fff1115');
                                let pop = [];
                                let nob = [];

                                let fgf = responseJson.length;
                                for (let i = 0; i <= fgf; i++) {
                                    nob[i] = [];
                                }
                                //console.log(responseJson, '1q0');
                                let uo = 0;
                                if (responseJson.length > 1) {
                                    for (let i = 0; i < fgf; i++) {
                                        if (i === fgf - 1) {
                                            if (responseJson[i].order_number !== responseJson[i - 1].order_number) {
                                                //console.log(responseJson[i].order_number, '1q1');
                                                pop.push(responseJson[i]);
                                                nob[uo].push(responseJson[i]);
                                                uo = uo + 1;
                                                //console.log(uo, 'mamamama3')
                                            } else {
                                                //console.log(responseJson[i], '1q2');
                                                //console.log(i, 'mamamama378');
                                                pop.push(responseJson[i]);

                                                nob[uo].push(responseJson[i]);
                                                //console.log(nob[0], 'mamamama377');

                                            }
                                        } else {
                                            if (responseJson[i].order_number !== responseJson[i + 1].order_number) {
                                                //console.log(responseJson[i], '1q3');
                                                pop.push(responseJson[i]);
                                                nob[uo].push(responseJson[i]);
                                                uo = uo + 1;
                                                //console.log(uo, 'mamamama3')
                                            } else {
                                                //console.log(responseJson[i], '1q4');
                                                //console.log(i, 'mamamama378');

                                                nob[uo].push(responseJson[i]);
                                                //console.log(nob[0], 'mamamama377');

                                            }
                                        }
                                    }
                                }


                                //console.log(nob.length,'krekfkkhcjddd');

                                if (pop.length === 0 && nob.length !== 0 && responseJson.length !== 0) {
                                    pop.push(responseJson[0]);
                                    nob[0].push(responseJson[0]);
                                    //console.log(pop,'krekfkkhcj');

                                }
                                const kol = pop.length;
                                const jok = nob.length;
                                //console.log(kol,'1q7');
                                //console.log(jok,'1q8');
                                //console.log(nob,'1q5');

                                for (let i = kol; i < jok; i++) {
                                    nob.splice(i)
                                }
                                //console.log(nob,'1q6');
                                //console.log(pop,'1q9');
                                //console.log(responseJson[0],'sdhjdwhkjdwhjkww2');

                                const ds = new ListView.DataSource({
                                    rowHasChanged: (r1, r2) => r1 !== r2,
                                    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
                                    getRowData: (dataBlob, sectionID, rowID) => nob[sectionID][rowID],
                                    getSectionHeaderData: (dataBlob, sectionID) => pop[sectionID]
                                });
                                this.setState({
                                    list2: responseJson,
                                    gooz: ds.cloneWithRowsAndSections(nob),
                                    settingWait: false,
                                    isLoading: false,

                                })
                            }
                            else {
                                this.forceFetchDetails(aan);
                                // AsyncStorage.mergeItem('loadedRequestD',JSON.stringify(responseJsonN));
                                AsyncStorage.setItem('lastTime', moment().format('YYYY-M-D hh:mm:ss'));
                                // AsyncStorage.getItem('loadedRequestD',(err,store)=>{
                                //     let responseJson = JSON.parse(store);
                                //     console.log(responseJson, 'axsasaa34');
                                //     let pop = [];
                                //     let nob = [];
                                //
                                //     let fgf = responseJson.length;
                                //     for (let i = 0; i <= fgf; i++) {
                                //         nob[i] = [];
                                //     }
                                //     //console.log(responseJson, '1q0');
                                //     let uo = 0;
                                //     if (responseJson.length > 1) {
                                //         for (let i = 0; i < fgf; i++) {
                                //             if (i === fgf - 1) {
                                //                 if (responseJson[i].order_number !== responseJson[i - 1].order_number) {
                                //                     //console.log(responseJson[i].order_number, '1q1');
                                //                     pop.push(responseJson[i]);
                                //                     nob[uo].push(responseJson[i]);
                                //                     uo = uo + 1;
                                //                     //console.log(uo, 'mamamama3')
                                //                 } else {
                                //                     //console.log(responseJson[i], '1q2');
                                //                     //console.log(i, 'mamamama378');
                                //                     pop.push(responseJson[i]);
                                //
                                //                     nob[uo].push(responseJson[i]);
                                //                     //console.log(nob[0], 'mamamama377');
                                //
                                //                 }
                                //             } else {
                                //                 if (responseJson[i].order_number !== responseJson[i + 1].order_number) {
                                //                     //console.log(responseJson[i], '1q3');
                                //                     pop.push(responseJson[i]);
                                //                     nob[uo].push(responseJson[i]);
                                //                     uo = uo + 1;
                                //                     //console.log(uo, 'mamamama3')
                                //                 } else {
                                //                     //console.log(responseJson[i], '1q4');
                                //                     //console.log(i, 'mamamama378');
                                //
                                //                     nob[uo].push(responseJson[i]);
                                //                     //console.log(nob[0], 'mamamama377');
                                //
                                //                 }
                                //             }
                                //         }
                                //     }
                                //
                                //
                                //     //console.log(nob.length,'krekfkkhcjddd');
                                //
                                //     if (pop.length === 0 && nob.length !== 0 && responseJson.length !== 0) {
                                //         pop.push(responseJson[0]);
                                //         nob[0].push(responseJson[0]);
                                //         //console.log(pop,'krekfkkhcj');
                                //
                                //     }
                                //     const kol = pop.length;
                                //     const jok = nob.length;
                                //     //console.log(kol,'1q7');
                                //     //console.log(jok,'1q8');
                                //     //console.log(nob,'1q5');
                                //
                                //     for (let i = kol; i < jok; i++) {
                                //         nob.splice(i)
                                //     }
                                //     //console.log(nob,'1q6');
                                //     //console.log(pop,'1q9');
                                //     //console.log(responseJson[0],'sdhjdwhkjdwhjkww2');
                                //
                                //     const ds = new ListView.DataSource({
                                //         rowHasChanged: (r1, r2) => r1 !== r2,
                                //         sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
                                //         getRowData: (dataBlob, sectionID, rowID) => nob[sectionID][rowID],
                                //         getSectionHeaderData: (dataBlob, sectionID) => pop[sectionID]
                                //     });
                                //     this.setState({
                                //         list2: responseJson,
                                //         gooz: ds.cloneWithRowsAndSections(nob),
                                //         settingWait: false,
                                //         isLoading: false,
                                //
                                //     })
                                // })
                            }

                        }));



            }
            else {
                console.log('salam');
                this.forceFetchDetails(aan)


            }

        })


    }
    refresh(){
        setTimeout(() => {
            this.setState({settingWait:false});

        }, 5000);
        this.setState({settingWait:true});
        this.listOrderDetails(this.state.user);
        this.listOrderTotal(this.state.user);
    }
    whichGel(id){

        //console.log(parseInt(id),'koakokoaokaoksoqo2');

        let r=parseInt(id)+1;

        if(this.state.list2.length-1>=r) {

            let r=parseInt(id)+1;
            let a=this.state.list2[id];
            let b=this.state.list2[r.toString()];
            if (a.order_number === b.order_number) {
                // let x= this.state.catchCross;
                // let f= a.cross;
                // this.setState({catchCross:x+f});
                return (
                    <View >
                    </View>
                )
            }
        }
        let sis=this.state.list2;
        const hth=this.state.list2[id].order_number;
        const ghoo = sis.filter(x => x.order_number === hth );

        let hyh=0;
        const e=ghoo.length;

        for(let i=0;i<e;i++){
            const fff=parseInt(ghoo[i].order_price)*parseInt(ghoo[i].order_mount);
            hyh=hyh+fff;
        }

        let y = sis[id].date;
        let yyy=new Date(sis[id].date);
        // // let moment = require('moment-jalaali');
        // let m= moment(yyy.getTime()).format('YYYY/MM/jDD');
        // // //console.log(m,'ssssssssssss');
        // // let moment = require('moment-jalaali');
        // let rrr=moment(yyy.getTime()).format('jYYYY/jM/jD');
        // //console.log(yyy.getTime(),'gqgqgqgfgfrfrwww');

        return(
            <View style={{alignItems:'center',flexDirection:'row',height:30,flex:1,backgroundColor:'#ECF0F1',borderWidth:2,borderColor:'white',marginTop:5,marginBottom:5
            }}>
                <View style={{width:'35%',flexDirection:'row',justifyContent:'center'}}>
                    <Text style={{fontFamily:'B Koodak',margin:1}}>{sis[id].orderer_phone}</Text>
                </View>
                <View style={{width:'35%',flexDirection:'row',justifyContent:'center'}}>
                    <Text style={{fontFamily:'B Koodak',marginRight:3,marginLeft:3}}>تاریخ</Text>
                </View>


                <View style={{width:'30%',flexDirection:'row',justifyContent:'center'}}>

                    <Text style={{marginRight:3,marginLeft:3}}>{sis[id].order_number}</Text>
                </View>
            </View>
        )
    }
    acceptItems(name,model){
        this.setState({settingWait:true});
        let gg={name: name,model:model};
        //console.log(gg,'fkljdklfd');
        fetch('http://visitou.ir/api/setAcceptMulti.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gg)
        }).then((response) =>
            response.json()
                .then((responseJson) => {
            let aan = {provider: this.state.user};
                    this.forceFetchTotal(aan);
                    // this.forceFetchDetails(this.state.user);

                    }
                ));
    }
    rejectItems(name,model){
        this.setState({settingWait:true});
        let gg={name: name,model:model};
        fetch('http://visitou.ir/api/setRejectMulti.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gg)
        }).then((response) =>
            response.json()
                .then((responseJson) => {
                    let aan = {provider: this.state.user};
                    this.forceFetchTotal(aan);
                    // this.forceFetchDetails(this.state.user);

                    }
                ));
    }
    hello(id,sectionID) {
        //console.log(id,'sdhjdwhkjdwhjkwwhghghh');
        //console.log(sectionID,'sdhjdwhkjdwhjkwwlkkll');

        let r=this.state.list2;
        let uuuu = this.state.monalisa;
        let ghoo = r.filter(x => x.order_number===id.order_number);
        let kooni=0;

        for (let i=0;i<ghoo.length;i++){
            kooni=kooni+ghoo[i].order_mount*ghoo[i].order_price
        }
        //console.log(r,'lkwlkdjwkdjkwl');
        //console.log(id,'nhjhghgg');


        factor = id.orderer_phone;
        let selectedFormat = "jDD-jMM-jYYYY";
        outputFormat = "YYYY-MM-DD hh:mm:ss";
        // let moment = require('moment-jalaali');
        //console.log(id.date,'sdmdl');

        let rrr = moment(id.date,outputFormat).format(selectedFormat);


        return (


            <View style={{flexDirection: 'row', backgroundColor: '#DADFE1', width: '100%', marginTop: 20}}>
                <View style={{height:1,width:'100%',backgroundColor:'grey'}}/>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: '18%', alignItems: 'center', justifyContent: 'center', marginLeft: 20}}>

                        <Text style={{
                            width: '100%',
                            fontFamily: 'B Koodak',
                            marginTop: 5,
                            textAlign: 'center',
                            color: "#F89406"
                        }}>{'مجموع' + ' ' + 'مبلغ:'}</Text>
                        <Text style={{
                            width: '100%',
                            fontFamily: 'B Koodak',
                            marginTop: 5,
                            textAlign: 'center',
                            color: "#F89406"
                        }}>{kooni + ' ' + 'تومان'}</Text>
                    </View>
                    <View style={{width: '80%'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{
                                width: '50%',
                                fontFamily: 'B Koodak',
                                textAlign: 'right',
                                paddingRight: 20,
                                alignItems: 'center'
                            }}>{'تاریخ:' + ' ' + rrr}</Text>
                            <Text style={{
                                width: '50%',
                                fontFamily: 'B Koodak',
                                textAlign: 'right',
                                paddingRight: 20,
                                alignItems: 'center'
                            }}>{'شماره فاکتور:' + ' ' + id.order_number}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{
                                width: '50%',
                                fontFamily: 'B Koodak',
                                textAlign: 'right',
                                paddingRight: 20,
                                alignItems: 'center'
                            }}>{'شغل:' + ' ' + id.user_job}</Text>
                            <Text style={{
                                width: '50%',
                                fontFamily: 'B Koodak',
                                textAlign: 'right',
                                paddingRight: 20,
                                alignItems: 'center'
                            }}>{'نام:' + ' ' + id.ordererName}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{
                                width: '50%',
                                fontFamily: 'B Koodak',
                                textAlign: 'right',
                                paddingRight: 20,
                                alignItems: 'center'
                            }}>{'شماره تلفن:' + ' ' + id.worPhone}</Text>
                            <Text style={{
                                width: '50%',
                                fontFamily: 'B Koodak',
                                textAlign: 'right',
                                paddingRight: 20,
                                alignItems: 'center'
                            }}>{'شماره همراه:' + ' ' + id.orderer_phone}</Text>
                        </View>
                        <View>
                            <Text style={{
                                width: '100%',
                                fontFamily: 'B Koodak',
                                textAlign: 'right',
                                paddingRight: 20,
                                alignItems: 'center'
                            }}>{'آدرس:' + ' ' + id.exAddress}</Text>

                        </View>
                    </View>
                </View>
                <View style={{backgroundColor: 'white', flexDirection: 'row', width: '100%'}}>
                    <Text style={{
                        backgroundColor: 'white',
                        width: '20%',
                        textAlign: 'center',
                        fontFamily: 'B Koodak'
                    }}>{'تایید '}</Text>
                    <Right style={{width: '80%'}}>
                        <View style={{flexDirection: 'row'}}>



                            <Text style={{
                                width: '20%',
                                margin: 3,
                                color: 'black',
                                textAlign: 'center',
                                fontFamily: 'B Koodak'
                            }}>{'قیمت واحد'}</Text>
                            <Text style={{
                                width: '15%',
                                margin: 3,
                                color: 'black',
                                textAlign: 'center',
                                fontFamily: 'B Koodak'
                            }}>{'تعداد'}</Text>
                            <Text style={{
                                width: '15%',
                                margin: 5,
                                textAlign: 'center',
                                fontFamily: 'B Koodak'
                            }}>{'نوع'}</Text>
                            <Text style={{
                                width: '25%',
                                margin: 5,
                                textAlign: 'right',
                                fontFamily: 'B Koodak'
                            }}>{'نام محصول'}</Text>
                        </View>
                    </Right>


                </View>
            </View>


        )
    }
    acceptIt(id){
        this.setState({settingWait:true});
        let gg={id: id};
        fetch('http://visitou.ir/api/setAcceptOne.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gg)
        }).then((response) =>
            response.json()
                .then((responseJson) => {
                    let aan = {provider: this.state.user};
                    this.forceFetchTotal(aan);
                    // this.forceFetchDetails(this.state.user);
                    }
                ));
    }
    reject(id){
        this.setState({settingWait:true});
        let gg={id: id};
        fetch('http://visitou.ir/api/rejectOne.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gg)
        }).then((response) =>
            response.json()
                .then((responseJson) => {
                    let aan = {provider: this.state.user};
                    this.forceFetchTotal(aan);
                    // this.forceFetchDetails(this.state.user);
                    }
                ));
    }
    acceptAll(){

        this.setState({settingWait:true});
        let gg={pro: this.state.user};
        fetch('http://visitou.ir/api/acceptAll.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gg)
        }).then((response) =>
            response.json()
                .then((responseJson) => {
                    let aan = {provider: this.state.user};
                    this.forceFetchTotal(aan);
                    // this.forceFetchDetails(this.state.user);
                    }
                ));
    }
    loading() {
        if (this.state.isLoading) {
            return (
                <Container style={{flex: 1, paddingTop: 20}}>
                        <ActivityIndicator />

                </Container>
            );
        }else {
            return(
            <Tabs
               >
                <Tab heading="مجموع">

                    <ListView
                        enableEmptySections={true}
                        style={{width: '99%', backgroundColor: '#00000000'}}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, rowID, sectionID) =>

                            <View style={{
                                borderRadius: 0, flexDirection: 'row', backgroundColor: 'white'
                                , justifyContent: 'center', alignItems: 'center', marginRight: 10,marginLeft:10,width:'100%'
                            }}>

                                <Button style={{margin:5}}
                                        onPress={() =>  this.acceptItems(rowData.order_name,rowData.model_details)}>
                                    <Text style={{ fontFamily: 'B Koodak'}}>تایید</Text>

                                </Button>
                                <TouchableWithoutFeedback onPress={()=>this.rejectItems(rowData.order_name,rowData.model_details)} style={{width:'8%'}}>
                                    <Text style={{borderWidth:1,borderRadius:3,borderColor:'red',padding:3,marginLeft:10,textAlign:'center',color:'red', fontFamily: 'B Koodak'
                                    }}>رد</Text>
                                </TouchableWithoutFeedback>
                                <Text style={{
                                    width: '15%',
                                    margin: 3,
                                    color: '#4183D7',
                                    textAlign: 'center',
                                    fontFamily: 'B Koodak'
                                }}> {rowData["SUM(order_mount*order_price)"]+'  '+ 'تومان'} </Text>
                                <Text style={{
                                    width: '10%',
                                    margin: 3,
                                    color: '#4183D7',
                                    textAlign: 'center',
                                    fontFamily: 'B Koodak'
                                }}>{rowData["SUM(order_mount)"]}</Text>
                                <Text style={{
                                    width: '15%',
                                    margin: 5,
                                    textAlign: 'center',
                                    fontFamily: 'B Koodak'
                                }}>{rowData.model_details}</Text>
                                <Text style={{
                                    width: '25%',
                                    margin: 5,
                                    textAlign: 'center',
                                    fontFamily: 'B Koodak'
                                }}>{rowData.order_name}</Text>

                            </View>

                        }/>

                </Tab>
                <Tab heading="جزییات">


                    <ListView
                        enableEmptySections={true}
                        style={{width: '99%', backgroundColor: '#00000000'}}
                        dataSource={this.state.gooz}
                        stickySectionHeadersEnabled={true}
                        renderSectionHeader={(section,sectionID) =>
                            this.hello(section,sectionID)
                        }
                        renderRow={(rowData, rowID, sectionID) =>
                            <View style={{
                                borderRadius: 0, flexDirection: 'row', backgroundColor: 'white'
                                , justifyContent: 'center', alignItems: 'center',width:'100%',marginBottom:5
                            }}>

                                <Button style={{marginLeft:10,justifyContent:'center',alignItems:'center'}}
                                        onPress={() => this.acceptIt(rowData.order_id)}
                                >
                                    <Text style={{textAlign:'center', fontFamily: 'B Koodak'
                                    }}>تایید</Text>
                                </Button>
                                <TouchableWithoutFeedback onPress={()=>this.reject(rowData.order_id)} style={{width:'8%'}}>
                                    <Text style={{borderWidth:1,borderRadius:3,borderColor:'red',padding:3,marginLeft:10,textAlign:'center',color:'red', fontFamily: 'B Koodak'
                                    }}>رد</Text>
                                </TouchableWithoutFeedback>
                                <Right style={{width: '80%'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{
                                            width: '25%',
                                            margin: 3,
                                            color: '#4183D7',
                                            textAlign: 'center',
                                            fontFamily: 'B Koodak'
                                        }}> {rowData.order_price+'  '+ 'تومان'} </Text>
                                        <Text style={{
                                            width: '15%',
                                            margin: 3,
                                            color: '#4183D7',
                                            textAlign: 'center',
                                            fontFamily: 'B Koodak'
                                        }}>{rowData.order_mount}</Text>
                                        <Text style={{
                                            width: '15%',
                                            margin: 5,
                                            textAlign: 'center',
                                            fontFamily: 'B Koodak'
                                        }}>{rowData.model_details}</Text>
                                        <Text style={{
                                            width: '25%',
                                            margin: 5,
                                            textAlign: 'right',
                                            fontFamily: 'B Koodak'
                                        }}>{rowData.order_name}</Text>
                                    </View>
                                </Right>

                            </View>

                        }/>

                </Tab>

            </Tabs>
            )
        }

    }
    render() {
        let tot = this.state.list;
        let det = this.state.list2;
        const {navigate} = this.props.navigation;

        let width = Dimensions.get('window').width; //full width
        let height = Dimensions.get('window').height; //full width
        let ooo='SUM(order_mount*order_price)';
        let ggg='SUM(order_mount)';
        let koo=[];
            return (

                <Container>
                    <ProgressDialog
                        visible={this.state.settingWait}
                        message="لطفا صبر کنید"
                    />
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginBottom:10,marginTop:10}}>
                        <Button
                            onPress={()=>this.refresh()}
                            style={{margin:5,borderRadius:7,backgroundColor:'#F9690E'}}>
                            <Icon5
                                style={{margin:3}}
                            name="refresh-ccw"
                            color='white'
                            size={25}/>
                            <Text>به روز رسانی</Text>
                        </Button>
                        <Button
                            onPress={()=>    Alert.alert(
                                'توجه',
                                'آیا میخواهید همه سفارش ها را تایید کنید؟',

                                [
                                    {text: 'بله', onPress: () => this.acceptAll()},
                                    {text: 'خیر', onPress: () =>null},

                                ],
                                { cancelable: false }
                            )}
                            style={{margin:5,borderRadius:7,backgroundColor:'#2ECC71'}}>
                            <Icon5
                                style={{margin:3}}
                                name="check-square"
                            color='white'
                            size={25}/>
                            <Text>تایید همه</Text>
                        </Button>
                    </View>

                    {this.loading()}


                    <AppFooter/>
                </Container>
            );
        }

}
module.export = Request;