import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import store from "../store/store";
import {setLoadAction, setThemeAction, setTokenAction, setUserAction} from "../store/actions";
import {ResponseGetUser, StateType} from "../types/types";
import {THEME_NAME} from "./THEME";
import {AsyncStorage} from "react-native";
import STORE_NAME from "../vars/STORE_NAME";
import API from "./API";
import Message from "../comps/Message";

export default () => {
    const dispatch = useDispatch()
    const {token} = useSelector<StateType, StateType>((state => state))
    const startLoadStore: () => Promise<boolean> = async () => {
        //START
        dispatch(setLoadAction(true))
        //GET THEME
        const {theme: theme_name}: StateType = store.getState()
        const theme: THEME_NAME | any = (await AsyncStorage.getItem(STORE_NAME.THEME)) || theme_name
        dispatch(setThemeAction(theme))
        //GET TOKEN
        const token = (await AsyncStorage.getItem(STORE_NAME.TOKEN)) || ''
        console.warn('TOKEN', token)
        dispatch(setTokenAction(token))
        //END
        dispatch(setLoadAction(false))
        return !!token;
    }
    const getServerData = async () => {
        await API.getUserInfo()
            .then((data: ResponseGetUser) => {
                if (data.message) {
                    return Message(data.message)
                }
                dispatch(setUserAction(data.user_info_token))
            })
            .catch((e) => {
                Message(e.message)
            })
    }
    useEffect(() => {
        (async () => {
            const readyToken: boolean = await startLoadStore()
            if (readyToken) {
                await getServerData()
            }
        })()
    }, [token])
    return null
}