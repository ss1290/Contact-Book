const express=require('express')
const path=require('path')
const Contact=require('../models/Contact')
const hbs=require('hbs')
const mongoose=require('mongoose')
const contactlogger=require('../logger')

mongoose.connect('mongodb://127.0.0.1:27017/Contact-Book',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})

const app=express()
const port=3000
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../views')

app.set('view engine','hbs')
app.set('views',viewsPath)


app.use(express.static(publicDirectoryPath))

app.get('/show',async(req,res)=>{
    const phonebook=await Contact.find({})
    res.render('showall',{
         phonebook
    })
})
app.get('/add',async(req,res)=>{
    const contact=await new Contact({
        name:req.query.name,
        phonenumber:req.query.phonenumber
    })
    await contact.save()
    res.send({
        username:contact.name,
        phone:contact.phonenumber
    })
contactlogger.info('Contact created!',
{contactID:`${contact._id}`,
contactname:`${contact.name}`,
phonenumber:`${contact.phonenumber}`
})
})
app.get('/',async(req,res)=>{
    res.render('index',{
        titleName:'Create a Contact'
    })
})

app.get('/contacts/:id',async(req,res)=>{
    const id=req.params.id
    const contact=await Contact.findById(id)
    res.render('showone',{
        name:contact.name,
        phone:contact.phonenumber
    })
})


app.listen(port,()=>{
    console.log('Server is up on port '+port)
})