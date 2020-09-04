import React from "react";
import {Animated, StyleSheet, View} from "react-native";
import {Title, TouchableRipple} from "react-native-paper";

const BalanceCard = ({balance = 0}: { balance: number }) => {
    return <View style={styles.container} >
        <TouchableRipple
        onPress={() => {

        }}
        style={styles.card}>
        <Title>Баланс: {balance}$</Title>
    </TouchableRipple>
    </View>
}


const styles = StyleSheet.create({
    container: {
        margin: 30,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 0.5,
        borderRadius: 20,
        overflow:'hidden'
    },
    card:{
        flex:1,
        width:'100%',
        paddingVertical: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    }
})

export default BalanceCard;