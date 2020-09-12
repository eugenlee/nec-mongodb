const router = require('express').Router();
let Signup = require('../models/signups.model');

router.route('/').post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const question = req.body.question;

  const newSignup = new Signup({
    firstName,
    lastName,
    email,
    question,
  });

  newSignup.save()
  .then(() => res.json('Signed up!'))
  .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;