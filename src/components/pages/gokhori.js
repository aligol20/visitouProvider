import React, {Component} from 'react';
import {Text, AsyncStorage} from 'react-native';
import IconBadge from 'react-native-icon-badge';
import {Actions} from 'react-native-router-flux';
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon5 from 'react-native-vector-icons/FontAwesome'
import {Footer, FooterTab, Badge, Button, View, Icon} from 'native-base';
let badgNumber;

export default class AppFooter extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            koooni: 0,
            activeTabName: 'feed',
            nameUser: 'پروفایل ',
            isSignIn: '',
            fe: '#fdb913',
            ca: '#FDE3A7',
            se: '#FDE3A7',
            cgy: '#FDE3A7',
            ac: '#FDE3A7',


        }
    }

    componentDidMount() {

        // this.justForFun();
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
    }

    tabAction(tab) {
        this.setState({activeTabName: tab});

        switch (tab) {
            case 'feed':

                Actions.feed();
                break;
            case 'request':

                Actions.request();
                break;
            case 'search':

                Actions.search();
                break;
            case 'header':

                Actions.header();
                break;
            case 'me':

                Actions.me();
                break;

        }

    }

    whatToDo() {
        // AsyncStorage.getItem('userInfo',(err,store)=>{
        //     // //console.log(JSON.parse(store)[0].name,'mahnazparivash8');
        //     // let pop=JSON.parse(store)[0].phonenumber;
        //     if(JSON.parse(store)[0].phonenumber !== null){
        //         Actions.orderHistory();
        //     }else {
        //         Actions.account();
        //     }
        //     // Actions.account();
        //
        //
        //
        // });
        // try {
        //     AsyncStorage.getItem('userInfo', (err, store) => {
        //         //console.log(store, 'mahnazparivash19');
        //         if (store !== null) {
        //             //console.log(store, 'mahnazparivash17');
        //
        //             Actions.me()
        //         } else {
        //             //console.log(store, 'mahnazparivash18');
        //
        //             Actions.account()
        //
        //
        //         }
        //     });
        //
        // } catch (error) {
        //     // Error retrieving data
        // }
        Actions.me()
        //

    }
    isCartEmpty() {

        try {
            AsyncStorage.getAllKeys((err, keys) => {

                AsyncStorage.multiGet(keys, (err, stores) => {
                    //const ghgh=JSON.parse(stores);
                    stores.map((result, i, store) => {
                        // get at each store's key/value so you can work with it
                        let key = store[i][0];
                        let value = store[i][1];
                        let listArray = JSON.parse(value);
                        if (key.includes('order')) {
                            //console.log(store, 'aqaqaqaqaq');
                            this.tabAction('request');
                        } else {
                            //console.log(store, 'zxzxzxzxzxzx');
                            this.tabAction('empty');

                        }

                    });
                });

            });


        } catch (error) {
            // Error retrieving data
        }

    }



    render() {
        let gooz = [];
        AsyncStorage.getItem('orderMount',(err,store)=>{
            if(store) {
                badgNumber = JSON.parse(store)[0]["SUM(order_mount)"];
                //console.log('slkvkljd', badgNumber);
                if(badgNumber!==null) {
                    this.setState({koooni: 1})
                }
            }


        });

        let pp=Actions.currentScene;
        //console.log(pp,'kjfkdkfk');
        switch (pp){
            case 'feed':
                return (<Footer >
                    <FooterTab style={{backgroundColor: '#1c375c'}}>
                        <Button

                            onPress={() => this.tabAction('me')}>
                            <Icon4 color={'#FDE3A7'}
                                   name="account" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                        </Button>
                        <Button

                            onPress={() => this.tabAction('search')}>
                            <Icon5 color={'#FDE3A7'}
                                   name="bar-chart" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>گزارش مالی</Text>
                        </Button>
                        <Button

                            onPress={() => this.tabAction('header')}>
                            <Icon3 color={'#FDE3A7'}
                                   name="truck" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>سوابق</Text>
                        </Button>
                        <Button

                            onPress={() => this.tabAction('request')}>
                            <Icon4 color={'#FDE3A7'}
                                   name="playlist-check" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>درخواست ها</Text>
                        </Button>
                        <IconBadge

                            BadgeElement={
                                <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                            }
                            IconBadgeStyle={
                                {

                                    backgroundColor: '#F39C12',
                                    marginRight: 20,
                                    marginBottom: 5,
                                    marginTop: 3,
                                }
                            }
                            Hidden={this.state.koooni === 0}

                        />
                        <Button

                            onPress={() => this.tabAction('feed')}>
                            <Icon5 color={'#fdb913'}
                                   name="home" size={27}/>
                            <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>خانه</Text>
                        </Button>

                    </FooterTab>
                </Footer>);
                break;
            case 'request':
                return (<Footer >
                    <FooterTab style={{backgroundColor: '#1c375c'}}>
                        <Button

                            onPress={() => this.tabAction('me')}>
                            <Icon4 color={'#FDE3A7'}
                                   name="account" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                        </Button>

                        <Button

                            onPress={() => this.tabAction('search')}>
                            <Icon5 color={'#FDE3A7'}
                                   name="bar-chart" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>گزارش مالی</Text>
                        </Button>
                        <Button

                            onPress={() => this.tabAction('header')}>
                            <Icon3 color={'#FDE3A7'}
                                   name="truck" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>سوابق</Text>
                        </Button>

                        <Button

                            onPress={() => this.tabAction('request')}>
                            <Icon4 color={'#fdb913'}
                                   name="playlist-check" size={27}/>
                            <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>درخواست ها</Text>
                        </Button>
                        <IconBadge

                            BadgeElement={
                                <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                            }
                            IconBadgeStyle={
                                {

                                    backgroundColor: '#F39C12',
                                    marginRight: 20,
                                    marginBottom: 5,
                                    marginTop: 3,
                                }
                            }
                            Hidden={this.state.koooni === 0}

                        />
                        <Button

                            onPress={() => this.tabAction('feed')}>
                            <Icon5 color={'#FDE3A7'}
                                   name="home" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                        </Button>

                    </FooterTab>
                </Footer>);
                break;
            case 'me':
                return (<Footer >
                    <FooterTab style={{backgroundColor: '#1c375c'}}>
                        <Button

                            onPress={() => this.tabAction('me')}>
                            <Icon4 color={'#fdb913'}
                                   name="account" size={27}/>
                            <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                        </Button>

                        <Button

                            onPress={() => this.tabAction('search')}>
                            <Icon5 color={'#FDE3A7'}
                                   name="bar-chart" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>گزارش مالی</Text>
                        </Button>
                        <Button

                            onPress={() => this.tabAction('header')}>
                            <Icon3 color={'#FDE3A7'}
                                   name="truck" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>سوابق</Text>
                        </Button>

                        <Button

                            onPress={() => this.tabAction('request')}>
                            <Icon4 color={'#FDE3A7'}
                                   name="playlist-check" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>درخواست ها</Text>
                        </Button>
                        <IconBadge

                            BadgeElement={
                                <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                            }
                            IconBadgeStyle={
                                {

                                    backgroundColor: '#F39C12',
                                    marginRight: 20,
                                    marginBottom: 5,
                                    marginTop: 3,
                                }
                            }
                            Hidden={this.state.koooni === 0}

                        />
                        <Button

                            onPress={() => this.tabAction('feed')}>
                            <Icon5 color={'#FDE3A7'}
                                   name="home" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                        </Button>

                    </FooterTab>
                </Footer>);
                break;
            case 'search':
                return (<Footer >
                    <FooterTab style={{backgroundColor: '#1c375c'}}>
                        <Button

                            onPress={() => this.tabAction('me')}>
                            <Icon4 color={'#FDE3A7'}
                                   name="account" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                        </Button>
                        <Button

                            onPress={() => this.tabAction('search')}>
                            <Icon5 color={'#fdb913'}
                                   name="bar-chart" size={27}/>
                            <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>گزارش مالی</Text>
                        </Button>

                        <Button

                            onPress={() => this.tabAction('header')}>
                            <Icon3 color={'#FDE3A7'}
                                   name="truck" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>سوابق</Text>
                        </Button>

                        <Button

                            onPress={() => this.tabAction('request')}>
                            <Icon4 color={'#FDE3A7'}
                                   name="playlist-check" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>درخواست ها</Text>
                        </Button>
                        <IconBadge

                            BadgeElement={
                                <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                            }
                            IconBadgeStyle={
                                {

                                    backgroundColor: '#F39C12',
                                    marginRight: 20,
                                    marginBottom: 5,
                                    marginTop: 3,
                                }
                            }
                            Hidden={this.state.koooni === 0}

                        />
                        <Button

                            onPress={() => this.tabAction('feed')}>
                            <Icon5 color={'#FDE3A7'}
                                   name="home" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                        </Button>

                    </FooterTab>
                </Footer>);
                break;
            case 'loginFirst':
                return (
                    <View >

                    </View>);
                break;
            case 'header':
                return (<Footer >
                    <FooterTab style={{backgroundColor: '#1c375c'}}>
                        <Button

                            onPress={() => this.tabAction('me')}>
                            <Icon4 color={'#FDE3A7'}
                                   name="account" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>{this.state.nameUser}</Text>
                        </Button>

                        <Button

                            onPress={() => this.tabAction('search')}>
                            <Icon5 color={'#FDE3A7'}
                                   name="bar-chart" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>گزارش مالی</Text>
                        </Button>
                        <Button

                            onPress={() => this.tabAction('header')}>
                            <Icon3 color={'#fdb913'}
                                   name="truck" size={27}/>
                            <Text style={{color: '#fdb913',fontFamily:'B Koodak'}}>سوابق</Text>
                        </Button>

                        <Button

                            onPress={() => this.tabAction('request')}>
                            <Icon4 color={'#FDE3A7'}
                                   name="playlist-check" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>درخواست ها</Text>
                        </Button>
                        <IconBadge

                            BadgeElement={
                                <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'B Koodak'}}>{badgNumber}</Text>
                            }
                            IconBadgeStyle={
                                {

                                    backgroundColor: '#F39C12',
                                    marginRight: 20,
                                    marginBottom: 5,
                                    marginTop: 3,
                                }
                            }
                            Hidden={this.state.koooni === 0}

                        />
                        <Button

                            onPress={() => this.tabAction('feed')}>
                            <Icon5 color={'#FDE3A7'}
                                   name="home" size={27}/>
                            <Text style={{color: '#FDE3A7',fontFamily:'B Koodak'}}>خانه</Text>
                        </Button>

                    </FooterTab>
                </Footer>);
                break;
        }
    }
}

module.export = AppFooter;
