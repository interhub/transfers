import {FlatList, View} from "react-native";
import React, {useEffect, useState} from 'react'
import {ResponseGetTransferList, TransferType} from "../../types/types";
import {Caption} from "react-native-paper";
import TransferListItem from "./TransferListItem";
import API from "../../config/API";
import Message from "../../comps/Message";
import {StackNavigationProp} from "@react-navigation/stack";

const TransferList = ({navigation}: { navigation: StackNavigationProp<any> }) => {

    const [list, setTransferList] = useState<TransferType[]>([]);
    const getListAndSet = async () => {
        await API.getListTransfers()
            .then((data: ResponseGetTransferList) => {
                if (data.message) {
                    return Message(data.message)
                }
                setTransferList(data.trans_token?.reverse() || [])
            })
            .catch((e) => {
                Message(e.message)
            })
    }
    useEffect(() => {
        getListAndSet()
        return navigation.addListener('focus', () => {
            getListAndSet()
        })
    }, [])


    return <View style={{flex: 2}}>
        <FlatList
            ListHeaderComponent={() => {
                return <Caption>Последние операции</Caption>
            }}
            ListEmptyComponent={() => {
                return <Caption>Отсутствуют</Caption>
            }}
            data={list}
            renderItem={({item, index}) => {
                return <TransferListItem item={item}/>
            }}/>
    </View>
}
export default TransferList