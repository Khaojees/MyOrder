import express from "express"
import {addUser,getData,editData,deleteData} from "../controllers/controllers"

const router = express.Router()


export default (): express.Router =>{
      router.get('/getdata',getData)
      router.post('/adddata',addUser)
      router.put('/editdata',editData)
      router.delete('/deletedata/:id',deleteData)
      return router 
}

