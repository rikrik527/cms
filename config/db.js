const mongoose = require('mongoose')
const config = require('config')
const db = config.get("mongoURI")

const connectDB = async ()=>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false,
            useUnifiedTopology:true
        })
        console.log('mongodb資料庫連接中....')
    } catch (err) {
        console.log(err.message)
        //  退出程序如果失敗
        process.exit(1)
    }
}
module.exports = connectDB