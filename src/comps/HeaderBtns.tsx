import {TouchableOpacity} from "react-native"
import React from 'react'
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import SCREEN_NAME from "../vars/SCREEN_NAME";

const ICON_SIZE = 27

export const SettingBtn = () => {
    const navigation = useNavigation();
    return <TouchableOpacity onPress={() => {
        navigation.navigate(SCREEN_NAME.SETTING)
    }}>
        <Feather name="settings" size={ICON_SIZE} color="black"/>
    </TouchableOpacity>
}

export const ScanBtn = () => {
    const navigation = useNavigation();
    return <TouchableOpacity onPress={() => {
        navigation.navigate(SCREEN_NAME.SCAN)
    }}>
        <MaterialCommunityIcons name="qrcode-scan" size={24} color="black"/>
    </TouchableOpacity>
}

export const ListBtn = () => {
    const navigation = useNavigation();
    return <TouchableOpacity onPress={() => {
        navigation.navigate(SCREEN_NAME.LIST)
    }}>
        <Feather name="shopping-cart" size={24} color="black"/>
    </TouchableOpacity>
}