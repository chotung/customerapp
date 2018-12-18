const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const { check, validationResult } = require("express-validator/check");

const port = 3000


// Order of the middleware is important
// should be before the app.get

//////////////////////////////////////////
// const logger = (req, res, next) => {
//   console.log('Logging...')
//   next()
// }

// app.use(logger)
//////////////////////////////////////////


//View Engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Set Static Path 
// index html will overwrite 
app.use(express.static(path.join(__dirname, 'public')))

///////////////////////////////////////////

// Express Validator


// const people = [
//     {
//         name: 'charlie',
//         age: '1000'
//     },
//     {
//         name: 'sara',
//         age: '1000'
//     },
//     {
//         name: 'bil',
//         age: '1000'
//     },
// ]

// Global Vars

app.use(function(req, res, next){
    res.locals.errors = null
    next()
})

const users = [
    {
        id: 1,
        first_name: 'Charlie',
        last_name: 'Tung',
        email: 'test@gmail.com'
    },
    {
        id: 2,
        first_name: 'Cie',
        last_name: 'ug',
        email: 'john@gmail.com'
    },
    {
        id: 3,
        first_name: 'Char',
        last_name: 'Tug',
        email: 'char@gmail.com'
    }
]


// middleware has access to req, res
app.get('/', (req, res) => {
    // res.json(people)
    res.render('index', {
        title: 'Customers',
        users: users
    })
})

app.post('/users/add', [
        check('email', 'Email is Required').isEmail(),
        check('first_name', 'First Name is Required').not().isEmpty(),
        check('last_name', 'Last Name is Required').not().isEmpty()
    ], 
    (req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            res.render('index', {
                title: 'Customers',
                users: users,
                errors: errors
            })
            return res.status(422).json({ errors: errors.array() })
        } else {
            const newUser = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email
            }
            console.log('SUCCESS')
        }
    // console.log(newUser)
})

app.listen(port, function() {
    console.log(`Server Started on Port ${port}....`)
}) 