import {View} from "react-native";
import React, {useEffect} from "react";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {StateType} from "../types/types";
import SCREEN_NAME from "../vars/SCREEN_NAME";

export default ()=>{
    const navigation = useNavigation();

    const {token} = useSelector<StateType, StateType>((state => state))
    useEffect(()=>{
        if(token){
            navigation.navigate(SCREEN_NAME.PROFILE)
        }
    },[token])
    return <View/>
}