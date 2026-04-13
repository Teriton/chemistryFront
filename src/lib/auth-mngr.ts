import type { AddUser } from "./models/user";

export interface LoginDataRequst  {
	login   : string 
	password: string 
}

export class AuthMngr{
    url: string;

    constructor(url: string) {
        this.url = url.startsWith('http') ? url : 'http://' + url;
    }

    async login(loginData: LoginDataRequst)  {
        const headers: Headers = new Headers() 

        headers.set('Content-Type', 'application/json')
        const request: RequestInfo = new Request(this.url + "/login", {
            method: 'POST',
            headers: headers,
            credentials: "include",
            body: JSON.stringify(loginData)
        })
        const response = await fetch(request);

        const responseJson = await response.json(); 

        if (!response.ok) {
            return {title: "Error", content:"Can't login"}
        }
        return responseJson;
    }

    async signup(user: AddUser) {
        const headers: Headers = new Headers() 

        headers.set('Content-Type', 'application/json')
        headers.set('Accept', 'application/json') 
        const request: RequestInfo = new Request(this.url + "/signup", {
            method: 'POST',
            headers: headers,
            credentials: "include",
            body: JSON.stringify(user)
        })
        const response = await fetch(request)
        if (!response.ok) {
            return JSON.stringify({title: "Error", content:"Article not found"})
        }

        return await response.json();
    }

    async logout(){
        const headers: Headers = new Headers() 

        headers.set('Content-Type', 'application/json')
        headers.set('Accept', 'application/json') 
        const request: RequestInfo = new Request(this.url + "/logout", {
            method: 'POST',
            headers: headers,
            credentials: "include",
        })
        const response = await fetch(request)
        if (!response.ok) {
            return {title: "Error", content:"Article not found"}
        }

        return await response.json();
    }
}