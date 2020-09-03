import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import ScanTitle from "./ScanTitle";
import {TovarType} from "../../types/types";
import {useDispatch} from "react-redux";
import {setLoadAction} from "../../store/actions";
import Loader from "../../comps/Loader";
import Message from "../../comps/Message";
import storeTool from "../../vars/storeTool";
import {useNavigation} from "@react-navigation/native";
import SCREEN_NAME from "../../vars/SCREEN_NAME";

export default function Scan() {
    const [hasPermission, setHasPermission] = useState<any>(null);
    const [scanned, setScanned] = useState(false);
    const dispatch = useDispatch()
    const navigation = useNavigation();
    useEffect(() => {
        (async () => {
            dispatch(setLoadAction(true))
            const {status}: { status: string } = await BarCodeScanner.requestPermissionsAsync();
            dispatch(setLoadAction(false))
            setHasPermission(status === 'granted');
        })();
    }, []);

    const returnTimer = () => {
        setTimeout(() => {
            setScanned(false)
        }, 2000)
    }

    const handleBarCodeScanned = ({type, data}: { type: any, data: any }) => {
        setScanned(true);
        try {
            let arr: TovarType[] = JSON.parse(data)
            Promise.all(arr.map((el) => storeTool.addOneToList(el)))
                .then(() => {
                    returnTimer()
                    navigation.navigate(SCREEN_NAME.LIST)
                    Message('Успешно')
                })
        } catch (e) {
            console.warn(e)
            Message('Не корректный код')
            returnTimer()
        }
    };

    if (hasPermission === null) {
        return <Loader/>;
    }
    if (hasPermission === false) {
        return <Text>Не удалось получить доступ</Text>;
    }

    return (
        <View
            style={{
                flex: 1,
            }}>
            <View style={styles.titleContainer}>
                <ScanTitle/>
            </View>
            <BarCodeScanner
                onBarCodeScanned={({type, data}) => scanned ? undefined : handleBarCodeScanned({type, data})}
                style={{flex: 1}}
            />
            {/*{scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}*/}
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        position: 'absolute',
        top: '20%',
        width: '100%',
        height: 30,
        zIndex: 2000
    }
});