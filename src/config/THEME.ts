import {DarkTheme, DefaultTheme} from "@react-navigation/native";
import {DefaultTheme as PaperDefaultTheme} from 'react-native-paper'

export enum THEME_NAME {
    DARK = 'DARK',
    LIGHT = 'LIGHT'
}

export default {
    [THEME_NAME.DARK]: {
        ...PaperDefaultTheme,
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            primary: 'rgb(116,156,184)',
            card: 'rgb(255, 255, 255)',
            text: 'rgb(165,165,165)',
            border: 'rgb(199, 199, 204)',
        },
    },
    [THEME_NAME.LIGHT]: {
        ...PaperDefaultTheme,
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: 'rgb(4,20,100)',
            card: 'rgb(255, 255, 255)',
            text: 'rgb(28, 28, 30)',
            border: 'rgb(199, 199, 204)',
        },
    }
}