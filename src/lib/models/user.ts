export interface AddUser {
	email    :string 
    password :string 
	username :string
}

export interface User extends AddUser{
	id: number 
	xp: number 
}