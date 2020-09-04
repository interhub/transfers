import {StateType} from "../types/types";
import {THEME_NAME} from "../config/THEME";

const state: StateType = {
    load: false,
    theme: THEME_NAME.LIGHT,
    user: {
        balance: 0,
        email: '',
        id: 0,
        name: ''
    },
    token: ''
}

export default state