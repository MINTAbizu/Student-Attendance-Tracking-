const attendncsemiddleware = (req, res, next) => {
  if (req.session && req.session.user) {
    // User is authenticated, proceed to the next middleware or route handler
    return next();
  } else {
    // User is not authenticated, redirect to the login page
    return res.redirect('/login');
  }
}