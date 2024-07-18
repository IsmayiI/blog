
import express from "express"
import mongoose from "mongoose"

import { registerValidation, loginValidation } from './validations.js'
import checkAuth from "./utils/CheckAuth.js"
import * as UserController from "./controllers/UserController.js"
import * as PostController from "./controllers/PostController.js"

mongoose.connect('mongodb+srv://admin:12345@cluster0.dzsrkfs.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
   .then(() => console.log('db ok'))
   .catch((err) => console.log('db error', err))


const app = express()

app.use(express.json())

app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.post('')

app.listen(4444, (err) => {
   if (err) {
      console.log(err);
   }
   console.log('server ok');
})