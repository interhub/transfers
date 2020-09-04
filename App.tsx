import React, {useEffect} from 'react';
import {Platform, UIManager} from 'react-native';
import {Provider, useSelector} from "react-redux";
import store from "./src/store/store";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getHeaderOptions, getHeaderStyle, optionAnimationLeft} from "./src/vars/navigateConfig";
import SCREEN_NAME from "./src/vars/SCREEN_NAME";
import List from "./src/screen/List/List";
import {StateType} from "./src/types/types";
import Setting from "./src/screen/Setting/Setting";
import {BalanseBtn, ListBtn, ProfileBtn, SettingBtn} from './src/comps/HeaderBtns'
import Loader from './src/comps/Loader';
import Profile from "./src/screen/Profile/Profile";
import {Provider as PaperProvider} from 'react-native-paper';
import THEME, {THEME_NAME} from "./src/config/THEME";
import setStorageSetting from "./src/config/setStorageSetting";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Stack = createStackNavigator();

function App() {
    const {theme: theme_name} = useSelector<StateType, StateType>((state => state))
    const theme: any = THEME[theme_name] || THEME[THEME_NAME.LIGHT]
    useEffect(()=>{
        setStorageSetting()
    },[])
    return (
        <NavigationContainer theme={theme}>
            <PaperProvider theme={theme}>
                <Stack.Navigator initialRouteName={SCREEN_NAME.PROFILE}>
                    <Stack.Screen
                        name={SCREEN_NAME.LIST}
                        component={List}
                        options={{
                            ...getHeaderOptions(
                                () => <SettingBtn/>,
                                () => <ProfileBtn/>,
                                ()=><BalanseBtn/>
                            ),
                            ...optionAnimationLeft(true),
                            ...getHeaderStyle()
                        }}/>
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
                    {/*<Stack.Screen*/}
                    {/*    name={SCREEN_NAME.START}*/}
                    {/*    component={Start}*/}
                    {/*    options={{*/}
                    {/*        ...getHeaderOptions(*/}
                    {/*            () => <SettingBtn/>,*/}
                    {/*            () => <ScanBtn/>,*/}
                    {/*            null*/}
                    {/*        ),*/}
                    {/*        ...optionAnimationLeft(true),*/}
                    {/*        ...getHeaderStyle()*/}
                    {/*    }}/>*/}
                </Stack.Navigator>
                <Loader/>
            </PaperProvider>
        </NavigationContainer>

    );
}

export default () =>
    <Provider store={store}>
        <App/>
    </Provider>


// const styles = StyleSheet.create({
//
// });
