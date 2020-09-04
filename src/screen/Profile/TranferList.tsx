import {FlatList, Text, View} from "react-native";
import React from 'react'
import {TransferType} from "../../types/types";
import {Caption, Subheading} from "react-native-paper";

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
                return <View style={{height:40}}>
                    <Text>{item?.balance}</Text>
                </View>
            }}/>
    </View>
}
export default TransferList