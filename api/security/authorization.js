function authorize(accessRoles, onlyByCurrentUser) {
  return (req, res, next) => {
    if (accessRoles == undefined) {
      throw new Error(
        'Please set proper roles for this path!(To be open to everyone write ["FreeAccess"])'
      );
    } else if (accessRoles[0] == "FreeAccess") {
      next();
    } else if (req.session.user == undefined) {
      res.send({ error: "Please login before going to this page!" });
    } else if (
      accessRoles.includes(req.session.user.role)
    ) {
      next();
    } else {
      res.status(403);
      res.send({
        error: "You don't have permission to visit this page",
      });
    }
  };
}

exports.authorize = authorize;
