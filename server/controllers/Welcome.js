const welcomePage = (req, res) => {
  res.render('app', { csrfToken: req.csrfToken() });
};

module.exports = {
  welcomePage,
};
