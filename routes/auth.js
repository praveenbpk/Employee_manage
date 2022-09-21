const Router= require('koa-router');

const router = new Router();





router.get('/test',async(ctx) =>{
    try {
        ctx.body={
            status:'succsess',
            data:'pong'
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;