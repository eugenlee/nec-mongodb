const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../auth')
require('dotenv').config();

router.route('/').post((req, res) => {
  const { email, password } = req.body;

  if ( !email || !password ) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  User.findOne({ email }) 
    .then(user => {
        if (!user) return res.status(400).json({ msg: 'User does not exist!' })
    
    bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' })

            jwt.sign(
                { id: user.id },
                process.env.JWTSECRET,
                { expiresIn: 3600 },
                (err, token) => {
                    if(err) throw err;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    })
                }
            )
        })

    })
});

router.route('/user').get(auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;