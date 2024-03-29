const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

//Config
    //sessao
        app.use(session({
            secret : "cursodenode",
            resave :true,
            saveUninitialized : true
        }))
        app.use(flash())
    //Middlewares
        app.use((req,res,next)=>{
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })
    //Config do Body-parser
        app.use(bodyParser.urlencoded({extended : true}))
        app.use(bodyParser.json())
    //HandleBars
        app.engine('handlebars',handlebars({defaultLayout:'main'}))
        app.set('view engine','handlebars')
    //Mongoose
        mongoose.Promise = global.Promise
        mongoose.connect("mongodb://localhost/blogapp",
        {useUnifiedTopology : true,useNewUrlParser : true})
        .then(()=>{
            console.log('conectado com sucesso')
        })
        .catch((err)=>{
            console.log("Erro ao se conectar:" +err)
        })
    //Public
        app.use(express.static(path.join(__dirname,"public")))
//Rotas
    app.use('/admin',admin)
//Outros
const PORT = 8081    
    app.listen(PORT,()=>{
        console.log(`servidor rodando ${PORT}`)
    })