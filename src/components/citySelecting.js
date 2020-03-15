import React, {Component} from 'react';
import {
    Container, Button, Header, Item, Input,
     List, ListItem, Text,Right, Thumbnail, View, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
import {TextInput,AsyncStorage,StatusBar,ActivityIndicator,Dimensions,renderRow,ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Modal from "react-native-modal";
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import Icon from 'react-native-vector-icons/Ionicons'
import RNExitApp from 'react-native-exit-app-no-history';
import {ProgressDialog} from 'react-native-simple-dialogs';



export default class CitySelecting extends Component {
    constructor(props) {

        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            isLoading: true,

            rrr: '123',
            selectedCat: '',
            dataSource: dss.cloneWithRows([]),
            city: [],
            item: '',
            asb: [],
            waiting:false,
        };
        // this.getProductList();
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
        //console.log('salma','hfjjghjgjhgjfjf');

            fetch('http://visitou.ir/api/readCity.php')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        city: responseJson,
                        isLoading: false,
                        dataSource: dss.cloneWithRows(responseJson.map(function (itit) {
                            return (
                                itit
                            )
                        })),
                    });
                    // AsyncStorage.setItem('cityList', JSON.stringify(responseJson));

                    //console.log(responseJson, 'hfjjghjgjhgjfjf')

                });

        // AsyncStorage.getItem('cityList',(err,stores)=>{
        //     let r = JSON.parse(stores);
        //     const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //     //console.log(r,'aqaqaqaq5');
        //     this.setState({
        //         city: r,
        //         isLoading: false,
        //         dataSource: dss.cloneWithRows(r.map(function (itit) {
        //             return (
        //                 itit
        //             )
        //         })),
        //     });
        //
        //
        //
        // });
        //console.log(this.state.dataSource,'rtrtrtrt');

    }
    componentDidMount() {
        return fetch('http://visitou.ir/api/readCity.php')
            .then((response) => response.json())
            .then((responseJson) => {
                AsyncStorage.setItem('cityList', JSON.stringify(responseJson));
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson.map(function (rfr) {
                        return rfr
                    })),
                }, function() {
                    // do something with new state
                });
            })
            .catch((error) => {
                //console.error(error);
            });


    }

    onSelect(sec){

        if(value==='alphabet'){
            //console.log(value,'itsalphabet');
            this.setState({isLoading:true,modalVisibility:false,sortedBy:'حروف الفبا'});
            this.getProductList()
        }else {
            this.setState({isLoading:true,modalVisibility:false});
            this.getProductListSorted(value);
        }



    }
     shest(sec,uiui) {
        this.setState({waiting:true});
        let rrr=this.state.city;

         let pp = {city: uiui};
         //console.log(pp,'alalalalal2');
         fetch('http://visitou.ir/api/readProducts_offer_new.php', {
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(pp)
         }).then((response) => response.json())
             .then((responseJson) => {
             //console.log(rrr[sec],'alalalalal3');
                 AsyncStorage.setItem('wherewhere',uiui);

                 AsyncStorage.setItem('offerList', JSON.stringify(responseJson));

             }
         );

         fetch('http://visitou.ir/api/readProducts_new.php', {
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(pp)
         }).then((response) => response.json())
             .then((responseJson) => {
                 AsyncStorage.setItem('allProducts', JSON.stringify(responseJson));

             //console.log(responseJson, 'nananana2');
             this.setState({waiting:false});
                 Actions.feed()
         }
         );




    }
    render() {

        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        const {navigate} = this.props.navigation;
        let width = Dimensions.get('window').width; //full width

        return (
            <Container >

                <ProgressDialog
                    visible={this.state.waiting}
                    title="ثبت شهر شما ..."
                    message="لطفا صبر کنید"
                />
                    <View style={{

                        flexDirection: 'row',
                        justifyContent: 'center',
                        height:50,
                        backgroundColor:'#1c375c'
                    }}>


                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{
                                fontFamily: 'B Koodak',

                                fontSize: 23, marginTop: 5, color: 'white',
                            }}>انتخاب شهر</Text>

                        </View>
                        <View/>
                    </View>
                <Content>
                    <Item  style={{
                        backgroundColor: 'white',borderRadius:7,
                        marginLeft: 10, marginRight: 10, marginTop: 10,marginBottom:20,
                    }}>
                        <Icon name="ios-search-outline"
                              size={27}
                              style={{marginLeft: 5}}/>
                        <Input placeholder="شهرتان را بیابید"
                               style={{width:'100%',justifyContent:'flex-end',
                                   backgroundColor:'white',

                                   fontFamily: 'B Koodak',
                               }}
                               onChangeText={(value => this.searchMe(value))}/>
                    </Item>
                    {this.state.isLoading && (
                        <ActivityIndicator
                            style={{ height: 80 }}
                            color="#6C7A89"
                            size="small"
                        />
                    )}
                    <ListView

                        style={{ backgroundColor: '#00000000'}}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, rowID, sectionID) =>
                            <Button
                                onPress={()=>this.shest(sectionID,rowData.city_en)}
                                style={{width:'100%',alignItems:'center',justifyContent:'flex-end',backgroundColor:'white'}}>
                                <Text style={{
                                    fontFamily: 'B Koodak',
                                    color:'black',textAlign:'center'}}>{rowData.city_name}</Text>

                            </Button>
                        }/>
                </Content>
                <Button
                    style={{backgroundColor:'white',borderRadius:0,width:'100%',justifyContent:'center'}}
                    onPress={()=>RNExitApp.exitApp()}>
                    <Text style={{color:'red'}}>فعلا نه</Text>
                </Button>
            </Container>
        );

    }
}
module.export = CitySelecting;