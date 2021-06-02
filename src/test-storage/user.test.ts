import { UserStorage } from "../storage/mongo/user"
import {IUser} from "../models/UserModel"
import mongoose  from "mongoose"
import config from "../config/config"

let user = new UserStorage()

beforeAll(async ()=>{
    await mongoose.connect(`mongodb://localhost/${config.MongoDatabase}`, {
        useFindAndModify:false,
        useNewUrlParser:true
    })
})

afterAll( async ()=>{
    await mongoose.connection.close()
})

describe('Create  New User', ()=>{
    let userCreate: IUser
    test('Create new User', async ()=>{
        userCreate = await user.create({
            name:"Ochil",
            email:"ochil@gmail.com",
            password:"rerochil123"
        }as IUser)
        expect(userCreate.name).toEqual('Ochil')
    })

    test('Create Duplicate User', async ()=>{
        try {
             await user.create({
                name:"Ochil",
                email:"ochil@gmail.com",
                password:"rerochil123"
            }as IUser)
        } catch (e) {
            expect(e.code).toEqual(11000)
        }
    })

    test('Find Created User', async ()=>{
        let findUser = await user.findByEmail(userCreate.email)
        expect(findUser.email).toEqual('ochil@gmail.com')
    })

    test('Find Fake Created User', async ()=>{
        try {
            await user.findByEmail('ochil5445@gmail.com')
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })

    test('Update Created User', async()=>{
        let updateUser = await user.update(userCreate._id,{
            name:"Dilmurod"
        }as IUser)
        expect(updateUser.name).toEqual('Dilmurod')
    })

    test('Delete Created User', async ()=>{
        let deleteUser = await user.delete(userCreate._id)
        expect(deleteUser).toBeTruthy()
    })
})



describe('Update User', ()=>{
    let userCreate:IUser
    test('Create new User', async ()=>{
        userCreate = await user.create({
            name:'Dilmurod',
            email:'dilik@gmail.com',
            password:"dilik123"
        }as IUser)
        expect(userCreate.name).toEqual('Dilmurod')
    })

    test('Update User', async ()=>{
        let updateUser = await user.update(userCreate._id,{
            email:"dilmurod@gmail.com"
        }as IUser)
        expect(updateUser.email).toEqual('dilmurod@gmail.com')
    })

    test('Update Fake User', async ()=>{
        try {
            let updateUser = await user.update(userCreate._id.slice(0,userCreate._id.length-1)+2,{
                email:"dilmurod@gmail.com"
            }as IUser)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
            
        }
    })

    test('Get User', async ()=>{
        let findUser = await user.findById(userCreate._id)
        expect(findUser.name).toEqual('Dilmurod')
    })

    test('Get Fake User', async ()=>{
        try {
            let findFakeUser = await user.findById(userCreate._id.slice(0,userCreate._id.length-1)+3)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })

    test('Delete user', async()=>{
        let deleteUser = await user.delete(userCreate._id)
        expect(deleteUser).toBeTruthy()
    })
})




describe('Delete User', ()=>{
    let userCreate:IUser
    test('Create User', async ()=>{
        userCreate = await user.create({
            name:'Dilshod',
            email:'dilshod@gmail.com',
            password:'dilshod123'
        }as IUser)
        expect(userCreate.name).toEqual('Dilshod')
    })

    test('Delete Fake User', async ()=>{
        try {
            await user.delete(userCreate._id.slice(0,userCreate._id.length-1)+9)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })

    test('Delete User', async()=>{
        let deleteUser = await user.delete(userCreate._id)
        expect(deleteUser).toBeTruthy()
    })
    test('Find User', async ()=>{
        try {
            let findUser = await user.findByEmail(userCreate.email)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })
})


describe('Get All User', ()=>{
    test('All User', async ()=>{
        let alluser = await user.findAll({})
        expect(alluser).toBeTruthy()
    })

    test('Cannot find all user', async ()=>{
        try {
            await user.findAll({name:"Dasdfasdfasdf"})
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })
})