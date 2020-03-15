import React, {Component} from 'react';
import {
    Container, Button, Header,
    Icon, List,ListItem, Text,Right, Thumbnail, View, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
import {AsyncStorage,ActivityIndicator,Dimensions,ScrollView,renderRow,ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Modal from "react-native-modal";
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'




export default class Category extends Component {
    constructor(props) {

        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dss2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            isLoading: true,
            asb: [],
            rrr: '123',
            selectedCat: '',
            dataSourceProducts: dss.cloneWithRows([]),
            dataSource: dss.cloneWithRows([]),
            list: [],
            listPro: [],
            modalVisibility:false,
            sortedBy:'',
        }

    }
    getProductList() {
        AsyncStorage.getItem('selectedHeader',(err,store) => {
            let y=JSON.parse(store);
            this.setState({selectedCat: y});
        });
        let uu=this.state.selectedCat;


        AsyncStorage.getItem('categoryList',(err,stores)=>{
            let r = JSON.parse(stores);
            let ghoo = r.filter(x => x.header_cat === this.state.selectedCat);
            const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

            this.setState({
                list: ghoo,
                dataSource: dss.cloneWithRows(ghoo.map(function (itit) {
                    return (
                        itit
                    )
                })),
            })

            //console.log(ghoo,'jajajajaja');


        });
        AsyncStorage.getItem('allProducts',(err,stores)=>{
            let r = JSON.parse(stores);
            let ghoo = r.filter(x => x.header_cat === this.state.selectedCat & x.unitprice !=='no');
            const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            //console.log(ghoo,'sdvggfgfg6');
            //console.log(r,'sdvggfgfg679999');
            //console.log(this.state.selectedCat,'sdvggfgfg6784444');

            this.setState({
                listPro: ghoo,
                isLoading: false,
                dataSourceProducts: dss.cloneWithRows(ghoo.map(function (itit) {
                    return (
                        itit
                    )
                })),
            })

            //console.log(ghoo,'jajajajaja');


        });

        //console.log(this.state.dataSource,'rtrtrtrt');

    }
    componentDidMount() {

        this.getProductList();

    }
    getProductListSorted(sortType) {
        AsyncStorage.getItem('selectedHeader',(err,store) => {
            let y=JSON.parse(store);
            this.setState({selectedCat: y});
        });
        let uu=this.state.selectedCat;


        AsyncStorage.getItem('categoryList',(err,stores)=>{
            let r = JSON.parse(stores);
            let ghoo = r.filter(x => x.header_cat === this.state.selectedCat);
            const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

            this.setState({
                list: ghoo,
                dataSource: dss.cloneWithRows(ghoo.map(function (itit) {
                    return (
                        itit
                    )
                })),
            })

            //console.log(ghoo,'jajajajaja');


        });
        AsyncStorage.getItem('allProducts',(err,stores)=>{
            let r = JSON.parse(stores);
            let ghoo = r.filter(x => x.header_cat === this.state.selectedCat & x.unitprice !=='no');
            const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            //console.log(ghoo,'sdvggfgfg6');
            //console.log(r,'sdvggfgfg679999');
            //console.log(this.state.selectedCat,'sdvggfgfg6784444');
            switch (sortType){
                case 'expensive':
                    ghoo.sort(function(a, b){return parseInt(b.unitprice) - parseInt(a.unitprice)});
                    this.setState({sortedBy:'گرانترین'});
                    break;
                case 'cheap':
                    ghoo.sort(function(a, b){return parseInt(a.unitprice) - parseInt(b.unitprice)});
                    this.setState({sortedBy:'ارزانترین'});

                    break;
            }
            this.setState({
                listPro: ghoo,
                isLoading: false,
                dataSourceProducts: dss.cloneWithRows(ghoo.map(function (itit) {
                    return (
                        itit
                    )
                })),
            });

            //console.log(ghoo,'jajajajaja');


        });

        //console.log(this.state.dataSource,'rtrtrtrt');

    }
    onSelect(index,value){

        if(value==='alphabet'){
            //console.log(value,'itsalphabet');
            this.setState({isLoading:true,modalVisibility:false,sortedBy:'حروف الفبا'});
            this.getProductList()
        }else {
            this.setState({isLoading:true,modalVisibility:false});
            this.getProductListSorted(value);
        }



    }
    render() {
        function shest(uiui) {
            AsyncStorage.setItem('selectedCategory',JSON.stringify(uiui));
            //console.log(uiui.cat_name,'qwerty');
            return(
                Actions.sub_cat({ title: uiui.cat_name })

            )


        }
        function goDetails(uiui) {
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
        const {navigate} = this.props.navigation;
        let width = Dimensions.get('window').width; //full width

        return (
            <Container >
                <View style={{alignItems:'center',flexDirection:'row',justifyContent:'flex-end',
                    height:37,backgroundColor:'white',marginBottom:13}}>

                    <Button
                        onPress={()=>this.setState({modalVisibility:true})}
                        style={{flex:1,alignItems:'center',justifyContent:'flex-end',backgroundColor:'#1c375c',borderRadius:0}}>
                        <Text style={{color:'white',fontFamily:'B Koodak',marginRight:2}}>{this.state.sortedBy}</Text>

                        <Text style={{color:'white',fontFamily:'B Koodak',marginRight:2}}>مرتب کردن براساس:</Text>
                        <Icon2 style={{marginRight: 5}}
                               name='sort'
                               color="white" size={25}
                        />
                    </Button>
                </View>
            <Content>
                <ListView
                    style={{width: width, backgroundColor: '#00000000'}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, rowID, sectionID) =>

                        <Button style={{
                            borderRadius: 5, flexDirection: 'row', backgroundColor: 'white'
                            , justifyContent: 'center', alignItems: 'center', margin: 2,height:60
                        }} onPress={() => shest(rowData)}>
                            <View style={{overflow: 'hidden',margin:10,borderRadius:7}}>
                                <Image
                                    component={Image}
                                    source={{ uri: rowData.cat_url,   cache: 'force-cache',
                                    }}
                                    indicator={Progress}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 7,
                                        backgroundColor: '#00000000'
                                    }}/>

                            </View>
                            <Right>
                                <View>

                                    <Text style={{margin: 10,fontFamily:'B Koodak'}}>{rowData.cat_name}</Text>


                                </View>
                            </Right>

                        </Button>
                    }/>
                <Right style={{width:width}}>
                    <Text style={{margin:10,textAlign:'right',fontFamily:'B Koodak'}}>محصولات موجود در گروه {this.state.selectedCat}</Text>
                </Right>
                <ListView
                    style={{width: width, backgroundColor: '#00000000'}}
                    dataSource={this.state.dataSourceProducts}
                    renderRow={(rowData, rowID, sectionID) =>

                        <View style={{
                            backgroundColor: '#00000000',
                            width: width
                        }}>


                            <Button style={{backgroundColor: 'white', height: 80,
                                marginBottom: 2,
                                marginRight: 5,
                                marginLeft:5}}
                                    onPress={() => goDetails(rowData)}>


                                <View style={{flex: 1, flexDirection: 'row',marginLeft:20}}>
                                    <View style={{ flexDirection: 'column'}}>
                                        <Text style={{color:'green',fontFamily:'B Koodak'}}>
                                            هر {rowData.orderunit}
                                        </Text>
                                        <Text style={{color:'green',fontFamily:'B Koodak'}}>
                                            {rowData.unitprice}
                                        </Text>
                                        <Text style={{color:'green',fontFamily:'B Koodak'}}>
                                            تومان
                                        </Text>

                                    </View>
                                    <Right>
                                        <Text style={{fontFamily:'B Koodak'}}>
                                            {rowData.product_name}

                                        </Text>
                                    </Right>
                                </View>
                                <View style={{overflow: 'hidden',margin:10,borderRadius:7}}>

                                    <Image
                                        source={{uri: rowData.small_image_link, cache: 'force-cache',}}
                                        indicator={Progress}


                                        style={{
                                            width:60,
                                            height:60,
                                            borderRadius:7,
                                            backgroundColor:'#00000000'}}/>
                                </View>
                            </Button>




                        </View>

                    }/>
                <Modal
                    swipeDirection="down"
                    animationInTiming={500}
                    style={{justifyContent:'center'}}
                    isVisible={this.state.modalVisibility}
                >
                    <View style={{ backgroundColor: 'white'}}>
                        <RadioGroup
                            size={24}
                            thickness={2}
                            color='#1c375c'
                            selectedIndex={this.state.indexRadio}
                            style={{flexDirection: 'column',backgroundColor:'white'}}
                            onSelect={(index, value) => this.onSelect(index, value)}
                        >
                            <RadioButton
                                value='alphabet'
                                color='#fdb913'
                            >

                                <Text style={{fontFamily:'B Koodak',color: '#22313F'}}>حروف الفبا</Text>
                            </RadioButton>
                            <RadioButton
                                value='expensive'
                                color='#fdb913'

                            >
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontFamily:'B Koodak',color: '#22313F'}}> گرانترین</Text>

                                </View>
                            </RadioButton>
                            <RadioButton
                                value='cheap'
                                color='#fdb913'

                            >
                                <Text style={{fontFamily:'B Koodak',color: '#22313F'}}>  ارزانترین</Text>
                            </RadioButton>

                        </RadioGroup>
                    </View>

                </Modal>
            </Content>
            </Container>
        );

    }
}
module.export = Category;