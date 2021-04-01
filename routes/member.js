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

// Send a PUT request to /member/:id/edit to UPDATE (edit) a family member

router.put('/member/:id/edit', async (req, res) => {
  let member;
  try {
    member = await Member.findByPk(req.params.id);
    if(member) {
      await member.update(req.body);
      res.redirect("/member/" + member.id); 
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      member = await Member.build(req.body);
      member.id = req.params.id; // make sure correct member gets updated
      res.render("edit")
    } else {
      throw error;
    }
  }
});

// Send a DELETE request to /member/:id/delete to DELETE a family member

router.delete("/member/:id/delete", async(req,res, next) => {
  const member = await Member.findByPk(req.params.id);
  if(member) {
    await member.destroy();
    res.redirect("/");
  } else {
    res.sendStatus(404);
  }
});




module.exports = router;