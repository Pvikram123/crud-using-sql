const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const {all,applyid, post,update,earase} = require('./quries/quries')
app.use(express.json());



app.get("/name",all)
app.get("/user/:id",applyid)
app.post('/post',post)
app.put('/update/:id',update)
app.delete('/delete/:id',earase)
  // set port, listen for requests
  
  const PORT = process.env.PORT || 4444;
  app.listen(PORT, () => {
    console.log("port is running");
  })