const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid');
const port = process.env.PORT || 4000
const path = require('path');

//declare middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views/pages'))

let users = []

//get routes 
//overview page
app.get('/', (req, res) => {
    const userid = uuidv4();
    res.redirect('/' + userid)
})
app.get('/favicon.ico', (req, res) => {
    return 'favicon.ico'
})
app.get('/:userid', (req, res) => {
    let user = users.find(user => {
        return user.id === req.params.userid
    })

    //create empty object to start with when it doesnt exist yet
    if (!user) {
        user = {}
        user.designs = []
        user.cart = []
    }

    res.render('overview', { designs: user.designs, cart: user.cart, userid: req.params.userid })
})

//design page
app.get('/:userid/create', (req, res) => {
    res.render('create', { userid: req.params.userid })
})
//create shirt design
app.post('/:userid/create', (req, res) => {
    const shirt = {
        id: uuidv4(),
        color: req.body.color,
        size: req.body.size,
        gender: req.body.gender,
        text: req.body.text
    }

    if (!checkIfUserExist(users, req.params.userid)) {
        users.push({
            id: req.params.userid,
            designs: [],
            cart: []
        })
    }
    users.forEach(user => {
        if (user.id === req.params.userid) {
            user.designs.push(shirt)
        }
    })

    console.log(users)
    // console.log(users)
    res.redirect('/' + req.params.userid)
})

//DESIGNS ROUTE
app.post('/:userid/designs/delete/:id', (req, res) => {
    const id = req.params.id;
    users.forEach(user => {
        if (user.id === req.params.userid) {
            user.designs = user.designs.filter(design => design.id !== id)
        }
    })
    res.redirect('/' + req.params.userid)
})

//CART ROUTES
app.post('/:userid/cart/add/:id', (req, res) => {
    const id = req.params.id;
    users.forEach(user => {
        if (user.id === req.params.userid) {
            user.cart.push(user.designs.find(design => design.id === id))
        }
    })
    res.redirect('/' + req.params.userid)
})
app.post('/:userid/cart/delete/:id', (req, res) => {
    const id = req.params.id;
    users.forEach(user => {
        if (user.id === req.params.userid) {
            user.cart = user.cart.filter(design => design.id !== id)
        }
    })
    res.redirect('/' + req.params.userid)
})


app.get('*', (req, res) => {
    res.render('error')
})

//start express server
app.listen(port, () => {
    console.log(`app listening on port: ${port}`)
})


function checkIfUserExist(array, user) {
    if (array.find(item => item.id === user)) {
        return true;
    } else {
        return false;
    }
}