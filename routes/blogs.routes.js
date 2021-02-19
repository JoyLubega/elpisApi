
module.exports = app => {
    const contents = require("../controllers/blogs.controllers");
  
    var router = require("express").Router();

    router.post("/", contents.create);
    // router.post("/upload", contents.upload);
  
    router.get("/", contents.findAll);
  
    router.get("/published", contents.findAllPublished);
  
    router.get("/:id", contents.findOne);
  
    router.put("/:id", contents.update);
  
    router.delete("/:id", contents.deleteOne);
  
    router.delete("/", contents.deleteAll);
  
    app.use('/api/content', router);
  };
