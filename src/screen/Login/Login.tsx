import {LayoutAnimation, StyleSheet, View} from "react-native";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import API from "../../config/API";
import {ResponseGetToken} from "../../types/types";
import {Button, Paragraph, TextInput, Title} from "react-native-paper";
import Message from "../../comps/Message";
import {setTokenAction} from "../../store/actions";
import {AntDesign} from '@expo/vector-icons';

const Login = () => {
    const dispatch = useDispatch()
    const [input, setInput] = useState<{ email: string, password: string }>({password: '', email: ''});
    const [signIn, setSignIn] = useState<boolean>(true);
    const [username, setUsername] = useState<string>('');
    const validate = (): boolean => {
        if (!signIn) {
            if (!username) {
                Message('Введите имя пользователя')
                return false
            }
        }
        if (signIn) {
            if (!input.email) {
                Message('Введите почту')
                return false
            }
            if (!input.password) {
                Message('Введите пароль')
                return false
            }
        }
        return true
    }
    const SignInAction = () => {
        API.loginUserSession(input)
            .then((data: ResponseGetToken) => {
                if (data?.message) {
                    Message(data.message)
                }
                dispatch(setTokenAction(data?.id_token))
            })
            .catch((e) => {
                Message(e.message)
            })
    }
    const SignUpAction = () => {
        API.registrationUser({...input, username})
            .then((data: ResponseGetToken) => {
                if (data?.message) {
                    Message(data.message)
                }
                dispatch(setTokenAction(data?.id_token))
            })
            .catch((e) => {
                Message(e.message)
            })
    }
    const onClickBtn = () => {
        if (!validate()) {
            return
        }
        signIn ? SignInAction() : SignUpAction()
    }

    const changeType = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setSignIn(!signIn)
    }

    return <View style={styles.container}>
        <View style={{flex: 1}}>
            {!signIn && <Title>Регистрация</Title>}
            <View style={signIn ? {height: 0, overflow: 'hidden'} : {}}>
                <TextInput onChangeText={(username) => {
                    setUsername(username)
                }} label={'Имя пользователя'} style={styles.textInput}/>
            </View>
            <TextInput onChangeText={(email) => {
                setInput({...input, email})
            }} label={'Почта'} style={styles.textInput}/>
            <TextInput onChangeText={(password) => {
                setInput({...input, password})
            }} secureTextEntry label={'Пароль'} style={styles.textInput}/>
            <Paragraph onPress={changeType} style={styles.signInTitle}>{!signIn ? 'Назад' : 'Регистрация'}</Paragraph>
            <Button
                mode={'outlined'}
                style={styles.btn}
                onPress={onClickBtn}
                compact
                icon={(props: any) => <AntDesign name="right" size={54} {...props} />}
            >
            </Button>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        flex: 1,
        padding: 30
    },
    textInput: {
        marginVertical: 10,
        backgroundColor: '#e7e7e7'
    },
    signInTitle: {
        textDecorationLine: 'underline',
        color: '#4f729b'
    },
    btn: {
        marginTop: 50
    }
})
export default Login