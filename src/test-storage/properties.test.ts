import { PropertyStorage } from "../storage/mongo/properties"
import {IProperties} from "../models/PropertiesModel"
import mongoose  from "mongoose"
import config from "../config/config"

let property = new PropertyStorage()

beforeAll(async ()=>{
    await mongoose.connect(`mongodb://localhost/${config.MongoDatabase}`, {
        useFindAndModify:false,
        useNewUrlParser:true
    })
})

afterAll( async ()=>{
    await mongoose.connection.close()
})


describe('Create  New Property', ()=>{
    let propertyCreate: IProperties
    test('Create new User', async ()=>{
        propertyCreate = await property.create({
            name:"size",
            property_type: "check",
            order_number:1,
            description:"lorem ipsum"
        }as IProperties)
        expect(propertyCreate.name).toEqual('size')
    })

    test('Create Duplicate Property', async ()=>{
        try {
            await property.create({
                name:"size",
                property_type: "check",
                order_number:1,
                description:"lorem ipsum"
            }as IProperties)
        } catch (e) {
            expect(e.code).toEqual(11000)
        }
    })

    test('Find Created Property', async ()=>{
        let findProperty = await property.findById(propertyCreate._id)
        expect(findProperty.name).toEqual('size')
    })

    test('Find Fake Created Property', async ()=>{
        try {
            await property.findById(propertyCreate._id.slice(0, propertyCreate._id.length-1)+7)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })

    test('Update Created Property', async()=>{
        let updateProperty = await property.update(propertyCreate._id,{
            name:"Width"
        }as IProperties)
        expect(updateProperty.name).toEqual('Width')
    })

    test('Delete Created Property', async ()=>{
        let deleteProperty = await property.delete(propertyCreate._id)
        expect(deleteProperty).toBeTruthy()
    })
})



describe('Update Property', ()=>{
    let propertyCreate:IProperties
    test('Create new User', async ()=>{
        propertyCreate = await property.create({
            name:"size",
            property_type: "check",
            order_number:1,
            description:"lorem ipsum"
        }as IProperties)
        expect(propertyCreate.name).toEqual('size')
    })

    test('Update Property', async ()=>{
        let updateProperty = await property.update(propertyCreate._id,{
            name:"main sizes"
        }as IProperties)
        expect(updateProperty.name).toEqual('main sizes')
    })

    test('Update Fake Property', async ()=>{
        try {
            let updateFakeProperty = await property.update(propertyCreate._id.slice(0,propertyCreate._id.length-1)+2,{
                name:"main sizes2"
            }as IProperties)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
            
        }
    })

    test('Get User', async ()=>{
        let findProperty = await property.findById(propertyCreate._id)
        expect(findProperty.name).toEqual('main sizes')
    })

    test('Get Fake User', async ()=>{
        try {
            let findFakeProperty = await property.findById(propertyCreate._id.slice(0,propertyCreate._id.length-1)+3)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })

    test('Delete Property', async()=>{
        let deleteProperty = await property.delete(propertyCreate._id)
        expect(deleteProperty).toBeTruthy()
    })
})




describe('Delete Property', ()=>{
    let propertyCreate:IProperties
    test('Create Property', async ()=>{
        propertyCreate = await property.create({
            name:"size",
            property_type: "check",
            order_number:1,
            description:"lorem ipsum"
        }as IProperties)
        expect(propertyCreate.name).toEqual('size')
    })

    test('Delete Fake Property', async ()=>{
        try {
            await property.delete(propertyCreate._id.slice(0,propertyCreate._id.length-1)+9)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })

    test('Delete Property', async()=>{
        let deleteProperty = await property.delete(propertyCreate._id)
        expect(deleteProperty).toBeTruthy()
    })
    test('Find Property', async ()=>{
        try {
            let findProperty = await property.findById(propertyCreate._id)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })
})


describe('Get All Properties', ()=>{
    test('All Properties', async ()=>{
        let allproperties = await property.findAll({})
        expect(allproperties).toBeTruthy()
    })

    test('Cannot find all properties', async ()=>{
        try {
            await property.findAll({name:"Dasdfasdfasdf"})
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })
})
