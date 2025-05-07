function adminAuthMiddleware(req, res, next) {
  console.log("Admin Auth Middleware", req.session);
  if (req.session?.user && req.session.user.role === 'admin') {
    return next();
  }
  return res.redirect('/login'); // Or res.status(403).json({ message: 'Unauthorized' })
}

export default adminAuthMiddleware;  // Use `export default` for ES module syntax
