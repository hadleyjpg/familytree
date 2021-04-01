const express = require('express');
const router = express.Router();
const Member = require('../models').Member;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // Forward error to the global error handler
      next(error);
    }
  }
}

// Send a GET request to / to READ a list of family members

router.get('/', async (req, res) => {
  const members = await Member.findAll();
  res.render("index");
});

// Send a GET request to /member/:id to READ (view) a family member

router.get('/member/:id', async (req, res) => {
  res.render("member");
});

// Send a POST request to / to CREATE a new family member

router.post('/', async (req, res) => {
  const member = await Member.create(req.body);
  res.render("index");
});

// Send a PUT request to /:id/edit to UPDATE (edit) a family member

router.put('/:id/edit', async (req, res) => {
  res.render("edit");
});

// Send a DELETE request to /:id to DELETE a family member

router.delete("/:id/delete", async(req,res, next) => {
  res.render("delete");


  res.redirect("/");
});




module.exports = router;