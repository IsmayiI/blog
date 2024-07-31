
import CommentModel from '../models/Comment.js'

export const create = async (req, res) => {
   try {
      const doc = new CommentModel({
         text: req.body.text,
         postId: req.body.postId,
         user: req.userId
      })

      const comment = await doc.save()

      res.json(comment)
   } catch (err) {
      res.status(500).json({
         message: 'Не удалось создать комментарий'
      })
   }
}

export const getLastComments = async (req, res) => {
   try {
      const comments = await CommentModel.find().limit(5).populate("user").exec()

      res.json(comments)
   } catch (err) {
      res.status(500).json({
         message: 'Не удалось получить комментарии'
      })
   }
}

export const getPostComments = async (req, res) => {
   try {
      const postId = req.params.id


      const comments = await CommentModel.find({ postId }).populate('user').exec()

      res.json(comments)

   } catch (err) {
      res.status(500).json({
         message: 'Не удалось получить комментарии'
      })
   }
}