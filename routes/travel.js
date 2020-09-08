const router = require('express').Router();
let Travel = require('../models/travel.model');

router.route('/').get((req, res) => {
  Travel.find()
    .then(travels => res.json(travels))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const continent = req.body.continent;
  const image = req.body.image;
  const city = req.body.city;
  const country = req.body.country;
  const link = req.body.link;
  const mainBody = req.body.mainBody;

  const newTravel = new Travel({
    continent,
    image,
    city,
    country,
    link,
    mainBody
  });

  newTravel.save()
  .then(() => res.json('Travel Added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Travel.findById(req.params.id)
    .then(travel => res.json(travel))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Travel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Travel Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Travel.findById(req.params.id)
    .then(travel => {
      travel.continent = req.body.continent;
      travel.image = req.body.image;
      travel.city = req.body.city;
      travel.country = req.body.country;
      travel.link = req.body.link;
      travel.mainBody = req.body.mainBody;

      travel.save()
        .then(() => res.json('Travel Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;