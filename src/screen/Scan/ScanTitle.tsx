import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {WIDTH} from "../../vars/SIZE";


export default () => {
    return <View style={{flex: 1}}>
        <View style={{marginVertical: 20}} >
            <Text style={styles.title}>
                Наведите камеру на QR код
            </Text>
        </View>
        <View style={{alignItems: 'center'}}>
            <View style={styles.marker}/>
        </View>
    </View>

}

const SIZE_MARKER = 0.7 * WIDTH
const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 18
    },
    marker: {
        width: SIZE_MARKER,
        height: SIZE_MARKER,
        borderColor: '#fff',
        borderRadius: 15,
        borderWidth: 2
    }
});