const { verifySignUp } = require("../middleware");
const controller = require("../controllers/usuario.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/all", controller.allAccess);


  app.post(
    "/api/auth/signup",
    [
      verifySignUp.validateRegister
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};