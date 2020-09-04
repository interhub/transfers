import {setLoadActionType, setThemeActionType} from "../store/actions";
import {THEME_NAME} from "../config/THEME";

export type StateType={
    load: boolean
    theme: THEME_NAME
}

export type TovarType = {
    id: number
    name: string
    price: number,
    about: string,
    made: string,
    create: number,
    uri: string
}

//data
export type TokenType = string


export type UserType ={
    "id": number
    "name": string
    "email": string
    "balance": number
}

export type UserItemType={
    id: number
    name: string
}

//respons
export type ResponseGetUser = {
    user_info_token: UserType
}


//store
export type ActionTypes=
    setLoadActionType |
    setThemeActionType