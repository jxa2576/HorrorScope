const welcomePage = (req, res) => {
  res.render('app', {
    csrfToken: req.csrfToken(),
    userName: req.session.account.username,
  });
};

module.exports = {
  welcomePage,
};
