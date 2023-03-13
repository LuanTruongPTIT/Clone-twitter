const requireLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect('/trang-chu')
  } else {
    next();
  }
}
const requireHome = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    return res.redirect('/login-user')
  }
}

module.exports = { requireLogin, requireHome }