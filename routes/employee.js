const Router = require("koa-router");
const Employee = require("../models/employee");
// const varified = require("./verificationToken");
const router = require('./auth');

const router = new Router();

// employeee create
router.post("/employee", async (ctx) => {
  console.log(ctx)
  try {
    const employee = new Employee({
      firstName: ctx.request.body.firstName,
      lastName: ctx.request.body.lastName,
      email: ctx.request.body.email,
      location: ctx.request.body.location,
      adharId: ctx.request.body.adharId,
      experience: ctx.request.body.experience,
    });
    console.log(employee,'employee')
    ctx.body = await employee.save();
    ctx.status = 200;
  } catch (error) {
    ctx.status = 400;
    ctx.body = "its a bad request";
  }
});

// get employee
router.get("/:id", async (ctx) => {
  try {
    const employee = await Employee.findById(ctx.request.params.id);
    ctx.status = 200;
    ctx.body = employee;
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = " its error";
  }
});

// update a employee
router.put("/:id", async (ctx) => {
  console.log(ctx);
  try {
    const employee = await Employee.findById(ctx.request.params.id);
    console.log("emplyeee", employee);
    if (employee._id === ctx.request.body._id) {
      await employee.updateOne({ $set: ctx.request.body });
      ctx.status = 200;
      ctx.body = "employee has been updated";
    } else {
      ctx.status = 403;
      ctx.body = "you can update only ur employeeid";
    }
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = " its error";
  }
});

//delete a emplyoeee

router.delete("/:id", async (ctx) => {
  try {
    const employee = await Employee.findById(ctx.request.params.id);
    if (employee.id === ctx.request.body.id) {
      await employee.deleteOne();
      ctx.status = 200;
      ctx.body = "employee has been deleted";
    } else {
      ctx.status = 403;
      ctx.body = "you can only delete your employee id";
    }
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = " its error";
  }
});

module.exports = router;
