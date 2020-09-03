import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {useNavigation} from '@react-navigation/native';
import Loader from "../../comps/Loader";
import {WIDTH} from "../../vars/SIZE";

export default function App() {

    const navigation = useNavigation();

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
            }}>

        </View>
    );
}