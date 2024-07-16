

import express from "express"

const app = express()

app.get('/', (req, res) => {
   res.send('OK!!')
})

app.listen(4444, (err) => {
   if (err) {
      console.log(err);
   }

   console.log('server ok');
})