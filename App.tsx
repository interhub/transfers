import React from 'react';
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
import {ListBtn, ProfileBtn, SettingBtn} from './src/comps/HeaderBtns'
import Loader from './src/comps/Loader';
import Profile from "./src/screen/Profile/Profile";
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Stack = createStackNavigator();
// const theme = {
//     ...DefaultTheme,
//     roundness: 2,
//     colors: {
//         ...DefaultTheme.colors,
//         primary: '#3498db',
//         accent: '#f1c40f',
//     },
// };
const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(4,20,100)',
        background: 'rgb(107,188,245)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
        accent: '#f1c40f',
    },
};

function App() {
    const {load} = useSelector<StateType, StateType>((state => state))

    return (
        <NavigationContainer theme={theme} >
            <Stack.Navigator initialRouteName={SCREEN_NAME.PROFILE}>
                <Stack.Screen
                    name={SCREEN_NAME.LIST}
                    component={List}
                    options={{
                        ...getHeaderOptions(
                            () => <SettingBtn/>,
                            () => <ProfileBtn/>,
                            null
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
        </NavigationContainer>

    );
}

export default () =>
    <Provider store={store}>
        <PaperProvider theme={theme}>
            <App/>
        </PaperProvider>
    </Provider>



// const styles = StyleSheet.create({
//
// });
