module.exports = app => {
    const sprint = require("../controllers/sprint.controller");
  
    var router = require("express").Router();
  
    router.post("/", sprint.create);
  
    router.get("/", sprint.findAll);
  
    router.get("/:id", sprint.findOne);
  
    router.put("/:id", sprint.update);
  
    router.delete("/:id", sprint.delete);
  
    app.use('/api/sprint', router);
  };