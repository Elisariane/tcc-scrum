module.exports = app => {
    const aprovacaoSprint = require("../controllers/aprovacaoSprint.controller");
  
    var router = require("express").Router();
  
    router.post("/", aprovacaoSprint.create);
  
    router.get("/", aprovacaoSprint.findAll);
  
    router.get("/:id", aprovacaoSprint.findOne);
  
    router.put("/:id", aprovacaoSprint.update);
  
    router.delete("/:id", aprovacaoSprint.delete);
  
    app.use('/api/aprovacaoSprint', router);
  };