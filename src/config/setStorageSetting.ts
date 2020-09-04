import store from '../store/store'
import {StateType} from "../types/types";
import {setLoadAction, setThemeAction} from "../store/actions";
import {AsyncStorage} from "react-native";
import STORE_NAME from "../vars/STORE_NAME";
import THEME, {THEME_NAME} from "./THEME";
export default async ()=>{
    //START
    store.dispatch(setLoadAction(true))
    //SET THEME
    let {theme: theme_name}:StateType=store.getState()
    let theme: THEME_NAME = <THEME_NAME>(await AsyncStorage.getItem(STORE_NAME.THEME)) || theme_name
    store.dispatch(setThemeAction(theme))
    //SET LOGIN

    //END
    store.dispatch(setLoadAction(false))
}
