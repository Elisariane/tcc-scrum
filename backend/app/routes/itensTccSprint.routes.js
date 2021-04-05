module.exports = app => {
    const itensTccSprint = require("../controllers/itensTccSprint.controller");
  
    var router = require("express").Router();
  
    router.post("/", itensTccSprint.create);
  
    router.get("/", itensTccSprint.findAll);

    router.get("/sprint/:id", itensTccSprint.findAllByUsuario);
  
    router.get("/:id", itensTccSprint.findOne);
  
    router.put("/:id", itensTccSprint.update);
  
    router.delete("/:id", itensTccSprint.delete);
  
    app.use('/api/itensTccSprint', router);
  };