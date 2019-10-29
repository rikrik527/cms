const express = require('express')
const router = express.Router()
const {
    check,
    validationResult
} = require('express-validator')
const Page = require('../models/page')
// get pages index
router.get('/', (req, res) => {
    Page.find({}).sort({
        sorting: 1
    }).exec(function (err, pages) {
        res.json({
            pages
        })
    })

})

//get add page
router.get('/add-page', async (req, res) => {
    console.log('get /add-pages')
    try {
        await Page.find({}).sort({
            sorting: 1
        }).exec((err,pages)=>{
            res.json(pages)
        })

        
    } catch (err) {
        console.log('err', err)
    }
})


//post add page

router.post('/add-page', [
    check('title', 'Title must have a value').not().isEmpty(),

    check('content', 'Content must have a value').not().isEmpty()
], (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log('errors 驗證錯誤', errors)
        return res.status(400).json({
            errors: errors.array()
        })
    }
    var {
        title,
        content
    } = req.body
    var slug = req.body.slug.replace(/\s+/g, '-').toLowerCase()
    if (slug === '') {
        slug = title.replace(/\s+/g, '-').toLowerCase()
        console.log('newpage slug', slug)
    }

    try {
        
         Page.findOne({
            slug
        }, (err, page) => {
            if (page) { //if find slug
                res.status(300).json({
                    errors: [{
                        msg: 'slug exists!choose another one'
                    }]
                })
            } else {

                const newPage = new Page({
                    title: req.body.title,
                    slug: req.body.slug,
                    content: req.body.content,
                    sorting: 100,
                    user: req.user
                })
                console.log('req', req, 'user', req.user)
                const page = newPage.save()
                console.log('page', page)
                if (err)
                    return console.log('if err', err)
                Page.find({}).sort({
                    sorting: 1
                }).exec((err, pages) => {

                    if (err) {
                        console.log('err', err)
                    } else {
                        console.log('return next')
                        res.json(pages)
                    }
                })
            }
        })
    } catch (err) {
        console.log('catch', err)
    }
})
router.post('/recorder-page',(req,res)=>{
    try {
        var ids = req.body['id[]']
        var count = 0
        for(var i = 0;i < ids.length;i++){
            var id = ids[i]
            count++
            (function(count){
                Page.findById(id,(err,page)=>{
                    page.sorting = count
                    page.save((err)=>{
                        if(err)
                        return console.log('err',err)
                    })
                })
            })(count)
        }  
    } catch (err) {
        console.log('err',err)
    } 
})



module.exports = router