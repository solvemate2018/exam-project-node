const userRepo = require("./userRepo.js");
const {
  validatePassword,
  validateEmail,
} = require("../../../config/validation.js");
async function login(req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    await validateUser(email, password);
    let session = req.session;
    if (session.user != undefined) {
      throw new Error(
        "You cannot log in while there is already someone logged in!"
      );
    }
    session.user = await userRepo.login(email, password);
    res.send({ msg: "Successfully logged!" });
  } catch (error) {
    next(error);
  }
}

async function register(req, res, next) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const repeatPassword = req.body.repeatPassword;
    if (repeatPassword == undefined) {
      throw new Error("The repeat Password is empty");
    }
    await validateUser(email, password, repeatPassword);
    let session = req.session;
    if (session.user != undefined) {
      throw new Error(
        "You cannot register in while there is already someone logged in!"
      );
    }
    session.user = await userRepo.register(email, password);
    res.send({ msg: "Successfully registered!" });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    let session = req.session;
    if (session.user == undefined) {
      throw new Error("You cannot log out without log in first!");
    }
    session.user = undefined;
    res.send({ msg: "Successfully logged out!" });
  } catch (error) {
    next(error);
  }
}

async function validateUser(email, password, repeatPassword) {
  await validateEmail(email);
  await validatePassword(password);
  if (repeatPassword)
    if (password != repeatPassword)
      throw new Error("The passwords are not matching");
}

exports.register = register;
exports.login = login;
exports.logout = logout;
