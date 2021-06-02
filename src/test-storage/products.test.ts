import { ProductsStorage } from "../storage/mongo/products"
import {IProducts} from "../models/ProductsModel"
import mongoose  from "mongoose"
import config from "../config/config"

let product = new ProductsStorage()

beforeAll(async ()=>{
    await mongoose.connect(`mongodb://localhost/${config.MongoDatabase}`, {
        useFindAndModify:false,
        useNewUrlParser:true
    })
})

afterAll( async ()=>{
    await mongoose.connection.close()
})


describe('Create  New Product', ()=>{
    let productCreate: IProducts
    test('Create new Product', async ()=>{
        productCreate = await product.create({
            title:"lorem",
            properties:["67402013-30a7-490b-98f9-5e59ac8fe480"],
            category:["284e51a9-1f5a-4e5d-bbef-6d22dfe61718"],
            price:10,
            barcode:77777,
            measurement:20,
        } as IProducts)
        expect(productCreate.title).toEqual('lorem')
    })

    test('Create Duplicate Product', async ()=>{
        try {
            await product.create({
                title:"lorem",
                properties:["67402013-30a7-490b-98f9-5e59ac8fe480"],
                category:["284e51a9-1f5a-4e5d-bbef-6d22dfe61718"],
                price:10,
                barcode:77777,
                measurement:20,
            }as IProducts)
        } catch (e) {
            expect(e.code).toEqual(11000)
        }
    })

    test('Find Created Product', async ()=>{
        let findProduct = await product.findById(productCreate._id)
        expect(findProduct.title).toEqual('lorem')
    })

    test('Find Fake Created Product', async ()=>{
        try {
            await product.findById(productCreate._id.slice(0, productCreate._id.length-1)+7)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })

    test('Update Created Product', async()=>{
        let updateProduct = await product.update(productCreate._id,{
            title:"lorem samandar"
        }as IProducts)
        expect(updateProduct.title).toEqual('lorem samandar')
    })

    test('Delete Created Product', async ()=>{
        let deleteProduct = await product.delete(productCreate._id)
        expect(deleteProduct).toBeTruthy()
    })
})



describe('Update Product', ()=>{
    let productCreate:IProducts
    test('Create new Produc', async ()=>{
        productCreate = await product.create({
            title:"lorem",
            properties:["67402013-30a7-490b-98f9-5e59ac8fe480"],
            category:["284e51a9-1f5a-4e5d-bbef-6d22dfe61718"],
            price:10,
            barcode:77777,
            measurement:20,
        }as IProducts)
        expect(productCreate.title).toEqual('lorem')
    })

    test('Update Product', async ()=>{
        let updateProduct = await product.update(productCreate._id,{
            title:"main sizes"
        }as IProducts)
        expect(updateProduct.title).toEqual('main sizes')
    })

    test('Update Fake Product', async ()=>{
        try {
            let updateFakeProperty = await product.update(productCreate._id.slice(0,productCreate._id.length-1)+2,{
                title:"main sizes2"
            }as IProducts)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
            
        }
    })

    test('Get User', async ()=>{
        let findProduct = await product.findById(productCreate._id)
        expect(findProduct.title).toEqual('main sizes')
    })

    test('Get Fake User', async ()=>{
        try {
            let findFakeProduct = await product.findById(productCreate._id.slice(0,productCreate._id.length-1)+3)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })

    test('Delete Product', async()=>{
        let deleteProduct = await product.delete(productCreate._id)
        expect(deleteProduct).toBeTruthy()
    })
})




describe('Delete Product', ()=>{
    let propertyCreate:IProducts
    test('Create Product', async ()=>{
        propertyCreate = await product.create({
            title:"lorem",
            properties:["67402013-30a7-490b-98f9-5e59ac8fe480"],
            category:["284e51a9-1f5a-4e5d-bbef-6d22dfe61718"],
            price:10,
            barcode:77777,
            measurement:20,
        }as IProducts)
        expect(propertyCreate.title).toEqual('lorem')
    })

    test('Delete Fake Product', async ()=>{
        try {
            await product.delete(propertyCreate._id.slice(0,propertyCreate._id.length-1)+9)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })

    test('Delete Product', async()=>{
        let deleteProduct = await product.delete(propertyCreate._id)
        expect(deleteProduct).toBeTruthy()
    })
    test('Find Product', async ()=>{
        try {
            let findProduct = await product.findById(propertyCreate._id)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })
})


describe('Get All Products', ()=>{
    test('All Products', async ()=>{
        let allproducts = await product.findAll({})
        expect(allproducts).toBeTruthy()
    })

    test('Cannot find all properties', async ()=>{
        try {
            await product.findAll({name:"Dasdfasdfasdf"})
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })
})
