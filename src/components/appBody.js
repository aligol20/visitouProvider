import React, {Component} from 'react';
import AppBodyData from '../components/appBodyData';

import { StyleSheet, Content, ListView,} from 'react-native';
export default class AppBody extends Component {

    constructor(props) {

        super(props);

        this.state = {

            isLoading: true,
            text: '',

        }

        this.arrayholder = [];
    }

    componentDidMount() {
        // this.GetData();
        // this.WhatToDo('0');
        //  this.SearchFilterFunction('0');


    }

    GetData() {

        return fetch('http://koalafruit.com/api/readProducts.php')
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson),
                }, function () {

                    // In this block you can do something with new state.
                    this.arrayholder = responseJson;
                    var Emam = [];

                    for (i = 0; i < responseJson.length; i++) {
                        if(responseJson.unitprice.indexOf(i) !== 'no'){
                            Emam.name[i]=responseJson.product_name.indexOf(i);

                        }
                    }



                });
            })
            .catch((error) => {
                //console.error(error);
            });
    }







    render() {


        return (


                <AppBodyData/>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {

        justifyContent: 'center',
        flex: 1,
        margin: 7,

    },

    rowViewContainer: {
        fontSize: 17,
        padding: 10
    },

    TextInputStyleClass: {

        textAlign: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 7,
        backgroundColor: "#FFFFFF"

    }

});

module.export = AppBody;
