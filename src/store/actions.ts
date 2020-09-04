import ACTION_NAME from "./ACTION_NAME";
import {THEME_NAME} from "../config/THEME";
import {AsyncStorage} from "react-native";
import STORE_NAME from "../vars/STORE_NAME";
import {TokenType, UserType} from "../types/types";


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

export interface setUserActionType {
    type: typeof ACTION_NAME.SET_USER
    user: UserType
}

export const setUserAction = (user: UserType): setUserActionType => {
    return {
        type: ACTION_NAME.SET_USER,
        user
    };
};

export interface setTokenActionType {
    type: typeof ACTION_NAME.SET_TOKEN
    token: TokenType
}

export const setTokenAction = (token: TokenType): setTokenActionType => {
    token ? AsyncStorage.setItem(STORE_NAME.TOKEN, token) : AsyncStorage.removeItem(STORE_NAME.TOKEN)
    return {
        type: ACTION_NAME.SET_TOKEN,
        token
    };
};




