module.exports = app => {
    const tccBacklog = require("../controllers/tccBacklog.controller");
  
    var router = require("express").Router();
  
    router.post("/", tccBacklog.create);
  
    router.get("/", tccBacklog.findAll);

    router.get("/:id", tccBacklog.findOne);
  
    router.put("/:id", tccBacklog.update);
  
    router.delete("/:id", tccBacklog.delete);
    
    router.get("/filter/prioridade-alta", tccBacklog.findAllPrioridadeAlta);

    router.get("/filter/prioridade-media", tccBacklog.findAllPrioridadeMedia);

    router.get("/filter/prioridade-baixa", tccBacklog.findAllPrioridadeBaixa);

    router.get("/filter/status-pendente", tccBacklog.findAllStatusPendente);

    router.get("/filter/status-fazendo", tccBacklog.findAllStatusFazendo);
    
    router.get("/filter/status-finalizado", tccBacklog.findAllStatusFinalizado);

    app.use("/api/tccBacklog", router);

  };