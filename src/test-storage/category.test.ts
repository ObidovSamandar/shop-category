import { CategoryStorage } from "../storage/mongo/category"
import {ICategory} from "../models/CategoryModel"
import mongoose  from "mongoose"
import config from "../config/config"

let category = new CategoryStorage()

beforeAll(async ()=>{
    await mongoose.connect(`mongodb://localhost/${config.MongoDatabase}`, {
        useFindAndModify:false,
        useNewUrlParser:true
    })
})

afterAll( async ()=>{
    await mongoose.connection.close()
})


describe('Create  New Category', ()=>{
    let categoryCreate: ICategory
    test('Create new Category', async ()=>{
        categoryCreate = await category.create({
            title:'Barra maxsulotlar'
        }as ICategory)
        expect(categoryCreate.title).toEqual('Barra maxsulotlar')
    })

    test('Create Duplicate Category', async ()=>{
        try {
            await category.create({
                title:'Barra maxsulotlar'
            }as ICategory)
        } catch (e) {
            expect(e.code).toEqual(11000)
        }
    })

    test('Find Created Category', async ()=>{
        let findCategory = await category.findById(categoryCreate._id)
        expect(findCategory.title).toEqual('Barra maxsulotlar')
    })

    test('Find Fake Created Category', async ()=>{
        try {
            await category.findById(categoryCreate._id.slice(0, categoryCreate._id.length-1)+7)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })

    test('Update Created Category', async()=>{
        let updateCategory = await category.update(categoryCreate._id,{
            title:"Barra maxsulotlar va go'sht maxsulotlari"
        }as ICategory)
        expect(updateCategory.title).toEqual("Barra maxsulotlar va go'sht maxsulotlari")
    })

    test('Delete Created Category', async ()=>{
        let deleteCategory = await category.delete(categoryCreate._id)
        expect(deleteCategory).toBeTruthy()
    })
})



describe('Update Category', ()=>{
    let categoryCreate:ICategory
    test('Create new Category', async ()=>{
        categoryCreate = await category.create({
           title:'Non maxsulotlari'
        }as ICategory)
        expect(categoryCreate.title).toEqual('Non maxsulotlari')
    })

    test('Update Category', async ()=>{
        let updateCategory = await category.update(categoryCreate._id,{
            title:"Non"
        }as ICategory)
        expect(updateCategory.title).toEqual('Non')
    })

    test('Update Fake Category', async ()=>{
        try {
            let updateFakeCategory = await category.update(categoryCreate._id.slice(0,categoryCreate._id.length-1)+2,{
                title:"Non va boshqa masulotlar"
            }as ICategory)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
            
        }
    })

    test('Get Category', async ()=>{
        let findCategory = await category.findById(categoryCreate._id)
        expect(findCategory.title).toEqual('Non')
    })

    test('Get Fake Category', async ()=>{
        try {
            let findFakeCategory = await category.findById(categoryCreate._id.slice(0,categoryCreate._id.length-1)+3)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })

    test('Delete Category', async()=>{
        let deleteCategory = await category.delete(categoryCreate._id)
        expect(deleteCategory).toBeTruthy()
    })
})




describe('Delete Category', ()=>{
    let categoryCreate:ICategory
    test('Create Category', async ()=>{
        categoryCreate = await category.create({
           title:'Sabzavotlar'
        }as ICategory)
        expect(categoryCreate.title).toEqual('Sabzavotlar')
    })

    test('Delete Fake Category', async ()=>{
        try {
            await category.delete(categoryCreate._id.slice(0,categoryCreate._id.length-1)+9)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })

    test('Delete Category', async()=>{
        let deleteCategory = await category.delete(categoryCreate._id)
        expect(deleteCategory).toBeTruthy()
    })
    test('Find Category', async ()=>{
        try {
            let findCategory = await category.findById(categoryCreate._id)
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })
})


describe('Get All Properties', ()=>{
    test('All Properties', async ()=>{
        let allproperties = await category.findAll({})
        expect(allproperties).toBeTruthy()
    })

    test('Cannot find all properties', async ()=>{
        try {
            await category.findAll({name:"Dasdfasdfasdf"})
        } catch (e) {
            expect(e.statusCode).toEqual(404)
        }
    })
})
