import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, List} from 'react-native-paper';
import ShareCode from "./ShareCode";
import storeTool from "../../vars/storeTool";
import Message from '../../comps/Message';
import {useNavigation} from "@react-navigation/native";
import {THEME_NAME} from "../../config/THEME";
import {useDispatch} from 'react-redux';
import {setThemeAction} from "../../store/actions";
import {Feather, Ionicons} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function Setting() {


    const [openNum, setOpenNum] = useState(0);
    const deleteAll = () => {
        storeTool.clearList()
            .then(() => {
                Message('Успешно удалено')
            })
    }

    const navigation = useNavigation();
    const dispatch = useDispatch()
    useEffect(() => {
        navigation.addListener('blur', () => {
            setOpenNum(0)
        })
    }, [])

    const changeTheme = (theme_name: THEME_NAME) => {
        dispatch(setThemeAction(theme_name))
    }

    return (
        <View
            style={{flex: 1,}}>
            <List.Section title="Параметры">
                <List.Accordion
                    title="О приложении"
                    expanded={openNum === 1}
                    onPress={() => {
                        setOpenNum(openNum === 1 ? 0 : 1)
                    }}
                    left={(props: any) => <List.Icon {...props}
                                                     icon={() => <Feather name="info" {...props} size={25}/>}/>}>
                    <List.Item title="Версия 0.0.1 от 04.09.2020"/>
                </List.Accordion>

                <List.Accordion
                    title="Сменить цветовую тему"
                    left={(props: any) => <List.Icon {...props} icon={
                        () => <Ionicons name="ios-color-wand" {...props} size={24}/>}/>}
                    expanded={openNum === 2}
                    onPress={() => {
                        setOpenNum(openNum === 2 ? 0 : 2)
                    }}>
                    <List.Item onPress={() => changeTheme(THEME_NAME.LIGHT)} title="Светлая"/>
                    <List.Item onPress={() => changeTheme(THEME_NAME.DARK)} title="Темная"/>
                </List.Accordion>
                <List.Accordion
                    title="Выйти из аккаунта"
                    left={(props: any) => <List.Icon {...props}
                                                     icon={() => <MaterialIcons name="exit-to-app" {...props} size={24} />}/>}
                    expanded={openNum === 3}
                    onPress={() => {
                        setOpenNum(openNum === 3 ? 0 : 3)
                    }}>
                    <Button
                        onPress={deleteAll}
                    >Выход</Button>
                </List.Accordion>
            </List.Section>
        </View>
    );
}