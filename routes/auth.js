const Router = require("koa-router");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = new Router();

// REGiSTER

router.post("/register", async (ctx, next) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(ctx.request.body.password, salt);
    const user = new User({
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: hashedPassword,
    });
    // console.log(user);
    ctx.body = await user.save();
    ctx.status = 200;
  } catch (error) {
    console.log("error", error);
  }
});

// LOGIN
router.post("/login", async (ctx) => {
  console.log("error", ctx);
  try {
    const user = await User.findOne({ email: ctx.request.body.email });
    console.log('user',user)
    if (!user) ctx.response.status = 404;
    ctx.body = "user not found to";

    const validPassword = await bcrypt.compare(
      ctx.request.body.password,
      user.password
    );

    const payload = { _id: user._id };
    const token = jwt.sign(payload, process.env.TOKENSECREAT);
    ctx.body = token;
    if (validPassword === true) {
      ctx.response.status = 200;
      ctx.body.header= {
        message: "Successfully logged in!",
        data: user,
        token: jwt.sign(
          {
            data: { _id: user._id },
            //set token expiration timing
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
          },
          process.env.TOKENSECREAT
        ),
      };
    }
    if (!validPassword) {
      ctx.response.status = 400;
      ctx.body = "Invalid password";
      return ctx;
    }
  
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = " its error";
  }
  //create and assign a token
});

module.exports = router;
