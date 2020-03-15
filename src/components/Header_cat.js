import React, {Component} from 'react';
import {
    Container, Button, Header,
    Icon, List, ListItem, Text, Thumbnail, View, Body, Content, Right, Footer, FooterTab, Badge
} from 'native-base';
import {AsyncStorage, ActivityIndicator,TouchableWithoutFeedback, Dimensions,Alert, StyleSheet,SectionList, renderRow, ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Icon5 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon98 from 'react-native-vector-icons/FontAwesome'
import StarRating from 'react-native-star-rating';
import {ProgressDialog} from 'react-native-simple-dialogs';
import moment from 'jalali-moment';
import AppFooter from './appFooter.js';

import Modal from "react-native-modal";
let fgf=[];

const styles = StyleSheet.create({
    buttonDelYes: {borderRadius:3,
        backgroundColor: '#2ECC71',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    buttonDelNo: {borderRadius:3,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderRadius: 5,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    buttonDelCan: {borderRadius:3,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    txtDelYes: {fontFamily: 'B Koodak', color: 'white'},
    txtDelNo: {fontFamily: 'B Koodak', color: '#2ECC71'},
    txtDelCan: {fontFamily: 'B Koodak', color: 'red'},


});

export default class Header_cat extends Component {
    constructor(props) {

        super(props);
        const dss = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            hope:[],
            isLoading: true,
            asb: [],
            rrr: '123',
            dataSource: dss.cloneWithRowsAndSections([]),
            list: [],
            user: '',
            modalVisible: false,
            starCount: 1,
            dv: false,
            delPhone: 0,
            delOrdernumber: 0,
            simple: [],
            cusRate: 0,
            rateArray:[],
            khodChos:[],
            anbarghi:[],



        };

        AsyncStorage.getItem('AmIlogged', (err, store) => {
            //console.log('axsasaa', JSON.parse(store).user);
            this.setState({user: JSON.parse(store).user});
            //console.log('axsasaa', this.state.user);
            // this.getCategory(JSON.parse(store).user);
            let aan = {pro: JSON.parse(store).user};
            this.forceFetchHistory(aan)

            let pp = {provider:JSON.parse(store).user};
            console.log(pp,'kgfgkgkgfgg');

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
    forceFetchHistory(aan){
        console.log(aan, 'fff22213');

        fetch('http://visitou.ir/api/getAllhistory.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(aan)
        }).then((response) =>
            response.json()
                .then((responseJson) => {
                    fetch(
                        'http://visitou.ir/api/getUserInfo.php', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(aan)
                        }).then((responseRate) =>
                        responseRate.json()
                            .then((responseJsonRate) => {
                                console.log(responseJsonRate, 'fff222tttYaRabb');



                            console.log(responseJson, 'fff22213');

                        let pop = [];
                        let nob = [];
                        let lool = [];

                        let fgf = responseJson.length;
                        for (let i = 0; i < fgf; i++) {
                            nob[i] = [];
                        }
                        //console.log(responseJson.length, 'zxcfdrth');
                        let uo = 0;
                        for (let i = 0; i < fgf-1 ; i++) {
                            console.log(fgf, 'zxcfdrth');
                            if(i===fgf-1){
                                console.log('kkkkkkkkkkkkkkkk', 'zxcfdrth');

                                if (responseJson[i].order_number !== responseJson[i-1].order_number) {
                                    console.log(responseJson[i].order_number, 'mamamama4');
                                    let khooni=0;
                                    let ghoo = responseJson.filter(x => x.order_number === responseJson[i].order_number);
                                    for (let iii = 0; iii < ghoo.length; iii++) {
                                        khooni = khooni + ghoo[iii].order_mount * ghoo[iii].order_price
                                    }
                                    let j = responseJsonRate;

                                    let rate_result = j.filter(x => x.phonenumber === responseJson[i].orderer_phone);
                                    // fgf[sectionID]=rate_result[0];
                                    // console.log(Math.round(fgf[sectionID].user_rate * 10) / 10,sectionID,'whatshouldIdo?')
                                    console.log(rate_result,'ljljljlj');
                                    // console.log(rate_result[0][0],'ljljljljgtgt');

                                    if(rate_result.length!==0){
                                        lool.push([{total:responseJson[i]},{jooni:khooni},{vote:rate_result[0].user_vote},{rate:Math.round(rate_result[0].user_rate * 10) / 10}]);
                                        console.log(lool,'ljljljlj');

                                    }else {
                                        lool.push([{total:responseJson[i]},{jooni:khooni},{vote:0},{rate:0}]);

                                    }
                                    // lool.push([{total:responseJson[i]},{jooni:khooni},{vote:rate_result[0][0].vote_rate},{rate:Math.round(rate_result[0].user_rate * 10) / 10}]);
                                    pop.push(responseJson[i]);
                                    nob[uo].push(responseJson[i]);
                                    uo = uo + 1;
                                    //console.log(uo, 'mamamama3')
                                } else {
                                    //console.log(responseJson[i], 'mamamama37');
                                    //console.log(i, 'mamamama378');

                                    nob[uo].push(responseJson[i]);
                                    console.log(nob[0], 'mamamama377');

                                }
                            }else
                                {
                                if (responseJson[i].order_number !== responseJson[i+1].order_number) {
                                    console.log(responseJson[i].order_number, 'mamamama4');
                                    let khooni=0;
                                    let ghoo = responseJson.filter(x => x.order_number === responseJson[i].order_number);
                                    for (let iii = 0; iii < ghoo.length; iii++) {
                                        khooni = khooni + ghoo[iii].order_mount * ghoo[iii].order_price
                                    }
                                    let j = responseJsonRate;

                                    let rate_result = j.filter(x => x.phonenumber === responseJson[i].orderer_phone);
                                    // fgf[sectionID]=rate_result[0];
                                    // console.log(Math.round(fgf[sectionID].user_rate * 10) / 10,sectionID,'whatshouldIdo?')
                                    console.log(rate_result,'ljljljljssss');
                                    console.log(responseJsonRate,'ljljljljsssszzz');
                                    console.log(responseJson,'ljljljljsssfkdfdfkldkfldkflszzz');

                                    // console.log(rate_result[0],'ljljljljdddd');
                                    if(rate_result.length!==0){
                                        lool.push([{total:responseJson[i]},{jooni:khooni},{vote:rate_result[0].user_vote},{rate:Math.round(rate_result[0].user_rate * 10) / 10}]);

                                    }else {
                                        lool.push([{total:responseJson[i]},{jooni:khooni},{vote:0},{rate:0}]);

                                    }
                                    pop.push(responseJson[i]);
                                    nob[uo].push(responseJson[i]);
                                    uo = uo + 1;
                                    //console.log(uo, 'mamamama3')
                                } else {
                                    //console.log(responseJson[i], 'mamamama37');
                                    //console.log(i, 'mamamama378');

                                    nob[uo].push(responseJson[i]);
                                    //console.log(nob[0], 'mamamama377');

                                }
                            }


                        }
                        if(pop.length===0){
                            pop.push(responseJson[0]);
                            nob[0].push( responseJson[0]);
                            console.log(nob,'dkdkfdfdfdfdfdfdfdf');

                            let khooni=0;
                            let ghoo = responseJson.filter(x => x.order_number === responseJson[0].order_number);
                            for (let iii = 0; iii < ghoo.length; iii++) {
                                khooni = khooni + ghoo[iii].order_mount * ghoo[iii].order_price
                            }
                            lool.push([{total:responseJson[0]},{jooni:khooni},{vote:responseJsonRate[0].user_vote},{rate:Math.round(responseJsonRate[0].user_rate * 10) / 10}]);

                        }

                        let kon = [];
                        const kol = pop.length;
                        const jok = nob.length;

                        for (let i=kol;i<jok;i++){
                            nob.splice(i)
                        }
                                AsyncStorage.setItem('userInfoDownloded',JSON.stringify(responseJsonRate));
                                AsyncStorage.setItem('AllHistory',JSON.stringify(responseJson));
                                AsyncStorage.setItem('AllHistoryM',JSON.stringify(nob));
                                AsyncStorage.setItem('AllHistoryH',JSON.stringify(pop));
                                AsyncStorage.setItem('AllHistoryLool',JSON.stringify(lool));
                                AsyncStorage.setItem('lastTimeHistory',JSON.stringify(moment().format('YYYY-M-D hh:mm:ss')));


                        console.log(nob, 'sdhjdwhkjdwhjkwwsss');
                        //console.log(kon, 'mamamama4s23');
                        console.log(lool, 'mamamama4s23');
                        const ds = new ListView.DataSource({
                            rowHasChanged: (r1, r2) => r1 !== r2,
                            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
                            getRowData: (dataBlob, sectionID, rowID) => nob[sectionID][rowID],
                            getSectionHeaderData: (dataBlob, sectionID) => pop[sectionID]
                        });
                        this.setState({
                            list: responseJson,
                            dataSource: ds.cloneWithRowsAndSections(nob),
                            dv: false,
                            isLoading: false,
                            waiting:false,
                            hope:lool

                        })
                            }));
                    }
                ));
    }
    getCategory(user) {
        let aan = {pro: user};
        console.log(aan, 'axsasaa3');

            AsyncStorage.multiGet(['AllHistory', 'lastTimeHistory','AllHistoryM','AllHistoryH','AllHistoryLool'], (err, store) => {
                console.log(store[0][1], 'fff2221');
                    console.log(store[1][1], 'fff2222');
                    console.log(store[2][1], 'fff22225');
                    console.log(store[3][1], 'fff22226');
                    console.log(store[4][1], 'fff22227');
                    console.log(JSON.parse(store[4][1]), 'fff22227');
                let date = new Date(JSON.parse(store[1][1]));

                let dateNow = new Date(moment().format('YYYY-M-D hh:mm:ss'));
                let seconds = date.getTime(); //1440516958
                let secondsNow = dateNow.getTime(); //1440516958
                let difference =  (secondsNow - seconds)/1000;
                console.log(difference,date,'fff222321');
                if (store[0][1] !== null) {
                    let pp = {pro:user};
                    console.log(store[0][1], 'fff2224');
                    if(difference>60){
                        console.log('refreshed','fff22245');
                        try {
                            fetch('http://visitou.ir/api/checkrefreshHistory.php', {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(pp)
                            }).then((response) =>
                                response.json()
                                    .then((responseJsonN) => {
                                        let newHistory = responseJsonN[0]['COUNT(*)'];
                                        console.log(responseJsonN, 'dlkfdklgjllllll');
                                        let responseJson = JSON.parse(store[0][1]);
                                        console.log(responseJson.length, 'dlkfdklgjllllll');
                                        console.log(newHistory, 'fff22245666');
                                        console.log(responseJson.length, 'fff22245666');

                                        if (responseJson.length === parseInt(newHistory)) {
                                            let responseJson = JSON.parse(store[0][1]);
                                            console.log(responseJsonN, 'fff222456');
                                            console.log(responseJson, 'fff2223');

                                            let pop = [];
                                            let lool = [];
                                            let nob = [];

                                            let fgf = responseJson.length;
                                            // for (let i = 0; i <= fgf; i++) {
                                            //     nob[i] = [];
                                            // }
                                            // //console.log(responseJson.length, 'zxcfdrth');
                                            // let uo = 0;
                                            // for (let i = 0; i < fgf - 1; i++) {
                                            //     if (i === fgf - 1) {
                                            //         if (responseJson[i].order_number !== responseJson[i - 1].order_number) {
                                            //             //console.log(responseJson[i].order_number, 'mamamama4');
                                            //             // let khooni=0;
                                            //             // let ghoo = responseJson.filter(x => x.order_number === responseJson[i].order_number);
                                            //             // for (let iii = 0; iii < ghoo.length; iii++) {
                                            //             //     khooni = khooni + ghoo[iii].order_mount * ghoo[iii].order_price
                                            //             // }
                                            //             // lool.push([{total:responseJson[i]},{jooni:khooni}]);
                                            //             nob[uo].push(responseJson[i]);
                                            //             pop.push(responseJson[i]);
                                            //
                                            //             uo = uo + 1;
                                            //             //console.log(uo, 'mamamama3')
                                            //         } else {
                                            //             //console.log(responseJson[i], 'mamamama37');
                                            //             //console.log(i, 'mamamama378');
                                            //
                                            //             nob[uo].push(responseJson[i]);
                                            //             //console.log(nob[0], 'mamamama377');
                                            //
                                            //         }
                                            //     } else {
                                            //         if (responseJson[i].order_number !== responseJson[i + 1].order_number) {
                                            //             //console.log(responseJson[i].order_number, 'mamamama4');
                                            //             // let khooni=0;
                                            //             // let ghoo = responseJson.filter(x => x.order_number === responseJson[i].order_number);
                                            //             // for (let iii = 0; iii < ghoo.length; iii++) {
                                            //             //     khooni = khooni + ghoo[iii].order_mount * ghoo[iii].order_price
                                            //             // }
                                            //             // lool.push([{total:responseJson[i]},{jooni:khooni}]);
                                            //             pop.push(responseJson[i]);
                                            //             nob[uo].push(responseJson[i]);
                                            //             uo = uo + 1;
                                            //             //console.log(uo, 'mamamama3')
                                            //         } else {
                                            //             //console.log(responseJson[i], 'mamamama37');
                                            //             //console.log(i, 'mamamama378');
                                            //
                                            //             nob[uo].push(responseJson[i]);
                                            //             //console.log(nob[0], 'mamamama377');
                                            //
                                            //         }
                                            //     }
                                            //
                                            //
                                            // }
                                            // if (pop.length === 0) {
                                            //     pop.push(responseJson[0]);
                                            //     lool.push(responseJson[0]);
                                            // }
                                            //
                                            // let kon = [];
                                            // const kol = pop.length;
                                            // const jok = nob.length;
                                            //
                                            // for (let i = kol; i < jok; i++) {
                                            //     nob.splice(i)
                                            // }
                                            //



                                            console.log(nob[0], 'sdhjdwhkjdwhjkwwsss');
                                            console.log(pop, 'mamamama4s23');
                                            // console.log(jok, 'mamamama4s235');
                                            console.log(lool, 'mamamama4s23');
                                            let xx= JSON.parse(store[2][1]);
                                            let yy= JSON.parse(store[3][1]);
                                            let ll= JSON.parse(store[4][1]);
                                            console.log(ll, 'sdhjdwhkjdwhjkww231');
                                            const ds = new ListView.DataSource({
                                                rowHasChanged: (r1, r2) => r1 !== r2,
                                                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
                                                getRowData: (dataBlob, sectionID, rowID) => xx[sectionID][rowID],
                                                getSectionHeaderData: (dataBlob, sectionID) => yy[sectionID]
                                            });
                                            this.setState({
                                                list: responseJson,
                                                dataSource: ds.cloneWithRowsAndSections(xx),
                                                dv: false,
                                                isLoading: false,
                                                hope:ll

                                            })



                                        }
                                        else {
                                            console.log('newHistory','fff2224567');

                                            this.forceFetchHistory(aan)

                                        }
                                    }));
                        }
                        catch (err){
                            console.log(err,'mjghghghh')
                        }
                    }
                    else {
                        console.log('no need','fff22213456');

                        let responseJson = JSON.parse(store[0][1]);

                        let pop = [];
                        let nob = [];

                        let fgf = responseJson.length;
                        for (let i = 0; i <= fgf; i++) {
                            nob[i] = [];
                        }
                        //console.log(responseJson.length, 'zxcfdrth');
                        let uo = 0;
                        for (let i = 0; i < fgf - 1; i++) {
                            if (i === fgf - 1) {
                                if (responseJson[i].order_number !== responseJson[i - 1].order_number) {
                                    //console.log(responseJson[i].order_number, 'mamamama4');
                                    pop.push(responseJson[i]);
                                    nob[uo].push(responseJson[i]);
                                    uo = uo + 1;
                                    //console.log(uo, 'mamamama3')
                                } else {
                                    //console.log(responseJson[i], 'mamamama37');
                                    //console.log(i, 'mamamama378');

                                    nob[uo].push(responseJson[i]);
                                    //console.log(nob[0], 'mamamama377');

                                }
                            } else {
                                if (responseJson[i].order_number !== responseJson[i + 1].order_number) {
                                    //console.log(responseJson[i].order_number, 'mamamama4');
                                    pop.push(responseJson[i]);
                                    nob[uo].push(responseJson[i]);
                                    uo = uo + 1;
                                    //console.log(uo, 'mamamama3')
                                } else {
                                    //console.log(responseJson[i], 'mamamama37');
                                    //console.log(i, 'mamamama378');

                                    nob[uo].push(responseJson[i]);
                                    //console.log(nob[0], 'mamamama377');

                                }
                            }


                        }
                        if (pop.length === 0) {
                            pop.push(responseJson[0]);
                        }

                        let kon = [];
                        const kol = pop.length;
                        const jok = nob.length;

                        for (let i = kol; i < jok; i++) {
                            nob.splice(i)
                        }


                        //console.log(nob, 'sdhjdwhkjdwhjkwwsss');
                        //console.log(kon, 'mamamama4s23');
                        //console.log(pop, 'sdhjdwhkjdwhjkww231');
                        let xx= JSON.parse(store[2][1]);
                        let yy= JSON.parse(store[3][1]);
                        let ll= JSON.parse(store[4][1]);
                        console.log(ll, 'mamamama4s23');


                        const ds = new ListView.DataSource({
                            rowHasChanged: (r1, r2) => r1 !== r2,
                            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
                            getRowData: (dataBlob, sectionID, rowID) => xx[sectionID][rowID],
                            getSectionHeaderData: (dataBlob, sectionID) => yy[sectionID]
                        });
                        this.setState({
                            list: responseJson,
                            dataSource: ds.cloneWithRowsAndSections(xx),
                            dv: false,
                            isLoading: false,
                            hope:ll

                        })

                    }


                    }
                else {
                    console.log('salam');
                    this.forceFetchHistory(aan)


                }
            })




    }

    whichGel(id) {

        //console.log(parseInt(id), 'koakokoaokaoksoqo2');

        let r = parseInt(id) + 1;

        if (this.state.list.length - 1 >= r) {

            let r = parseInt(id) + 1;
            let a = this.state.list[id];
            let b = this.state.list[r.toString()];
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
        let sis = this.state.list;
        const hth = this.state.list[id].order_number;
        const ghoo = sis.filter(x => x.order_number === hth);

        let hyh = 0;
        const e = ghoo.length;

        for (let i = 0; i < e; i++) {
            const fff = parseInt(ghoo[i].order_price) * parseInt(ghoo[i].order_mount);
            hyh = hyh + fff;
        }

        let y = sis[id].date;
        let yyy = new Date(sis[id].date);
        // // let moment = require('moment-jalaali');
        // let m= moment(yyy.getTime()).format('YYYY/MM/jDD');
        // // //console.log(m,'ssssssssssss');
        // // let moment = require('moment-jalaali');
        // let rrr=moment(yyy.getTime()).format('jYYYY/jM/jD');
        // //console.log(yyy.getTime(),'gqgqgqgfgfrfrwww');

        return (
            <View style={{
                alignItems: 'center',
                flexDirection: 'row',
                height: 30,
                flex: 1,
                backgroundColor: 'red',
                borderColor: 'white'
            }}>
                <Button
                    onPress={() => this.setState({modalVisible: true})}
                    style={sis[id].situation === '1' ? {height: 30, width: 90} : {height: 0, width: 0}}>
                    <Text>تحویل داده شد</Text>
                </Button>
                <View style={{width: '35%', flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'B Koodak', margin: 1}}>{sis[id].orderer_phone}</Text>
                </View>
                <View style={{width: '35%', flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'B Koodak', marginRight: 3, marginLeft: 3}}>تاریخ</Text>
                </View>


                <View style={{width: '30%', flexDirection: 'row', justifyContent: 'center'}}>

                    <Text style={{marginRight: 3, marginLeft: 3}}>{sis[id].order_number}</Text>
                </View>
            </View>
        )
    }

    setRankDeli() {

        let selectedFormat = "YYYY-MM-DD";
        //console.log('dkfjdlf',this.state.user);
        // let moment = require('moment-jalaali');
        let rrr=moment().format(selectedFormat);
        setTimeout(() => {

            this.setState({dv: false});
        }, 5000);
        this.setState({modalVisible: false, dv: true});
        let pp = {
            phone: this.state.delPhone,
            rate: this.state.starCount,
            order_number: this.state.delOrdernumber,
            del_date:rrr,
            provider: this.state.user

        };
        console.log(pp, 'fff222888');
            try {
                fetch('http://visitou.ir/api/setRankDel.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pp)
                }).then((response) => {
                    console.log( response, 'fff222777');

                    let aan = {pro: this.state.user};

                    this.forceFetchHistory(aan)

                });
            }
            catch(err){
                console.log(err,'fff222www')
            }



    }

    gohgoh(op) {
        //console.log(op, 'bfjdshfbdhfb')
    }

    abbrNum2(number, decPlaces) {
        // 2 decimal places => 100, 3 => 1000, etc
        decPlaces = Math.pow(10, decPlaces);

        // Enumerate number abbreviations
        var abbrev = [" k", " m", " b", " t"];

        // Go through the array backwards, so we do the largest first
        for (var i = abbrev.length - 1; i >= 0; i--) {

            // Convert array index to "1000", "1000000", etc
            var size = Math.pow(10, (i + 1) * 3);

            // If the number is bigger or equal do the abbreviation
            if (size <= number) {
                // Here, we multiply by decPlaces, round, and then divide by decPlaces.
                // This gives us nice rounding to a particular decimal place.
                number = Math.round(number * decPlaces / size) / decPlaces;

                // Handle special case where we round up to the next abbreviation
                if ((number == 1000) && (i < abbrev.length - 1)) {
                    number = 1;
                    i++;
                }

                // Add the letter for the abbreviation
                number += abbrev[i];

                // We are done... stop
                break;
            }
        }

        return number;
    }
    async getStar(pp){
        let response = await fetch(
            'http://visitou.ir/api/getUserInfo.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pp)
            }
        );
        const json = await response.json();
        return json;
    }

    newsolu(id,sectionID){
        let yuyy = this.state.hope;
        // console.log(yuyy[sectionID][0].total,'kqkqkqkqkq');
        console.log(sectionID,id,'kqkqkqkqkq');
        // console.log(yuyy[sectionID][1].jooni,'kqkqkqkqkq');
        let jjj = '';
        let selectedFormat = "jDD-jMM-jYYYY";
        let outputFormat = "YYYY-MM-DD";
        if (id.delivery_date) {
            jjj = moment(id.delivery_date, outputFormat).format("jYYYY-jMM-jDD");

        } else {
            jjj = moment().format("jYYYY-jMM-jDD");

        }

       let rrr = moment(id.date, outputFormat).format(selectedFormat);
      let  ddd = moment().format("YYYY-MM-DD");


        return (


            <View style={{flexDirection: 'row', backgroundColor: '#DADFE1', width: '100%', marginTop: 20}}>

                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 7
                }}>
                    <StarRating
                        disabled={true}
                        halfStarEnabled={true}
                        maxStars={5}
                        rating={ yuyy[sectionID][3].rate ? parseFloat(yuyy[sectionID][3].rate) : console.log(rrr,'asaa')}
                        starSize={23}
                        iconSet={'FontAwesome'}
                        fullStarColor='#F9BF3B'
                        halfStar={'star-half-o'}
                        emptyStarColor="#F9BF3B"


                    />
                    <Text style={{width: '25%', color: 'black', fontFamily: 'B Koodak', fontSize: 23, margin: 7}}>
                        {yuyy[sectionID][2].vote ? yuyy[sectionID][2].vote + ' ' + 'رای' :'0'+ ' ' + 'رای'} </Text>

                </View>
                <View style={{
                    width: '95%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 20
                }}>

                    <Text style={{

                        fontFamily: 'B Koodak',
                        marginTop: 5,
                        textAlign: 'center',
                        color: "#F89406"
                    }}>{yuyy[sectionID][1].jooni + ' ' + 'تومان'}</Text>
                    <Text style={{

                        fontFamily: 'B Koodak',
                        marginTop: 5,
                        textAlign: 'center',
                        color: "#F89406"
                    }}>{'مجموع' + ' ' + 'مبلغ:'}</Text>
                    <TouchableWithoutFeedback
                        onPress={() => id.situation === '1' ? this.setState({
                            modalVisible: true,
                            delPhone: id.orderer_phone,
                            delOrdernumber: id.order_number
                        }) : null}>
                        <View
                            style={id.situation === '1' ? styles.buttonDelYes : id.situation === '2' ? styles.buttonDelNo : styles.buttonDelCan}>
                            <View style={{flexDirection:'column',margin:5}}>
                                <Text
                                    style={id.situation === '1' ? styles.txtDelYes : id.situation === '2' ? styles.txtDelNo : styles.txtDelCan}>
                                    {id.situation === '1' ? 'تحویل سفارش' : id.situation === '2' ? 'تحویل داده شد' : 'کنسل شد'}
                                </Text>
                                <Text
                                    style={id.situation === '1' ? styles.txtDelYes : id.situation === '2' ? styles.txtDelNo : styles.txtDelCan}>
                                    {id.situation === '1' ? '' : id.situation === '2' ? jjj : ''}
                                </Text>
                            </View>
                        </View>

                    </TouchableWithoutFeedback>

                </View>
                <View style={{flexDirection: 'row'}}>

                    <View >
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
                        width: '25%',
                        textAlign: 'center',
                        fontSize:10,

                        fontFamily: 'B Koodak'
                    }}>{'وضعیت محصول'}</Text>
                    <Right style={{width: '80%'}}>
                        <View style={{flexDirection: 'row'}}>


                            <Text style={{
                                width: '30%',
                                fontFamily: 'B Koodak',
                                fontSize:10,
                                textAlign: 'center',
                                paddingRight: 20,
                                backgroundColor: 'white'
                            }}>{'قیمت واحد'}</Text>
                            <Text style={{
                                width: '15%',
                                fontSize:10,

                                fontFamily: 'B Koodak',
                                textAlign: 'center',
                                paddingRight: 20,
                                backgroundColor: 'white'
                            }}>{'تعداد'}</Text>
                            <Text style={{
                                width: '20%',
                                fontSize:10,

                                fontFamily: 'B Koodak',
                                textAlign: 'center',
                                paddingRight: 20,
                                backgroundColor: 'white'
                            }}>{'نوع'}</Text>

                            <Text style={{
                                backgroundColor: 'white',
                                width: '30%',
                                fontSize:10,

                                marginRight: 20,
                                fontFamily: 'B Koodak'
                            }}>{'نام محصول'}</Text>
                        </View>
                    </Right>


                </View>
            </View>


        )
    }

     hello(id,sectionID) {
        let goop = this.state.rateArray;
        console.log('Hi...i Called...');
        let kooni=0;
         let rrr='';
         let ddd = '';
         let anbarghi={};
         let chos = this.state.anbarghi;
         AsyncStorage.getItem('userInfoDownloded',(err,store)=>{
             let j = JSON.parse(store);

             let rate_result = j.filter(x => x.phonenumber === id.orderer_phone)
             fgf[sectionID]=rate_result[0];
             console.log(Math.round(fgf[sectionID].user_rate * 10) / 10,sectionID,'whatshouldIdo?')


         });



            let pp = {phone: id.orderer_phone};

                    console.log(this.state.anbarghi,'lalalala');
                     // this.setState({khodChos:fgf});
         // anbarghi.push(fgf[sectionID]);
         //        anbarghi.push(fgf[sectionID]);
         //        let chos = this.state.anbarghi;
         //        chos.push(fgf[sectionID]);
         //        this.setState({anbarghi:chos});



         // anbarghi.push({rate: parseInt(responseJson[0].user_rate), vote: responseJson[0].user_vote});
                         let r = this.state.list;
                        let yyyyyy = this.state.simple;
                        console.log(anbarghi,'fff2221212');
                        console.log(fgf.length,'fff2221212');


                        let ghoo = r.filter(x => x.order_number === id.order_number);
                        for (let i = 0; i < ghoo.length; i++) {
                            kooni = kooni + ghoo[i].order_mount * ghoo[i].order_price
                        }



                        let factor = id.orderer_phone;
                        let yyy = new Date(id.date);
                        let selectedFormat = "jDD-jMM-jYYYY";
                        let outputFormat = "YYYY-MM-DD";
                        // let moment = require('moment-jalaali');
                        //console.log(id.delivery_date, 'ddddkfjhdkj');
                        let jjj = '';
                        if (id.delivery_date) {
                            jjj = moment(id.delivery_date, outputFormat).format("jYYYY-jMM-jDD");

                        } else {
                            jjj = moment().format("jYYYY-jMM-jDD");

                        }

                         rrr = moment(id.date, outputFormat).format(selectedFormat);
                         ddd = moment().format("YYYY-MM-DD");




         // //console.log(fgf[sectionID], 'llllllllkjjjjj33');



            // console.log(gg,'fff222qqq');


         return (


            <View style={{flexDirection: 'row', backgroundColor: '#DADFE1', width: '100%', marginTop: 20}}>

                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 7
                }}>
                    <StarRating
                        disabled={true}
                        halfStarEnabled={true}
                        maxStars={5}
                        rating={fgf[sectionID] ? Math.round(fgf[sectionID].user_rate * 10) / 10 : console.log(anbarghi,'asaa')}
                        starSize={23}
                        iconSet={'FontAwesome'}
                        fullStarColor='#F9BF3B'
                        halfStar={'star-half-o'}
                        emptyStarColor="#F9BF3B"


                    />
                    <Text style={{width: '25%', color: 'black', fontFamily: 'B Koodak', fontSize: 23, margin: 7}}>
                        {fgf[sectionID] ? fgf[sectionID].user_vote + ' ' + 'رای' :'0'+ ' ' + 'رای'} </Text>

                </View>
                <View style={{
                    width: '95%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 20
                }}>

                    <Text style={{

                        fontFamily: 'B Koodak',
                        marginTop: 5,
                        textAlign: 'center',
                        color: "#F89406"
                    }}>{kooni + ' ' + 'تومان'}</Text>
                    <Text style={{

                        fontFamily: 'B Koodak',
                        marginTop: 5,
                        textAlign: 'center',
                        color: "#F89406"
                    }}>{'مجموع' + ' ' + 'مبلغ:'}</Text>
                    <TouchableWithoutFeedback
                        onPress={() => id.situation === '1' ? this.setState({
                            modalVisible: true,
                            delPhone: id.orderer_phone,
                            delOrdernumber: id.order_number
                        }) : null}>
                        <View
                        style={id.situation === '1' ? styles.buttonDelYes : id.situation === '2' ? styles.buttonDelNo : styles.buttonDelCan}>
                        <View style={{flexDirection:'column',margin:5}}>
                        <Text
                            style={id.situation === '1' ? styles.txtDelYes : id.situation === '2' ? styles.txtDelNo : styles.txtDelCan}>
                            {id.situation === '1' ? 'تحویل سفارش' : id.situation === '2' ? 'تحویل داده شد' : 'کنسل شد'}
                        </Text>
                        <Text
                            style={id.situation === '1' ? styles.txtDelYes : id.situation === '2' ? styles.txtDelNo : styles.txtDelCan}>
                            {id.situation === '1' ? '' : id.situation === '2' ? jjj : ''}
                        </Text>
                        </View>
                        </View>

                    </TouchableWithoutFeedback>

                </View>
                <View style={{flexDirection: 'row'}}>

                    <View >
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
                        width: '25%',
                        textAlign: 'center',
                        fontSize:10,

                        fontFamily: 'B Koodak'
                    }}>{'وضعیت محصول'}</Text>
                    <Right style={{width: '80%'}}>
                        <View style={{flexDirection: 'row'}}>


                            <Text style={{
                                width: '30%',
                                fontFamily: 'B Koodak',
                                fontSize:10,
                                textAlign: 'center',
                                paddingRight: 20,
                                backgroundColor: 'white'
                            }}>{'قیمت واحد'}</Text>
                            <Text style={{
                                width: '15%',
                                fontSize:10,

                                fontFamily: 'B Koodak',
                                textAlign: 'center',
                                paddingRight: 20,
                                backgroundColor: 'white'
                            }}>{'تعداد'}</Text>
                            <Text style={{
                                width: '20%',
                                fontSize:10,

                                fontFamily: 'B Koodak',
                                textAlign: 'center',
                                paddingRight: 20,
                                backgroundColor: 'white'
                            }}>{'نوع'}</Text>

                            <Text style={{
                                backgroundColor: 'white',
                                width: '30%',
                                fontSize:10,

                                marginRight: 20,
                                fontFamily: 'B Koodak'
                            }}>{'نام محصول'}</Text>
                        </View>
                    </Right>


                </View>
            </View>


        )

    }

    render() {
        function shest(uiui) {
            AsyncStorage.setItem('selectedHeader', JSON.stringify(uiui.header_name));
            //console.log(uiui.header_name, 'qwerty');
            return (
                Actions.category({title: uiui.header_name})
            )


        }

        if (this.state.isLoading) {
            return (
                <Container style={{flex: 1, paddingTop: 20}}>
                    <Content>
                    <ActivityIndicator />
                    </Content>
                    <AppFooter/>
                </Container>
            );
        }
        if (this.state.list.length === 0 && this.state.isLoading === false) {
            return (
                <Container style={{flex: 1, paddingTop: 20}}>
                    <Content>
                    <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontFamily:'B Koodak'}}>سابقه تراکنش ندارید</Text>
                    </View>
                    </Content>
                    <AppFooter/>
                </Container>
            );
        }
        const {navigate} = this.props.navigation;
        let width = Dimensions.get('window').width; //full width

        return (

            <Container  >
                <ProgressDialog
                    visible={this.state.dv}
                    title="ثبت تحویل"
                    message="لطفا صبر کنید..."
                />
                <Modal
                    style={{justifyContent: 'center', alignItems: 'center'}}
                    visible={this.state.modalVisible}>
                    <View style={{
                        flexDirection: 'column',
                        width:'80%',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderRadius: 7,
                        borderWidth: 2,
                        borderColor: '#D2D7D3',
                        alignItems: 'center',

                    }}>
                        <Text style={{fontSize: 19, fontFamily: 'B Koodak', marginTop: 10}}>به این مشتری چه امتیازی می
                            دهید؟</Text>
                        <StarRating
                            starStyle={{width:'100%',marginTop:30}}
                            disabled={false}
                            maxStars={5}
                            starSize={23}
                            rating={this.state.starCount}
                            emptyStarColor='grey'
                            fullStarColor="#F9BF3B"
                            selectedStar={(rating) => this.setState({starCount: rating})}
                        />
                        <View style={{flexDirection: 'row', marginBottom: 10, marginTop: 30,marginRight:10,marginLeft:10}}>
                            <TouchableWithoutFeedback
                                onPress={() => this.setState({modalVisible: false})}>
                                <View
                                style={{
                                    marginLeft: 10,
                                    marginRight: 5,
                                    borderRadius:3,
                                    width: '50%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#E87E04'
                                }}>
                                <Text style={{textAlign:'center',color:'white',alignItems:'center',fontFamily: 'B Koodak'}}>
                                    انصراف
                                </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={() => this.setRankDeli()}>
                                <View
                                style={{
                                    marginRight: 10,
                                    marginLeft: 5,
                                    borderRadius:3,
                                    width: '50%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#2ECC71'
                                }}>
                                    <Text style={{textAlign:'center',color:'white',alignItems:'center',fontFamily: 'B Koodak'}}>
                                    ثبت تحویل
                                </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                    </View>

                </Modal>

                        <ListView
                            style={{width: width, backgroundColor: '#00000000'}}
                            dataSource={this.state.dataSource}
                            enableEmptySections={true}
                            initialListSize={2}
                            stickySectionHeadersEnabled={true}
                            renderSectionHeader={(section, sectionID) =>

                                this.newsolu(section, sectionID)
                            }
                            renderRow={(rowData, rowID, sectionID) =>
                                <View style={{
                                    flexDirection: 'row', backgroundColor: 'white'
                                    , justifyContent: 'center', alignItems: 'center', height: 80
                                }}>
                                    <View style={{
                                        width: '25%',
                                        backgroundColor: 'white',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Icon5
                                            name={rowData.situation === '1' ? 'truck' : rowData.situation === '2' ? 'check' : 'close' }
                                            color={rowData.situation === '1' ? '#22A7F0' : rowData.situation === '2' ? 'green' : 'red' }
                                            size={25}/>
                                    </View>
                                    <Right style={{width: '80%'}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={{
                                                fontFamily: 'B Koodak',
                                                width: '30%',
                                                textAlign: 'center',
                                                paddingRight: 20
                                            }}>{rowData.order_price}</Text>
                                            <Text style={{
                                                fontFamily: 'B Koodak',
                                                width: '15%',
                                                textAlign: 'center',
                                                paddingRight: 20
                                            }}>{rowData.order_mount}</Text>
                                            <Text style={{
                                                fontFamily: 'B Koodak',
                                                width: '20%',
                                                textAlign: 'center',
                                                paddingRight: 20
                                            }}>{rowData.model_details}</Text>
                                            <Text style={{
                                                fontFamily: 'B Koodak',
                                                width: '30%',
                                                marginRight: 20
                                            }}>{rowData.order_name}</Text>

                                        </View>
                                    </Right>
                                </View>
                            }

                        />




                <AppFooter/>
            </Container>
        );

    }

}

module.export = Header_cat;