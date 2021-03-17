const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid');
const port = process.env.PORT || 4000
const path = require('path')

//declare middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views/pages'))

let designs = [];
let cart = [];

//get routes 
//overview page
app.get('/', (req, res) => {
    res.render('overview', { designs, cart })
})

app.get('/:id', (req, res) => {
    res.render('overview', { designs, cart })
})


//design page
app.get('/create', (req, res) => {
    res.render('create')
})
//create shirt design
app.post('/create', (req, res) => {
    const shirt = {
        id: uuidv4(),
        color: req.body.color,
        size: req.body.size,
        gender: req.body.gender,
        text: req.body.text
    }
    designs.push(shirt)
    res.redirect('/')
})

//DESIGNS ROUTE
app.post('/designs/delete/:id', (req, res) => {
    const id = req.params.id;
    designs = designs.filter(design => design.id !== id)
    res.redirect('/')
})

//CART ROUTES
app.post('/cart/add/:id', (req, res) => {
    const id = req.params.id;
    cart.push(designs.find(design => design.id === id))
    res.redirect('/')
})
app.post('/cart/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    cart = cart.filter(design => design.id !== id)
    res.redirect('/')
})


app.get('*', (req, res) => {
    res.render('error')
})

//start express server
app.listen(port, () => {
    console.log(`app listening on port: ${port}`)
})