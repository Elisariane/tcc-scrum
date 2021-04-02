module.exports = app => {
    const usuario = require("../controllers/usuario.controller");
  
    var router = require("express").Router();
  
    router.post("/", usuario.create);
  
    router.get("/", usuario.findAll);
    
    router.get("/allBy/:id", usuario.findAllByUsuario);
  
    router.get("/:id", usuario.findOne);
  
    router.put("/:id", usuario.update);
  
    router.delete("/:id", usuario.delete);
  
    app.use('/api/usuario', router);
  };