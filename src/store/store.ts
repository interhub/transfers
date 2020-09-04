import {createStore} from 'redux';
import {ActionTypes, StateType} from "../types/types";
import state from './state';
import ACTION_NAME from "./ACTION_NAME";
import {Reducer} from "react";

const reducer: Reducer<any, ActionTypes> = (state: StateType, action: ActionTypes): StateType => {
    switch (action.type) {
        case ACTION_NAME.SET_LOAD:
            return {...state, load: action.load};
        case ACTION_NAME.SET_THEME:
            return {...state, theme: action.theme};
        default:
            return {...state};
    }
};

export default createStore(reducer, state);
