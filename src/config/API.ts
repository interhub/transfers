import store from '../store/store'
import {TokenType} from "../types/types";
import LOCATION from "../vars/LOCATION";
import {setLoadAction} from "../store/actions";

enum METHOD {
    POST = 'post',
    GET = 'get'
}

class API {

    private getToken(): TokenType {
        return store.getState().token || ''
    }

    private getHeadersByToken(method: METHOD): Headers {
        this.setLoading(true)
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${this.getToken()}`)
        if (method === METHOD.POST) {
            headers.append('Content-Type', 'application/json')
            headers.append('Accept', 'application/json')
        }
        return headers
    }

    private async getResponse(res: any) {
        this.setLoading(false)
        try {
            if (res.status === 200) {
                return res.json()
            }else{
                return {message: await res.text()}
            }
        } catch (e) {
            return {message: e.message}
        }
    }

    async registrationUser({username, password, email}: { username: string, password: string, email: string }) {
        return await fetch(LOCATION + '/users', {
            method: METHOD.POST,
            headers: this.getHeadersByToken(METHOD.POST),
            body: JSON.stringify({username, password, email})
        }).then((res: Response) => this.getResponse(res)).then((res) => res)
    }

    async loginUserSession({email, password}: { email: string, password: string }) {
        return await fetch(LOCATION + '/sessions/create', {
            method: METHOD.POST,
            headers: this.getHeadersByToken(METHOD.POST),
            body: JSON.stringify({email, password})
        }).then((res: Response) => this.getResponse(res)).then((res) => res)
    }

    async getListTransfers() {
        return await fetch(LOCATION + '/api/protected/transactions', {
            method: METHOD.GET,
            headers: this.getHeadersByToken(METHOD.GET),
        }).then((res: Response) => this.getResponse(res)).then((res) => res)
    }

    async createTransfer({name, amount}: { name: string, amount: number }) {
        return await fetch(LOCATION + '/api/protected/transactions', {
            method: METHOD.POST,
            headers: this.getHeadersByToken(METHOD.POST),
            body: JSON.stringify({name, amount})
        }).then((res: Response) => this.getResponse(res)).then((res) => res)
    }

    async getUserInfo() {
        return await fetch(LOCATION + '/api/protected/user-info', {
            method: METHOD.GET,
            headers: this.getHeadersByToken(METHOD.GET),
        }).then((res: Response) => this.getResponse(res)).then((res) => res)
    }

    async getUserListByString(filter: string = ' ') {
        return await fetch(LOCATION + '/api/protected/users/list', {
            method: METHOD.POST,
            headers: this.getHeadersByToken(METHOD.POST),
            body: JSON.stringify({filter})
        }).then((res: Response) => this.getResponse(res)).then((res) => res)
    }

    private setLoading(load: boolean) {
        store.dispatch(setLoadAction(load))
    }

}

export default new API()