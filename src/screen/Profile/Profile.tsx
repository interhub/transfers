import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Avatar, Caption, Headline} from "react-native-paper";
import {SimpleLineIcons} from "@expo/vector-icons";
import {StackNavigationProp} from "@react-navigation/stack";
import {ResponseGetTransferList, StateType, TransferType} from "../../types/types";
import API from "../../config/API";
import BalanceCard from "./BalanseCard";
import TransferList from "./TranferList";
import Message from "../../comps/Message";
import {useSelector} from "react-redux";

export default function Profile({navigation}: { navigation: StackNavigationProp<any> }) {
    const {user} = useSelector<StateType, StateType>((state => state))


    if (!user?.name) {
        return null
    }

    return <View style={styles.container}>
        <View style={styles.row}>
            <Avatar.Icon style={{backgroundColor: '#eee'}}
                         size={150}
                         icon={(props) => <SimpleLineIcons name="user-following"  {...props} size={50}/>}/>
            <View style={{alignItems: 'flex-end', paddingRight: 20}}>
                <Headline>
                    {user?.name}
                </Headline>
                <Caption>{user?.email}</Caption>
            </View>
        </View>
        <BalanceCard balance={user?.balance}/>
        <TransferList navigation={navigation} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    }
})