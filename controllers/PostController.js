
import { validationResult } from 'express-validator'
import PostModel from '../models/Post.js'

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