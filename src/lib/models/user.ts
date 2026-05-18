export interface AddUser {
	email: string;
	password: string;
	username: string;
}

export interface User extends AddUser {
	id: number;
	xp: number;
	streak: number;
	creation_date: Date;
	/** Data URL изображения с сервера; пусто — показываем стандартный силуэт */
	avatar?: string;
}
