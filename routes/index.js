const express = require('express');
const router = express.Router();



router.use(express.json());

// Send a GET request to / to READ a list of family members

router.get('/', async (req, res) => {
    res.render("index");
});

// Send a GET request to /:id to READ (view) a family member

router.get('/:id', async (req, res) => {
    res.render("member");
});

// Send a POST request to / to CREATE a new family member

router.post('/', async (req, res) => {
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