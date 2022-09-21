const koa = require('koa');
const json = require("koa-json");
const koaRouter = require('koa-router');
const koaLogger =require('koa-logger');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const authRoutes =require('./routes/auth');

const port =7000
const app = new koa();
const router = koaRouter();
dotenv.config()


// app.use('api/user',authRoutes);
// mongoose connection
mongoose.connect(process.env.MONGOURL,{useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true},() => {
    console.log(' connected to mongodb')
    });

//middleware using json

app.use(json());

//router middleware
app.use(router.routes()).use(router.allowedMethods())
router.get('/home',ctx =>(ctx.body ={text:'welcome to koa'}));

app.listen(port,()=>{
    console.log('port was connected');
})

app.use(authRoutes.routes());