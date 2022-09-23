const koa = require('koa');
const json = require("koa-json");
const koaRouter = require('koa-router');
const koaLogger =require('koa-logger');
const bodyParser = require('koa-bodyparser');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const authRoutes =require('./routes/auth');
const employeeRoutes = require('./routes/employee')

const port =7000
const app = new koa();
const router = koaRouter();
dotenv.config()

app.use(koaLogger());
app.use(bodyParser());
// app.use('api/user',authRoutes);
// mongoose connection
mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', err => {
    console.log('db connection error', err);
})

db.once('open', err => {
    console.log('db connected successfully');
})

//middleware using json

app.use(json());

//router middleware
app.use(router.routes()).use(router.allowedMethods())
router.get('/home',ctx =>(ctx.body ={text:'welcome to koa'}));

app.listen(port,()=>{
    console.log('port was connected');
})

app.use(authRoutes.routes());
app.use(employeeRoutes.routes());