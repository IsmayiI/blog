
import { validationResult } from 'express-validator'
import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
   try {
      const posts = await PostModel.find().populate('user').exec()

      res.json(posts)
   } catch (err) {
      res.status(500).json({
         message: 'Не удалось получить статьи'
      })
   }
}

export const getOne = async (req, res) => {
   try {
      const postId = req.params.id


      const post = await PostModel.findByIdAndUpdate(
         { _id: postId },
         { $inc: { viewsCount: 1 } },
         { returnDocument: 'after' }
      ).populate('ser')

      res.json(post)

   } catch (err) {
      res.status(500).json({
         message: 'Не удалось получить статью'
      })
   }
}

export const create = async (req, res) => {
   try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json(errors.array())
      }



      const doc = new PostModel({
         title: req.body.title,
         text: req.body.text,
         tags: req.body.tags,
         imageUrl: req.body.imageUrl,
         user: req.userId
      })

      const post = await doc.save()

      res.json(post)
   } catch (err) {
      res.status(500).json({
         message: 'Не удалось создать статью'
      })
   }
}