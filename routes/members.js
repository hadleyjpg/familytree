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

/* GET members listing. */
router.get('/', asyncHandler(async (req, res) => {
  const members = await Member.findAll();
  res.render("members/index", { members });
}));

/* Create a new member form. */
router.get('/new', (req, res) => {
  res.render("members/new", { member: {} });
});

/* POST create member. */
router.post('/', asyncHandler(async (req, res) => {
  let member;
  try {
    member = await Member.create(req.body);
    res.redirect("/members/" + member.id);
  } catch(error) {
      if(error.name === "SequelizeValidationError") { // checking the error
        member = await Member.build(req.body);
        res.render("members/new", { member, errors: error.errors })
      } else {
        throw error; // error caught in the asyncHandler's catch block
      }
  }
}));

/* Edit member form. */
router.get("/:id/edit", asyncHandler(async(req, res) => {
  const member = await Member.findByPk(req.params.id);
  if(member) {
    res.render("members/edit", { member });
  } else {
    res.sendStatus(404);
  } 
}));

/* GET individual member. */
router.get("/:id", asyncHandler(async (req, res) => {
  const member = await Member.findByPk(req.params.id);
  if(member) {
    res.render("members/show", { member, title: member.firstname});
  } else {
    res.sendStatus(404);
  } 
}));

/* Update an member. */
router.post('/:id/edit', asyncHandler(async (req, res) => {
  let member;
  try {
    member = await Member.findByPk(req.params.id);
    if(member) {
      await member.update(req.body);
      res.redirect("/members/" + member.id); 
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      member = await Member.build(req.body);
      member.id = req.params.id; // make sure correct member gets updated
      res.render("members/edit", { member, errors: error.errors })
    } else {
      throw error;
    }
  }
}));

/* Delete member form. */
router.get("/:id/delete", asyncHandler(async (req, res) => {
  const member = await Member.findByPk(req.params.id);
  if(member) {
    res.render("members/delete", { member });
  } else {
    res.sendStatus(404);
  }
}));

/* Delete individual member. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  const member = await Member.findByPk(req.params.id);
  if(member) {
    await member.destroy();
    res.redirect("/members");
  } else {
    res.sendStatus(404);
  }
}));

module.exports = router;