const jwt = require('jsonwebtoken');

 module.exports = function (ctx,next){
    console.log('ctx',ctx)
  const token = ctx.request.headers;
  console.log('token',token)
  if (!token) return ctx.status = 401; ctx.body = 'Access Denied';

try {
    const verified = jwt.verified(token,process.env.TOKENSECREAT);
    ctx.request.body.user = verified;
} catch (error) {
    ctx.status = 400 ; ctx.body = 'Invalied Token'
}

}