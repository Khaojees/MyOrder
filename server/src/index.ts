import express from "express"
import cors from "cors"
import morgan from 'morgan'
import mongoose from "mongoose"
// import 'dotenv/config'
import * as dotenv from 'dotenv'
import router from "./routes/routes"

dotenv.config()
const port = process.env.REACT_APP_PORT || 5055

const app = express()
 

mongoose.Promise = Promise
mongoose.connect(process.env.DATABASE!)
mongoose.connection.on('error',(error:Error)=>console.log(error))

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.get('/',(req,res)=>{
      res.json({result:"Ok lllrrll"})
})

app.use('/',router())

app.listen(port,()=>console.log(`Server running at port ${port}`))