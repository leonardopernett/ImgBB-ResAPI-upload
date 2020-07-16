const route = require('express');
const FormData = require('form-data')
const path = require('path')
const fs = require('fs-extra')
const router = route.Router();
const axios = require('axios').default
const {URL, API_KEY} = require('../key')
const IMG = require('../models/Img')

router.get('/',async (req,res)=>{
  const images = await IMG.find();
  res.render('index',{images})
})

router.get('/add',(req,res)=>{
  res.render('upload')
})

router.post('/upload',async (req,res)=>{
  const img = path.resolve('./src/public/uploads/'+req.file.filename)
  const image = fs.readFileSync(img, {encoding:'base64'})
  const formdata = new FormData()
  formdata.append('image',image)

     axios(`${URL}?key=${API_KEY}`,{
        method:"POST",
        headers:formdata.getHeaders(),
        data:formdata
    }).then( async (response)=>{
      console.log(response.data.data.display_url)
      const img = new IMG({
        filename:response.data.data.display_url     
       })
      await img.save();
     
    }).catch(err=>{
      console.log(err)
    })
  
   await fs.unlink(path.resolve('./src/public/uploads/'+req.file.filename))
   res.redirect("/") 
})

module.exports = router;