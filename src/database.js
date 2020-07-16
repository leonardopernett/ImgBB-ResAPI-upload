const { connect } = require('mongoose')

connect('mongodb://localhost/imgbb',{
  useUnifiedTopology: true,
  useNewUrlParser: true 
})
.then(db=>console.log('db is connected'))
.catch(err=>console.log(err))