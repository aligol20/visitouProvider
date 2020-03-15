import React, {Component} from 'react';
import {StyleSheet, AsyncStorage,TouchableHighlight, ActivityIndicator, Alert, Dimensions,renderRow,ListView,View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Ionicons';
import moment from 'moment-jalaali';

import {
    Container, Button, Header,
    List, ListItem, Toast, Root, Right, Text, Left, Thumbnail, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
export default class OrderHistory extends Component {
    constructor(props) {
        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            asb: [],
            isLoading: true,
            info: [],
            dataSource: dss.cloneWithRows([]),
            list: [],
            totalList:[],
            lenghttt:0,

        }

    }

    getData() {
        try {
            AsyncStorage.getItem('userInfo', (err, store) => {
                //console.log(JSON.parse(store)[0].phone, 'mahnazparivash899999');
                let pop = JSON.parse(store)[0].phone;
                let aani = [{mobile: pop}];
                this.setState({info: JSON.parse(store)});

                if (pop !== null) {
                    //console.log(JSON.stringify(aani), 'mahnazparivash10');

                    let test = fetch('http://visitou.ir/api/readPurchaseHistory.php', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(aani)
                    }).then((response) => this.arrangePurchaseHistory(JSON.parse(response._bodyInit)));

                } else {

                }


            });

        }
        catch (error) {
            //console.log(error);
            Toast.show({
                text: 'Wrong password!',
                position: 'bottom',
                buttonText: 'Okay'
            })
        }

    }

    arrangePurchaseHistory(data) {
        //console.log(data,'jajajaja878788787878');
        let ede = [];
        for (let i=0;i<=10;i++){
            ede.push(data[i])
        }

        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.setState({
            list: ede,
            totalList:data,
            lenghttt: data.length,
            isLoading: false,
            dataSource: dss.cloneWithRows(ede.map(function (itit) {
                return (
                    itit
                )
            })),
        })

    }

    componentDidMount() {

        this.getData();

        Toast.toastInstance = null;

    }

    signOut() {
        Alert.alert(
            'خروج از حساب ...',
            'آیا مطمین هستید؟',
            [
                {text: 'آره', onPress: () => this.signHimOut()},
                {text: 'نه', onPress: () =>null} //console.log('Cancel Pressed'), style: 'cancel'},

            ],
            {cancelable: false}
        );

    }

    signHimOut() {
        AsyncStorage.removeItem('userInfo');
        Actions.feed();
    }
    whichGel(id){

        //console.log(parseInt(id),'koakokoaokaoksoqo2');

        let r=parseInt(id)+1;

        if(this.state.list.length-1>=r) {

            let r=parseInt(id)+1;
            let a=this.state.list[id];
            let b=this.state.list[r.toString()];
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
        let sis=this.state.list;
        const hth=this.state.list[id].order_number;
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
                <Text style={{fontFamily:'B Koodak',margin:1}}>{hyh+' '+'تومان'}</Text>
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
    kalak(id){
        //console.log(parseInt(id),'koakokoaokaoksoqo');
    }
    loadMore(){
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        const lenght=this.state.list.length;
        const totalLenght = this.state.totalList.length;
        const list= this.state.totalList;
        let added=[];
        let mnm = lenght+10;
        if(mnm<totalLenght){
            for (let i=0;i<mnm;i++){
                added.push(list[i])
            }
        }
        //console.log(added,'mqmqmqmqmq');
        this.setState({
            list: added,
            dataSource:  dss.cloneWithRows(added.map(function (itit) {
                return (
                    itit
                )
            }))
        })


    }
    situ(row){
        //console.log(row,'kjkjkkjk');
        switch (row.situation){
            case '0':
                return (
                    <Icon3 style={{marginLeft:10}}
                               name='md-time'
                               color='blue'
                                size={23}
                />
                );
            break;
            case '1':
                return (
                    <Icon3 style={{marginLeft:10}}
                           name='md-close'
                           color='red'
                           size={23}
                    />
                );
            break;
            case '2':
                return (
                    <Icon3 style={{marginLeft:10}}
                           name='md-checkmark'
                           color='green'
                           size={23}
                    />
                );
            break;
        }
    }
    col(row){
        switch (row.situation){
            case 0:
                return 'blue';
                break;
            case 1:
                return 'red';
                break;
            case 2:
                return 'green';
                break;
        }
    }
    render() {
        let moz = [];


        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        let width = Dimensions.get('window').width; //full width
        //console.log('mahnazmahnaz', moz);

        return (

                <Container >
                    <View style={{
                        backgroundColor: 'white',
                        borderRadius: 10, marginTop: 10, marginBottom: 10, marginRight: 10, marginLeft: 10
                    }}>
                        <Right style={{width: width, marginRight: 40, marginTop: 15}}>


                            <View style={{justifyContent:'center',flexDirection: 'row', alignItems: 'center', flex: 1, marginBottom: 20,backgroundColor:'white'}}>
                                <Text style={{fontFamily:'B Koodak',fontSize: 23}}>{this.state.info[0].name+' '+this.state.info[0].family}</Text>
                            </View>
                            <Text style={{fontSize: 19,fontFamily:'B Koodak'}}>{this.state.info[0].phone}</Text>

                        </Right>
                        <Button style={{
                            backgroundColor: 'white', marginBottom: 10, marginLeft: 10
                            , borderWidth: 2, borderRadius: 7, borderColor: '#EF4836'
                        }}
                                onPress={() => this.signOut()}>
                            <Icon2 style={{marginLeft: 5}} name='log-out' color="red" size={27}/>
                            <Text style={{fontFamily:'B Koodak',color:'#EF4836'}}>خروج از حساب </Text>
                        </Button>

                    </View>

                    <Content>
                    <ListView
                        style={{width: width, backgroundColor: '#00000000'}}
                        dataSource={this.state.dataSource}
                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>  this.whichGel(rowID)}
                        initialListSize={4}
                        onEndReached={null}//console.log('finishid')}
                        renderRow={(rowData, rowID, sectionID) =>
                        <View style={{
                            backgroundColor: '#00000000',
                            width: width
                        }}>


                                        <View style={{
                                            marginBottom: 5,
                                            marginRight: 5,
                                            marginTop: 5,
                                            marginLeft: 5,
                                            borderRadius: 7,
                                            backgroundColor: 'white',
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignItems:'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            {this.situ(rowData)}









                                            <Text style={{fontFamily:'B Koodak',
                                                marginBottom: 10, marginTop: 10,
                                                color: '#19B5FE'
                                            }}>
                                                {rowData.order_mount}

                                            </Text>

                                            <Text style={{width:'30%',textAlign:'center',
                                                marginBottom: 10,fontFamily:'B Koodak', marginTop: 10, color: '#1F3A93',

                                            }}>
                                                {rowData.order_price * rowData.order_mount + ' '+'تومان'}
                                            </Text>
                                            <Text style={{width:'20%',textAlign:'center',fontFamily:'B Koodak',
                                                alignItems: 'center', margin: 10, color: '#34495E',marginBottom:5,marginTop:5,
                                            }}>
                                                {rowData.provider_details}

                                            </Text>

                                                <Text style={{width:'20%',textAlign:'right',fontFamily:'B Koodak',
                                                    alignItems: 'center', marginRight: 10, color: '#34495E'
                                                }}>
                                                    {rowData.order_name}

                                                </Text>




                                        </View>








                            </View>
                        }/>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                            <TouchableHighlight
                                onPress={()=>this.loadMore()}
                                underlayColor='white'>
                                <Text style={{color:'#22A7F0',fontFamily: 'B Koodak'}}>قدیمی تر</Text>
                            </TouchableHighlight>
                        </View>
                    </Content>

                </Container>

        );

    }
}

module.export = OrderHistory;