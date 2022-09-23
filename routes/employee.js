const Router = require("koa-router");
const Employee = require("../models/employee");
const varified = require('./verificationToken')
// const router = require('./auth');

const router = new Router();

// employeee create
router.post("/employee",varified, async (ctx) => {
  try {
    const employee = new Employee({
      firstName: ctx.request.body.firstName,
      lastName: ctx.request.body.lastName,
      email: ctx.request.body.email,
      location: ctx.request.body.location,
      adharId: ctx.request.body.adharId,
      experience: ctx.request.body.experience,
    });
    ctx.body = await employee.save();
    ctx.status = 200;
  } catch (error) {
   ctx.status= 400
   ctx.body ='its a bad request'
  }
});

module.exports = router;
