const Contents = require("../models/Content");

exports.create = (req, res) => {
    if (!req.body.title) {
      res.status(400).send({ message: "Title can not be empty!" });
      return;
    }
    var content = new Contents({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
      category: req.body.category
    });
    content
      .save(content)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the blog."
        });
      });
  };

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Contents.find(condition)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving all blogs."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Contents.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Blog with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving blog with id=" + id });
    });
};

exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Contents.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Blog with id=${id}`
          });
        } else {
             Blogs.findById(id)
            .then(blog => {
                res.send({ message: "Blog was updated successfully.", blog: blog});
              })
            }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error while updating Blog with id=" + id
        });
      });
  };

exports.deleteOne = (req, res) => {
    const id = req.params.id;
    Contents.findByIdAndRemove(id)
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete Blog with id=${id}`
            });
        } else {
            res.send({ message: "Blog was deleted successfully.", blog: data}); 
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Could not delete Blog with id=" + id
        });
    });
};

exports.deleteAll = (req, res) => {
    Contents.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} delete successful!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };

exports.findAllPublished = (req, res) => {
    Contents.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while getting published blogs."
        });
    });
};
