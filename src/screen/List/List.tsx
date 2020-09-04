import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {StateType, UserItemType} from "../../types/types";
import {Button, List} from "react-native-paper";
import SCREEN_NAME from "../../vars/SCREEN_NAME";
import ListItem from '../../comps/Listitem';
import {useDispatch, useSelector} from "react-redux";
import {setLoadAction} from "../../store/actions";
import {Modalize} from "react-native-modalize";
import Modals from "./Modals";

const testArray: UserItemType[] = new Array(20).fill(1).map((el, id) => ({name: 'Mike', id}))

export default function ListTovars() {
    const {load} = useSelector<StateType, StateType>((state => state))
    const [list, setList] = useState<UserItemType[]>([]);
    const [openItem, setOpenItem] = useState<UserItemType>({id: 0, name: ''});
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const getAndSetList = async () => {
        dispatch(setLoadAction(true))
        // setList(await storeTool.getList())
        setList(testArray)
        dispatch(setLoadAction(false))
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
            {list.length > 0 && <FlatList data={list} renderItem={
                ({index, item}) => {
                    return <ListItem item={item}  onOpen={onOpen}/>
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