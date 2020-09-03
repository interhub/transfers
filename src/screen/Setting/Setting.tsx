import React, {useEffect, useState} from 'react';
import {AsyncStorage, View} from 'react-native';
import {Button, List} from 'react-native-paper';
import ShareCode from "./ShareCode";
import storeTool from "../../vars/storeTool";
import Message from '../../comps/Message';
import {useNavigation} from "@react-navigation/native";
import STORE_NAME from "../../vars/STORE_NAME";

export default function Setting() {

    const [openNum, setOpenNum] = useState(0);
    const deleteAll=()=>{
        storeTool.clearList()
            .then(()=>{
                Message('Успешно удалено')
            })
    }

    const navigation = useNavigation();
    useEffect(() => {
        navigation.addListener('blur',()=>{
            setOpenNum(0)
        })
    }, [])

    return (
        <View
            style={{flex: 1,}}>
            <List.Section title="Параметры">
                <List.Accordion
                    title="Поделиться данными"
                    expanded={openNum === 1}
                    onPress={() => {
                        setOpenNum(openNum === 1 ? 0 : 1)
                    }}
                    left={(props: any) => <List.Icon {...props} icon="folder"/>}>
                    <ShareCode/>
                </List.Accordion>

                <List.Accordion
                    title="Сменить цветовую тему"
                    left={(props: any) => <List.Icon {...props} icon="folder"/>}
                    expanded={openNum === 2}
                    onPress={() => {
                        setOpenNum(openNum === 2 ? 0 : 2)
                    }}>
                    <List.Item title="Опция в разработке"/>
                </List.Accordion>
                <List.Accordion
                    title="Удалить все"
                    left={(props: any) => <List.Icon {...props} icon="folder"/>}
                    expanded={openNum === 3}
                    onPress={() => {
                        setOpenNum(openNum === 3 ? 0 : 3)
                    }}>
                    <Button
                    onPress={deleteAll}
                    >Удалить</Button>
                </List.Accordion>
            </List.Section>
        </View>
    );
}