const UserMiddleware = {
  authUser(req, res, next) {
    try {
      const { permission } = req.headers.authorizer
      if (permission < 0) throw "Access denied"
      next();
    } catch (error) {
      throw error;
    }
  },
};

module.exports = UserMiddleware;
