module.exports = app => {
    const tccBacklog = require("../controllers/tccBacklog.controller");
  
    var router = require("express").Router();
  
    router.post("/", tccBacklog.create);
  
    router.get("/", tccBacklog.findAll);

    router.get("/:id", tccBacklog.findOne);

    router.put("/:id", tccBacklog.update);
  
    router.delete("/:id", tccBacklog.delete);
    
    router.get("/usuario/:id/filter/prioridade-alta", tccBacklog.findAllPrioridadeAlta);

    router.get("/usuario/:id/filter/prioridade-media", tccBacklog.findAllPrioridadeMedia);

    router.get("/usuario/:id/filter/prioridade-baixa", tccBacklog.findAllPrioridadeBaixa);

    router.get("/usuario/:id/filter/status-pendente", tccBacklog.findAllStatusPendente);

    router.get("/usuario/:id/filter/status-fazendo", tccBacklog.findAllStatusFazendo);
    
    router.get("/usuario/:id/filter/status-finalizado", tccBacklog.findAllStatusFinalizado);

    app.use("/api/tccBacklog", router);

  };