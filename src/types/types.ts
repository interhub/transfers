import {setLoadActionType, setThemeActionType, setUserActionType} from "../store/actions";
import {THEME_NAME} from "../config/THEME";

export type StateType = {
    load: boolean
    theme: THEME_NAME
    token: TokenType
    user: UserType
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


export type UserType = {
    "id": number
    "name": string
    "email": string
    "balance": number
}

export type UserItemType = {
    id: number
    name: string
}

export type TransferType = {
    id: number
    date: string
    username: string
    amount: number
    balance: number
}

//response
export type ErrMessage = {message: string}
export type ResponseGetUser = {
    user_info_token: UserType
} & ErrMessage

export type ResponseGetUserList = UserItemType[] & ErrMessage

export type ResponseGetTransferList = {
    trans_token: TransferType[]
} & ErrMessage

export type ResponseTransferCreate={
    trans_token: TransferType
}& ErrMessage


//store
export type ActionTypes =
    setLoadActionType |
    setThemeActionType |
    setUserActionType