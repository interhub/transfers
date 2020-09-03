import {ActivityIndicator, StyleSheet, View} from "react-native";
import React from "react";
import {useSelector} from 'react-redux'
import {StateType} from "../types/types";

const HEIGHT_LOADER = 30;
export default () => {
    const {load} = useSelector<StateType, StateType>((state => state))
    if (!load) {
        return null
    }
    return <View style={{
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 155000,
    }}>
        <ActivityIndicator size="large" color={'#4c229b'}/>
    </View>
}
