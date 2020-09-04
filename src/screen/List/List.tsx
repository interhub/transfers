import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {ResponseGetUserList, StateType, UserItemType} from "../../types/types";
import ListItem from './Listitem';
import {useDispatch, useSelector} from "react-redux";
import {Modalize} from "react-native-modalize";
import Modals from "./Modals";
import API from "../../config/API";
import Message from "../../comps/Message";

const testArray: UserItemType[] = new Array(20).fill(1).map((el, id) => ({name: 'Mike', id}))

export default function ListTovars() {
    const {load} = useSelector<StateType, StateType>((state => state))
    const [list, setList] = useState<UserItemType[]>([]);
    const [openItem, setOpenItem] = useState<UserItemType>({id: 0, name: ''});
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const getAndSetList = async () => {
        API.getUserListByString()
            .then((data: ResponseGetUserList) => {
                if (data.message) {
                    return Message(data.message)
                }
                setList(data)
            })
            .catch((e) => {
                Message(e.message)
            })
    }
    useEffect(() => {
        getAndSetList()
        navigation.addListener('focus', () => {
            getAndSetList()
        })
    }, [])

    const modalizeRef = useRef<Modalize>(null);
    const onOpen = (item: UserItemType) => {
        setOpenItem(item)
        modalizeRef.current?.open();
    };


    return (
        <View
            style={{flex: 1}}>
            <Modals item={openItem} modalizeRef={modalizeRef}/>
            {list.length > 0 && <FlatList
                data={list}
                renderItem={
                    ({index, item}) => {
                        return <ListItem
                            item={item}
                            onOpen={onOpen}/>
                    }}
                keyExtractor={(item) => String(item.id)}/>}
        </View>
    );
}
const styles = StyleSheet.create({
    btnNew: {
        margin: 20,
    }
})