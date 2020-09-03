import {ScrollView, Text, View} from "react-native";
import {HEIGHT, WIDTH} from "../../vars/SIZE";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {List} from "react-native-paper";
import storeTool from "../../vars/storeTool";
import {TovarType} from "../../types/types";

const QRCode: any = require('react-native-qrcode-svg').default


export default () => {
    const [data, setData] = useState<any>('');
    const dispatch = useDispatch()
    useEffect(() => {
        storeTool.getList()
            .then((data: TovarType[]) => {
                setData(data)
            })
    }, [])
    if (!data) {
        return <View>
            <List.Item title=" Продукты отсутствуют"/>
        </View>
    }
    return <View style={{ height: 0.5 * HEIGHT}}>
        <ScrollView >
            {!!data && Object.keys(data)?.map((item:any, id) => {
                return <View style={{alignItems: 'center', marginTop:80}}>
                    <Text>{data[item]?.name}</Text>
                    <QRCode
                        style={{marginTop: 100}}
                        size={WIDTH - 50}
                        value={JSON.stringify(data[item])}/>
                </View>
            })}
        </ScrollView>
    </View>
}