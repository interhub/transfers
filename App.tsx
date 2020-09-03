import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider, useSelector} from "react-redux";
import store from "./src/store/store";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {getHeaderOptions, getHeaderStyle, optionAnimationLeft} from "./src/vars/navigateConfig";
import SCREEN_NAME from "./src/vars/SCREEN_NAME";
import Start from "./src/screen/Start/Start";
import List from "./src/screen/List/List";
import {StateType} from "./src/types/types";
import Scan from "./src/screen/Scan/Scan";
import Setting from "./src/screen/Setting/Setting";
import {ListBtn, ScanBtn, SettingBtn} from './src/comps/HeaderBtns'
import Loader from './src/comps/Loader';

const Stack = createStackNavigator();

function App() {
    const {load} = useSelector<StateType, StateType>((state => state))

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={SCREEN_NAME.LIST}>
                <Stack.Screen
                    name={SCREEN_NAME.LIST}
                    component={List}
                    options={{
                        ...getHeaderOptions(
                            () => <SettingBtn/>,
                            () => <ScanBtn/>,
                            null
                        ),
                        ...optionAnimationLeft(true),
                        ...getHeaderStyle()
                    }}/>
                <Stack.Screen
                    name={SCREEN_NAME.SCAN}
                    component={Scan}
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
                            () => <ScanBtn/>,
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
        <App/>
    </Provider>

const styles = StyleSheet.create({

});
