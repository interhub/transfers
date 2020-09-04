import React from 'react';
import {Platform, UIManager, View} from 'react-native';
import {Provider, useSelector} from "react-redux";
import store from "./src/store/store";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getHeaderOptions, getHeaderStyle, optionAnimationLeft} from "./src/vars/navigateConfig";
import SCREEN_NAME from "./src/vars/SCREEN_NAME";
import List from "./src/screen/List/List";
import {StateType} from "./src/types/types";
import Setting from "./src/screen/Setting/Setting";
import {BalanseBtn, ListBtn, ProfileBtn, SettingBtn, TitleAppBtn} from './src/comps/HeaderBtns'
import Loader from './src/comps/Loader';
import Profile from "./src/screen/Profile/Profile";
import {Provider as PaperProvider} from 'react-native-paper';
import THEME, {THEME_NAME} from "./src/config/THEME";
import ConfigComponent from "./src/config/ConfigComponent";
import Login from "./src/screen/Login/Login";
import Empty from "./src/comps/Empty";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Stack = createStackNavigator();

function App() {
    const {theme: theme_name, token, load} = useSelector<StateType, StateType>((state => state))
    const theme: any = THEME[theme_name] || THEME[THEME_NAME.LIGHT]
    const readyUser = !!token
    const onlyLogin = !token && !load

    return (
        <NavigationContainer theme={theme}>
            <PaperProvider theme={theme}>
                <Stack.Navigator>
                    {onlyLogin && <Stack.Screen
                        name={SCREEN_NAME.LOGIN}
                        component={Login}
                        options={{
                            ...getHeaderOptions(
                                () => <TitleAppBtn/>,
                                null,
                                null
                            ),
                            ...optionAnimationLeft(true),
                            ...getHeaderStyle()
                        }}/>}
                    {readyUser && <>
                        <Stack.Screen
                            name={SCREEN_NAME.PROFILE}
                            component={Profile}
                            options={{
                                ...getHeaderOptions(
                                    () => <SettingBtn/>,
                                    () => <ListBtn/>,
                                    null
                                ),
                                ...optionAnimationLeft(true),
                                ...getHeaderStyle()
                            }}/>
                        <Stack.Screen
                            name={SCREEN_NAME.LIST}
                            component={List}
                            options={{
                                ...getHeaderOptions(
                                    () => <SettingBtn/>,
                                    () => <ProfileBtn/>,
                                    () => <BalanseBtn/>
                                ),
                                ...optionAnimationLeft(true),
                                ...getHeaderStyle()
                            }}/>
                        <Stack.Screen
                            name={SCREEN_NAME.SETTING}
                            component={Setting}
                            options={{
                                ...getHeaderOptions(
                                    () => <ListBtn/>,
                                    () => <ProfileBtn/>,
                                    null
                                ),
                                ...optionAnimationLeft(true),
                                ...getHeaderStyle()
                            }}/>
                    </>}
                    {!onlyLogin && <Stack.Screen
                        name={SCREEN_NAME.EMPTY}
                        component={Empty}
                        options={{
                            ...optionAnimationLeft(false),
                        }}/>}
                </Stack.Navigator>
                <Loader/>
                <ConfigComponent/>
            </PaperProvider>
        </NavigationContainer>

    );
}

export default () =>
    <Provider store={store}>
        <App/>
    </Provider>


