import {AsyncStorage} from "react-native";
import STORE_NAME from "./STORE_NAME";
import {TovarType} from "../types/types";

class StoreTool {
    async getList(): Promise<TovarType[]> {
        let listString = await AsyncStorage.getItem(STORE_NAME.LIST)
        return listString ? JSON.parse(listString) : []
    }

    async setList(data: Object) {
        try {
            return await AsyncStorage.setItem(STORE_NAME.LIST, JSON.stringify(data))
        } catch (e) {
            console.warn(e)
        }
    }

    async addOneToList(data: TovarType): Promise<TovarType[] | undefined> {
        try {
            let old = await this.getList()
            let newList: TovarType[] = [...old, data]
            await AsyncStorage.setItem(STORE_NAME.LIST, JSON.stringify(newList))
            return newList
        } catch (e) {
            console.warn(e)
        }
    }

    async deleteByIndex(index: number) {
        try {
            let old = await this.getList()
            old.splice(index, 1)
            await AsyncStorage.setItem(STORE_NAME.LIST, JSON.stringify(old))
            return old
        } catch (e) {
            console.warn(e)
        }
    }

    async clearList() {
        return AsyncStorage.clear()
    }
}

export default new StoreTool()