
import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

mongoose.connect('mongodb+srv://admin:12345@cluster0.dzsrkfs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
   .then(() => console.log('db ok'))
   .catch((err) => console.log('db error', err))


const app = express()

app.use(express.json())

app.post('/auth/login', (req, res) => {
   const token = jwt.sign({
      email: req.body.email,
      fullname: "Ismayil Ismayilov"
   }, 'secret123')

   res.json({
      success: true,
      token
   })
})

app.get('/', (req, res) => {
   res.send('OK!!')
})

app.listen(4444, (err) => {
   if (err) {
      console.log(err);
   }

   console.log('server ok');
})