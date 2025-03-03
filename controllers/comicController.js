const Category = require('../model/categoryModel')
const Comic = require('../model/comicModel')
const express = require('express')
const Joi = require('@hapi/joi')
const app = express();

const idSchema = Joi.object().keys({
    comicID: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
})

const getcomicID = async(req,res,next)=>{
    const validator= idSchema.validate(req.params)
    const {comicID} = req.value.params

    const comic = await Comic.findById(comicID)

    return res.json({comic})

   

}

const getComicCate = async(req,res,next)=>{
    
    const {comicID} = req.value.params

    const comic = await Comic.findById(comicID).populate('categories')
    return res.status(201).json({categories: comic.categories})


}
 
const index = async (req,res,next)=>{
    try {
     const comics = await Comic.find({})
     return res.json({comics})
        
    } catch (error) {
        next(error)
        
    }
 }

//  const index = async (req,res,next)=>{
//     try {
//      const users = await User.find({})
//      return res.json({users})
        
//     } catch (error) {
//         next(error)
        
//     }
//  }

 const CreateComic = async(req,res,next)=>{
     try {
         const createComic = new Comic(req.value.body)
         await createComic.save()
         return res.json({comic : createComic})
         
     } catch (error) {
        next (error)
         
     }
 }

 const CreateComicCate = async(req,res,next)=>{
     const {comicID} = req.value.params

     const newCate = new Category(req.body)

     const comic = await Comic.findById(comicID)

     newCate.comic_type = comic

     await newCate.save()

     comic.categories.push(newCate._id)

     await comic.save()

     res.json({category: newCate})


 }

 const replaceComic = async(req,res,next)=>{
    const {comicID} = req.params
    const newComic = req.body
    const result = await Comic.findByIdAndUpdate(comicID, newComic)
    return res.json({success: true})

}

const updateComic = async(req,res,next)=>{
    const {comicID} = req.value.params
    const newComic = req.value.body
    const result = await Comic.findByIdAndUpdate(comicID, newComic)
    return res.json({success: true})


}


 module.exports ={
     getcomicID,
     getComicCate,
     index,
     CreateComic,
     CreateComicCate,
     replaceComic,
     updateComic
 }