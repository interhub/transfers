import {setLoadActionType} from "../store/actions";

export type StateType={
    load: boolean
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
    setLoadActionType