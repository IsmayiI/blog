
import express from "express"
import mongoose from "mongoose"

import { registerValidation, loginValidation, postCreateValidation } from './validations.js'
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

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
// app.delete('/posts',  PostController.remove)
// app.patch('/posts',  PostController.update)


app.listen(4444, (err) => {
   if (err) {
      console.log(err);
   }
   console.log('server ok');
})