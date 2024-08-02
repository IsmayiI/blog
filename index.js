
import express from "express"
import mongoose from "mongoose"
import multer from "multer"
import cors from "cors"
import fs from 'fs'
import path from 'path'
import os from 'os'

import { registerValidation, loginValidation, postCreateValidation, postUpdateValidation, commentCreateValidation } from './validations.js'
import { CommentController, PostController, UserController } from "./controllers/index.js"
import { checkAuth, handleValidationErrors } from "./utils/index.js"

mongoose.connect(process.env.MONGODB_URI)
   .then(() => console.log('db ok'))
   .catch((err) => console.log('db error', err))


const userHomeDir = os.homedir();
const uploadsDir = path.join(userHomeDir, 'uploads');

const app = express()

const storage = multer.diskStorage({
   destination: (_, __, cb) => {
      if (!fs.existsSync(uploadsDir)) {
         fs.mkdirSync(uploadsDir, { recursive: true });
      }
      cb(null, uploadsDir);
   },
   filename: (_, file, cb) => {
      cb(null, file.originalname)
   },
})

const upload = multer({ storage })

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static(uploadsDir))

app.get('/auth/me', checkAuth, UserController.getMe)
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
   res.json({
      url: `/uploads/${req.file.originalname}`
   })
})

app.get('/tags', PostController.getLastTags)

app.get('/posts', PostController.getAll)
app.get('/posts/tags', PostController.getLastTags)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postUpdateValidation, handleValidationErrors, PostController.update)


app.get('/comments', CommentController.getLastComments)
app.get('/comments/:id', CommentController.getPostComments)
app.post('/comments', checkAuth, commentCreateValidation, handleValidationErrors, CommentController.create)




app.listen(process.env.PORT || 4444, (err) => {
   if (err) {
      console.log(err);
   }
   console.log('server ok');
})