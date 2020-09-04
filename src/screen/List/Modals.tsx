import {LayoutAnimation, StyleSheet, View} from "react-native";
import {Modalize} from "react-native-modalize";
import React, {RefObject, useState} from "react";
import {ResponseGetUser, ResponseTransferCreate, UserItemType} from "../../types/types";
import {Avatar, Button, Caption, Headline, TextInput} from "react-native-paper";
import {MaterialIcons, SimpleLineIcons} from '@expo/vector-icons';
import API from "../../config/API";
import Message from "../../comps/Message";
import {useDispatch} from "react-redux";
import {setUserAction} from "../../store/actions";

export default ({modalizeRef, item}: { modalizeRef: RefObject<any>, item: UserItemType }) => {

    const [openTransfer, setOpenTransfer] = useState(false);
    const [amount, setAmount] = useState(0);
    const dispatch = useDispatch()
    const sendMoney = async () => {
        if (!amount) {
            return Message('Не корректная сумма')
        }
        const result: boolean = await API.createTransfer({name: item?.name, amount})
            .then((data: ResponseTransferCreate) => {
                if (data?.message) {
                    Message(data?.message)
                    return false
                }
                return true
            })
            .catch((e) => {
                Message(e.messages)
                return false
            })
        if (result) {
            await API.getUserInfo()
                .then((data: ResponseGetUser) => {
                    if (data?.message) {
                        Message(data?.message)
                    }
                    if(data.user_info_token){
                        dispatch(setUserAction(data.user_info_token))
                    }
                })
                .catch((e) => {
                    Message(e.messages)
                })
        }
        modalizeRef.current?.close();
        Message('Успешно')
    }

    return <Modalize
        onClose={() => {
            setOpenTransfer(false)
        }}
        adjustToContentHeight
        ref={modalizeRef}>
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Avatar.Icon style={{backgroundColor: '#eee'}} size={150}
                             icon={(props) => <SimpleLineIcons name="user-following"  {...props} size={50}/>}/>
                < Headline>{item?.name}</Headline>
            </View>
            <View>
                <Caption>Выберите дейтсвие</Caption>
                <Button
                    onPress={() => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                        setOpenTransfer(!openTransfer)
                    }}
                    labelStyle={{width: '100%'}}
                    mode={'outlined'}>
                    {openTransfer ? 'Введите данные' : 'Перевод'}
                </Button>
            </View>
            {openTransfer &&
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 80}}>
                <View style={{flex: 4}}>
                    <TextInput
                        onChangeText={(text) => {
                            setAmount(parseFloat(text))
                        }}
                        style={{backgroundColor: '#f5f5f5'}}
                        label={'Сумма'}
                        mode={'outlined'}
                        keyboardType={'number-pad'}
                    />
                </View>
                <View style={{flex: 1}}>
                    <Button
                        compact
                        style={{borderRadius: 20, margin: 5}}
                        onPress={sendMoney}
                    >
                        <MaterialIcons name="send" size={24} color="black"/>
                    </Button>
                </View>
            </View>}
        </View>
    </Modalize>
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
})