import type { User } from "./models/user";


export class UserMngr{
    url: string;

    constructor(url: string) {
        this.url = url.startsWith('http') ? url : 'http://' + url;
    }

    async getUser(): Promise<User>{
        const headers: Headers = new Headers() 

        headers.set('Accept', 'application/json') 
 
        const request: RequestInfo = new Request(this.url + "/user", {
            method: 'GET',
            headers: headers,
            credentials: "include",
        })
        const response = await fetch(request)
        console.log(response)
        if (!response.ok) {
            return {
                username: "Error"
            } as User
        }

        return await response.json() as User;
    }

    //async signup(user: AddUser) {
    //    const headers: Headers = new Headers() 

    //    headers.set('Content-Type', 'application/json')
    //    headers.set('Accept', 'application/json') 
    //    const request: RequestInfo = new Request(this.url + "/signup", {
    //        method: 'POST',
    //        headers: headers,
    //        credentials: "include",
    //        body: JSON.stringify(user)
    //    })
    //    const response = await fetch(request)
    //    if (!response.ok) {
    //        return JSON.stringify({title: "Error", content:"Article not found"})
    //    }

    //    return await response.json();
    //}
}