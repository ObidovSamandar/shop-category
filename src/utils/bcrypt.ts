import bcrypt from "bcrypt"

export function generateHashPassword(data:string):string{
    return bcrypt.hashSync(data,10)
}

export function comparePassword(password:string, encrypted:string):boolean{
    return bcrypt.compareSync(password,encrypted)
}

