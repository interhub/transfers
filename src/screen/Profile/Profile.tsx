import React, {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Avatar, Caption, Headline} from "react-native-paper";
import {SimpleLineIcons} from "@expo/vector-icons";
import {StackNavigationProp} from "@react-navigation/stack";
import {ResponseGetTransferList, ResponseGetUser, TransferType, UserType} from "../../types/types";
import API from "../../config/API";
import BalanceCard from "./BalanseCard";
import TransferList from "./TranferList";
import Message from "../../comps/Message";

export default function Profile({navigation}: { navigation: StackNavigationProp<any> }) {
    const [user, setUser] = useState<UserType | null>(null);
    const [transferList, setTransferList] = useState<TransferType[]>([]);
    const getUserAndSet = () => {
        API.getUserInfo()
            .then((data: ResponseGetUser) => {
                if (data.message) {
                    return Message(data.message)
                }
                setUser(data.user_info_token)
            })
            .catch((e) => {
                Message(e.message)
            })
        API.getListTransfers()
            .then((data: ResponseGetTransferList) => {
                if (data.message) {
                    return Message(data.message)
                }
                setTransferList(data.trans_token)
            })
            .catch((e) => {
                Message(e.message)
            })
    }
    useEffect(() => {
        getUserAndSet()
        return navigation.addListener('focus', () => {
            getUserAndSet()
        })
    }, [])

    if (!user) {
        return null
    }

    return <View style={styles.container}>
        <View style={styles.row}>
            <Avatar.Icon style={{backgroundColor: '#eee'}}
                         size={150}
                         icon={(props) => <SimpleLineIcons name="user-following"  {...props} size={50}/>}/>
            <View style={{alignItems: 'flex-end'}}>
                <Headline>
                    {user?.name}
                </Headline>
                <Caption>{user?.email}</Caption>
            </View>
        </View>
        <BalanceCard balance={user?.balance}/>
        <TransferList list={[]}/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 10,
    },
    row: {
        flex:1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    }
})