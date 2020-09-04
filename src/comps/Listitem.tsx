import * as React from 'react';
import {List} from 'react-native-paper';
import {TovarType, UserItemType} from "../types/types";
import {View} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

const ListItem = ({item, onOpen}: { item: UserItemType, onOpen: (user: UserItemType ) => void }) => {


    return (
        <View>
            <List.Item
                onPress={() => onOpen(item)}
                title={item?.name}
                description={item?.name}
                left={props => <List.Icon {...props} icon={() => <FontAwesome5 name="user" size={24} color="black"/>}/>}
            />

        </View>

    )
};

export default ListItem;