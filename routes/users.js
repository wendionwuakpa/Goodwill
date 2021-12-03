const express = require('express');
const router = express.Router(); 
const controller = require("./controller"); 


/**
 * Create a new user account.
 * 
 * @id POST api/users 
 * 
 * @param   {String} username - username for new user account
 * @param   {String} password - password for new user account
 * @return  {User} - a newly created user
 * @throws  {400} - if username already exists w/message
 * @throws  {500} - if error in controller call
 */
router.post(
    '/', 
   async (req, res) => {
        // POST has req.body
        let username = req.body.username;
        let password = req.body.password;
        const user = await controller.addUserWithCredentials(username, password);
        let status = 200; // status code for ok
        if (typeof user == "string") {
            if (user.includes("Something")) {
                status = 500; // status code for internal server error
            } else {
                status = 400; // status code for bad request
            }
        }
        res.status(status).json(user).end();
});


/**
 * Get user w/credentials
 * 
 * @id GET api/users/:username?/:password?
 * 
 * @param   {String} username - username of account
 * @param   {String} password - password of account
 * @return  {User} - a user
 * @throws  {401} - if credentials are invalid w/message
 * @throws  {500} - if error in controller call
 */
router.get('/:username?/:password?', 
    async (req, res) => {
        // GET has req.params
        let username = req.params.username;
        let password = req.params.password;
        const user = await controller.getUserWithCredentials(username, password);
        let status = 200; // status code for ok
        if (typeof user == "string") {
            if (user.includes("Something")) {
                status = 500; // status code for internal server error
            } else {
                status = 401; // status code for unauthorized
            }
        }
        res.status(status).json(user).end();
});

module.exports = router;