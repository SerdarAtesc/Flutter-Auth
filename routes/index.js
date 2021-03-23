const express = require('express')
const actions = require('../methods/actions')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('Hello')
})
router.get('/dashboard',(req,res)=>{
    res.send('Dashboard')
})

//Yeni user post etme
router.post('/adduser',actions.addNew)
//Giriş yapan yetkilendirme
router.post('/authenticate',actions.authenticate)
//Giriş yapanın bilgilerini Çekme
router.get('/getinfo',actions.getinfo)



module.exports=router