const Hero = require("./hero-model");
const ReadPreference = require("mongodb").ReadPreference;

require("./mongo").connect();

function get(req, res) {
  const docquery = Hero.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(heroes => {
      res.json(heroes);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function create(req, res) {
  const newHero = reqToHero(req);

  const hero = new Hero(newHero);
  hero.save(err => {
    if (err) res.status(500).send(err);
    res.json(newHero);
  });
}

function update(req, res) {
  const heroToUpdate = reqToHero(req);

  Hero.findOne({ id: heroToUpdate.id }, (err, hero) => {
    if (err) res.status(500).send(err);
    if (!hero) res.status(500).send("Hero not found");

    hero.name = heroToUpdate.name;
    hero.saying = heroToUpdate.saying;
    hero
      .save()
      .then(res.json(heroToUpdate))
      .catch(err => res.status(500).send(err));
  });
}

function destroy(req, res) {
  const id = req.params.id;

  Hero.findOneAndRemove({ id: id })
    .then(hero => {
      res.json(hero);
    })
    .catch(err => {
      res.status(500).send(err);
    });
}

function reqToHero(req) {
  return {
    id: req.body.id,
    name: req.body.name,
    saying: req.body.saying
  };
}

module.exports = { get, create, update, destroy };
