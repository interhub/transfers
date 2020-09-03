import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {StateType, TovarType} from "../../types/types";
import {Button, List} from "react-native-paper";
import SCREEN_NAME from "../../vars/SCREEN_NAME";
import ListItem from '../../comps/Listitem';
import {useDispatch, useSelector} from "react-redux";
import {setLoadAction} from "../../store/actions";
import {Modalize} from "react-native-modalize";
import Modals from "./Modals";
import storeTool from '../../vars/storeTool';
import Message from "../../comps/Message";

// const testArray = new Array(20).fill({
//     id: 1231,
//     name: 'Apple',
//     price: 234,
//     about: 'hello world',
//     made: 'hello world',
//     create: 1231423423423,
//     uri: 'https://frutstar.ru/image/catalog/fruits/yabloki.jpg'
// })
//     .map((el, key) => ({...el, key}))

export default function ListTovars() {
    const {load} = useSelector<StateType, StateType>((state => state))
    const [list, setList] = useState<TovarType[]>([]);
    const [openItem, setOpenItem] = useState<TovarType | any>({});
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const getAndSetList = async () => {
        console.warn('set')
        dispatch(setLoadAction(true))
        setList(await storeTool.getList())
        // setList(testArray)
        dispatch(setLoadAction(false))
    }
    useEffect(() => {
        getAndSetList()
        navigation.addListener('focus', () => {
            getAndSetList()
        })
        console.warn('use effect')
    }, [])

    const modalizeRef = useRef<Modalize>(null);
    const onOpen = (item: TovarType) => {
        setOpenItem(item)
        modalizeRef.current?.open();
    };
    const onDelete=(index:number)=>{
        dispatch(setLoadAction(true))
        storeTool.deleteByIndex(index)
            .then(()=>{
                modalizeRef.current?.close();
                Message('Успешно удалено')
                getAndSetList()
                    .then(()=>{
                        dispatch(setLoadAction(false))
                    })

            })
    }
    return (
        <View
            style={{flex: 1}}>
            <Modals item={openItem} modalizeRef={modalizeRef} onDelete={onDelete}/>
            {list.length > 0 && <FlatList data={list} renderItem={
                ({index, item}) => {
                    return <ListItem item={item} index={index} onOpen={onOpen}/>
                }}
                                          keyExtractor={(item) => String(item.id)}/>}
            {list.length === 0 && !load && <View>
                <List.Item style={{marginTop: 150}} title="Продукты отсутствуют"/>
                <Button
                    onPress={() => {
                        navigation.navigate(SCREEN_NAME.SCAN)
                    }}
                    style={styles.btnNew} mode={'contained'} labelStyle={styles.btnNew}>Добавить</Button>
            </View>}
        </View>
    );
}
const styles = StyleSheet.create({
    btnNew: {
        margin: 20,
    }
})