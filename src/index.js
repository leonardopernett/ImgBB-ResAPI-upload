require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
const path = require('path');
const multer = require('multer')
const errorhandler = require('errorhandler');

//server
const app = express();
require('./database')

//intialization
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')



//storage multer 
const storage = multer.diskStorage({
   destination:path.resolve('./src/public/uploads'),
   filename:(req, file ,cb)=>cb(null, Date.now()+path.extname(file.originalname))
}) 


//middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(multer({storage}).single('image'))
//router
app.use(require('./router/index.route'))

//error handler
if(process.env.NODE_ENV !=='production'){
   app.use(errorhandler());
}

app.use(express.static(path.join(__dirname,'public')))
app.listen(app.get('port'),()=>console.log('server on port 3000'))