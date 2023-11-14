import {User} from '../db/schema'
import {Request,Response} from "express"

export const addUser = async(req:Request,res:Response) =>{
      const {firstName,lastName,dateOfBirth,gender} = req.body
      try {
            console.log("hahaha",firstName,lastName,dateOfBirth,gender)
            await User.create({firstName,lastName,dateOfBirth,gender})
            res.status(200).json("Success")
            }
       catch (error) {
            console.log(error)
            res.json({error:error})
      }
}

export const getData =async (req:Request,res:Response) => {
      try {
            const response = await User.find({})
            res.json(response)
      } catch (error) {
            res.json({error:error})
      }
}

export const editData =async (req:Request,res:Response) => {
      try {
            const {_id,firstName,lastName,dateOfBirth,gender} = req.body
            await User.findByIdAndUpdate({_id},{firstName,lastName,dateOfBirth,gender},{new:true})
            res.status(200).json("update success jaaaa")
      } catch (error) {
            res.json({error:error})
      }
}

export const deleteData =async (req:Request,res:Response) => {
      try {
            const {id} = req.params
            console.log("params >>>> ", req.params)
            await User.findByIdAndDelete(id)
            res.status(200).json("delete success jaaaa")
      } catch (error) {
            res.json({error:error})
      } 
}