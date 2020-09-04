import ACTION_NAME from "./ACTION_NAME";
import {THEME_NAME} from "../config/THEME";
import {AsyncStorage} from "react-native";
import STORE_NAME from "../vars/STORE_NAME";


export interface setLoadActionType {
    type: typeof ACTION_NAME.SET_LOAD
    load: boolean
}

export const setLoadAction = (load: boolean = false): setLoadActionType => {
    return {
        type: ACTION_NAME.SET_LOAD,
        load
    };
};

export interface setThemeActionType {
    type: typeof ACTION_NAME.SET_THEME
    theme: THEME_NAME
}

export const setThemeAction = (theme: THEME_NAME): setThemeActionType => {
    AsyncStorage.setItem(STORE_NAME.THEME, theme)
    return {
        type: ACTION_NAME.SET_THEME,
        theme
    };
};

