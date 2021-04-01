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

router.get('/', asyncHandler(async (req, res) => {
  const members = await Member.findAll();
  res.render("index");
}));

// Send a GET request to /member/:id to READ (view) a family member

router.get('/member/:id', asyncHandler(async (req, res) => {
  const member = await Member.findByPk(req.params.id);
  if(member) {
    res.render("member", { member });
  } else {
    res.render("error");
    res.sendStatus(404);
  }
}));

// Send a POST request to / to CREATE a new family member

router.post('/', asyncHandler(async (req, res) => {
  let member;
  try {
    member = await Member.create(req.body);
    res.redirect("/members/" + member.id);
  } catch(error) {
      if(error.name === "SequelizeValidationError") {
        member = await Member.build(req.body);
        res.render("members/new", { member, errors: error.errors })
      } else {
        throw error;
      }
  }
}));

// Send a PUT request to /member/:id/edit to UPDATE (edit) a family member

router.put('/member/:id/edit', asyncHandler(async (req, res) => {
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
      member.id = req.params.id;
      res.render("edit")
    } else {
      throw error;
    }
  }
}));


// DELETE confirmation page

router.get("/member/:id/delete", asyncHandler(async (req, res) => {
  const member = await Member.findByPk(req.params.id);
  if(member) {
    res.render("members/delete", { member, title: "Delete Article" });
  } else {
    res.sendStatus(404);
  }
}));


// Send a DELETE request to /member/:id/delete to DELETE a family member

router.delete("/member/:id/delete", asyncHandler(async (req,res, next) => {
  const member = await Member.findByPk(req.params.id);
  if(member) {
    await member.destroy();
    res.redirect("/");
  } else {
    res.sendStatus(404);
  }
}));




module.exports = router;