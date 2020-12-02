const models = require('../models');

const { Horror } = models;

// Gets three random horrors from the server to build a random poem
const welcomePage = (req, res) => {
  Horror.HorrorModel.returnThreeRandomHorrors((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error ocurred' });
    }
    const data = [docs[0].poem[0], docs[1].poem[1], docs[2].poem[2]];
    return res.render('app', {
      csrfToken: req.csrfToken(),
      userName: req.session.account.username,
      poem0: data[0],
      poem1: data[1],
      poem2: data[2],
    });
  });
};

// The list of horrors on the server, could add more attributes
const compendium = (req, res) => {
  Horror.HorrorModel.getHorrors((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error ocurred' });
    }
    const names = [];
    docs.forEach((element) => {
      names.push(element.name);
    });
    return res.render('compendium', {
      csrfToken: req.csrfToken(),
      horrors: names,
    });
  });
};

module.exports = {
  welcomePage,
  compendium,
};
