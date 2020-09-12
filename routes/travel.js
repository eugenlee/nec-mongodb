const router = require('express').Router();
const auth = require('../auth')
let Travel = require('../models/travel.model');

router.route('/').get((req, res) => {
  Travel.find()
    .then(travels => res.json(travels))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(auth, (req, res) => {
  const continent = req.body.continent;
  const image = req.body.image;
  const city = req.body.city;
  const country = req.body.country;
  const link = req.body.link;

  const newTravel = new Travel({
    continent,
    image,
    city,
    country,
    link,
  });

  newTravel.save()
  .then(() => res.json('Travel Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:_id').get((req, res) => {
  Travel.findById(req.params._id)
    .then(travel => res.json(travel))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:_id').delete(auth, (req, res) => {
  Travel.findByIdAndDelete(req.params._id)
    .then(() => res.json('Travel Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:_id').post(auth, (req, res) => {
  Travel.findById(req.params._id)
    .then(travel => {
      travel.continent = req.body.continent;
      travel.image = req.body.image;
      travel.city = req.body.city;
      travel.country = req.body.country;
      travel.link = req.body.link;

      travel.save()
        .then(() => res.json('Travel Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;