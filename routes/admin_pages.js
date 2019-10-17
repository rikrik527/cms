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
router.get('/add-page', (req, res) => {
    console.log('get /add-pages')
    const {
        title,
        slug,
        content
    } = req.body
    console.log('req body', req.body)
    res.json({
        title,
        slug,
        content
    })
})


//post add page

router.post('/add-page', [
    check('title', 'Title must have a value').not().isEmpty(),
    check('slug', 'Slug must have a value').not().isEmpty(),
    check('content', 'Content must have a value').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log('errors 驗證錯誤', errors)
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const {
        title,
        content
    } = req.body
    const slug = req.body.slug.replace(/\s+/g, '-').toLowerCase()
    try {


        await Page.findOne({
            slug
        }, (err, page) => {
           



            if (page) { //if find slug
                (async () => {
                    console.log('slug')
                    const newPage = new Page({
                        title,
                        content,
                        slug
                    })
                    if (newPage.slug === '') {
                        newPage.slug = newPage.title.replace(/\s+/g, '-').toLowerCase()
                    console.log('newpage slug', newPage.slug)
                    console.log('err,page',err,page)
                }

                    await newPage.save()
                    
                            console.log('slug exists saved to newPage',newPage)
                            
                            return res.status(300).json({
                                errors: [{
                                    msg: '重複物件!系統當機'
                                }]
                            })
                        
                    
                    
                })()
            } else {
                (async () => {
                    const newPage = new Page({
                        title:req.body.title,
                        slug:req.body.title,
                        content:req.body.title,
                        sorting:50,
                        user:req.user
                    })
                    console.log('req',req,'user',req.user)
                    const page = await newPage.save()
                        console.log('page', page)
                        if (err)
                            return console.log('if err',err)
                        await Page.find({}).sort({
                            sorting: 1
                        }).exec((err, pages) => {

                            if (err) {
                                console.log('err', err)
                            } else {
                                
                              
                                console.log('return next')

                                
                               
                                
                                res.json(page)


                            }
                        })

                    
                })()






            }
        })

    } catch (err) {
        console.log('catch',err)
    }









})



module.exports = router