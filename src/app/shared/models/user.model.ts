export interface LoginInfo {
    email: string,
    password: string
}

export interface RegisterInfo extends LoginInfo {
    firstName: string,
    lastName: string
}

export interface User extends RegisterInfo {
    loginType: string,
    profilePic: string,
}