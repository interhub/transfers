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

export type ActionTypes=
    setLoadActionType