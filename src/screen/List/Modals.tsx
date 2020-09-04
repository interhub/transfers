import {LayoutAnimation, StyleSheet, Text, View} from "react-native";
import {Modalize} from "react-native-modalize";
import React, {RefObject, useState} from "react";
import {UserItemType} from "../../types/types";
import {Avatar, Button, Headline, Paragraph, Caption} from "react-native-paper";
import {SimpleLineIcons} from '@expo/vector-icons';

export default ({modalizeRef, item}: { modalizeRef: RefObject<any>, item: UserItemType }) => {

    const [openTransfer, setOpenTransfer] = useState(false);

    return <Modalize
        onClose={()=>{
            setOpenTransfer(false)
        }}
        adjustToContentHeight
        ref={modalizeRef}>
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Avatar.Icon style={{backgroundColor: '#eee'}} size={150}
                             icon={(props) => <SimpleLineIcons name="user-following"  {...props} size={50} />}/>
                < Headline>{item?.name}</Headline>
            </View>
            <View>
                <Caption>Выберите дейтсвие</Caption>
                <Button
                    onPress={() => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                        setOpenTransfer(!openTransfer)
                    }}
                    mode={'outlined'} >
                    Перевод
                </Button>
            </View>
            {openTransfer  && <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Avatar.Icon color={'red'} size={150}
                             icon={() => <SimpleLineIcons name="user-following" size={50} color="black"/>}/>
                <Text style={{fontSize: 20}}>{item?.name}</Text>
            </View>}
        </View>
    </Modalize>
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
})