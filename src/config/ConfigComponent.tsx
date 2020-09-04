import {useDispatch} from "react-redux";
import React, {useEffect} from "react";
import store from "../store/store";
import {setLoadAction, setThemeAction, setUserAction} from "../store/actions";
import {ResponseGetUser, StateType} from "../types/types";
import {THEME_NAME} from "./THEME";
import {AsyncStorage} from "react-native";
import STORE_NAME from "../vars/STORE_NAME";
import API from "./API";
import Message from "../comps/Message";

export default () => {
    const dispatch = useDispatch()
    const startLoadStore = async () => {
        dispatch(setLoadAction(true))
        let {theme: theme_name}: StateType = store.getState()
        let theme: THEME_NAME | any = (await AsyncStorage.getItem(STORE_NAME.THEME)) || theme_name
        dispatch(setThemeAction(theme))
        dispatch(setLoadAction(false))
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
            await startLoadStore()
            await getServerData()
        })()
    }, [])
    return null
}