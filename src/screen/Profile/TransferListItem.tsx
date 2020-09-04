import React from "react";
import {Caption, List} from "react-native-paper";
import {TransferType} from "../../types/types";
import { MaterialIcons } from '@expo/vector-icons';

const TransferListItem = ({item}: { item: TransferType }) => {
    const isUp = !(item?.amount.toString().includes('-'));
    const icon = (props:any)=> isUp ?
        <MaterialIcons name="attach-money" size={24} color={'green'} /> :
        <MaterialIcons name="money-off" size={24} {...props}  />
    return <List.Item
        title={(isUp ? '+' : '') + item.amount}
        description={'Итог: ' + item?.balance}
        left={(props: any) => <List.Icon {...props} icon={icon}/>}
        right={(props: any) => <List.Icon {...props} icon={()=><Caption>{item?.username}</Caption>}/>}
    />
}
export default TransferListItem