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
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InN0MiIsImVtYWlsIjoic3RlcGFuMUBtYWlsLnJ1IiwiaWQiOjMzLCJiYWxhbmNlIjo0NzksImlhdCI6MTU5OTIyOTA5MywiZXhwIjoxNTk5MjQ3MDkzfQ.EbcpPAnNdILZmsN38ooNkcrr3z0Hkk9w9IO823lPTEE'
}

export default state