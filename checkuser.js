function checkUser(req, res, next) {
  if (!req.query.userId) {
    return res.send('Bad!');
  }

  next();
}

module.exports = checkUser;