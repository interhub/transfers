import {FlatList, Text, View} from "react-native";
import React from 'react'
import {TransferType} from "../../types/types";
import {Caption, List, Subheading} from "react-native-paper";
import TransferListItem from "./TransferListItem";

const TransferList = ({list,}: { list: TransferType[] }) => {
    return <View style={{flex:2}}>
        <FlatList
            ListHeaderComponent={()=>{
                return <Caption>Последние операции</Caption>
            }}
            ListEmptyComponent={()=>{
                return <Caption >Отсутствуют</Caption>
            }}
            data={list}
            renderItem={({item, index}) => {
                return <TransferListItem item={item} />
            }}/>
    </View>
}
export default TransferList