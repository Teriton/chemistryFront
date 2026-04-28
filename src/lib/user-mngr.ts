import type { AddUser, User } from "./models/user";

export interface UserWithCompletedLessonsCount extends User {
	completed_lessons: number 
}

export interface  UserWithPasswordToEdit extends AddUser {
    current_password: string
}



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
        if (!response.ok) {
            return {
                username: "Error"
            } as User
        }

        return await response.json() as User;
    }
    
    async getUserWithCompletedLessonsCount(): Promise<UserWithCompletedLessonsCount>{
        const headers: Headers = new Headers() 

        headers.set('Accept', 'application/json') 
 
        const request: RequestInfo = new Request(this.url + "/user/completedLessonsCount", {
            method: 'GET',
            headers: headers,
            credentials: "include",
        })
        const response = await fetch(request)
        if (!response.ok) {
            return {
                username: "Error"
            } as UserWithCompletedLessonsCount
        }

        return await response.json() as UserWithCompletedLessonsCount;
    }

    async edit(user: UserWithPasswordToEdit) {
        const headers: Headers = new Headers() 

        headers.set('Content-Type', 'application/json')
        headers.set('Accept', 'application/json') 
        const request: RequestInfo = new Request(this.url + "/user/edit", {
            method: 'POST',
            headers: headers,
            credentials: "include",
            body: JSON.stringify(user)
        })
        const response = await fetch(request)
        if (!response.ok) {
            return {
                status: "Error",
                body: await response.json()
            };
        }

        return await response.json();
    }
}