const bcrypt = require("bcryptjs");
const {
  createUser,
  findUser,
  updateUser,
  verificationAccount,
  getUserById,
} = require("../models/user");
const generateToken = require("../helpers/jwt-generate");
const emailer = require("../middlewares/emailer");
const otpGenerator = require("otp-generator");
const cloudinary = require("../configs/cloud");
const { response } = require("../helpers/common");

const port = process.env.PORT;
const host = process.env.HOST;

const user = {
  register: async (req, res) => {
    let {
      rows: [user],
    } = await findUser(req.body.email);
    console.log(user);

    if (user != undefined) {
      return response(
        res,
        409,
        false,
        [],
        "Register failed, email already used"
      );
    } else {
      console.log(user);
      newOtp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      console.log(newOtp);
      let password = bcrypt.hashSync(req.body.password);
      let data = {
        email: req.body.email,
        password,
        username: req.body.username,
        phone: req.body.phone,
        otp: newOtp,
      };
      console.log(data);
      try {
        const result = await createUser(data);
        if (result) {
          console.log(result);
          let verifyURL = `http://${host}:${port}/users/${req.body.email}/${newOtp}`;
          let sendEmail = emailer(data.email, newOtp, verifyURL, data.username);
          if (sendEmail == "Email not send") {
            return response(res, 400, false, [], "Can't sent otp to email");
          }
          response(
            res,
            200,
            true,
            [],
            "Register success, please check your email to verification"
          );
        }
      } catch (error) {
        console.log(error);
        response(res, 400, false, error, "Register failed");
      }
    }
  },

  login: async (req, res) => {
    console.log("email", req.body.email);
    console.log("password", req.body.password);
    let {
      rows: [user],
    } = await findUser(req.body.email);
    if (!user) {
      return response(res, 404, false, null, "User not found");
    }
    if (user.verification == 0) {
      return response(
        res,
        401,
        false,
        null,
        "Access denied, user not verified"
      );
    }
    const password = req.body.password;
    const validation = bcrypt.compareSync(password, user.password);
    if (!validation) {
      return response(res, 400, false, null, "Password incorrect");
    }
    delete user.password;
    delete user.otp;
    delete user.verification;
    let payload = {
      email: user.email,
      id: user.id,
    };
    user.token = generateToken(payload);
    console.log(user.token);
    res.cookie("token", user.token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });
    response(res, 200, true, user, "Login success");
  },

  otp: async (req, res) => {
    console.log("email", req.body.email);
    console.log("otp", req.body.otp);
    let {
      rows: [user],
    } = await findUser(req.body.email);
    if (!user) {
      return response(res, 404, false, null, "User not found");
    }
    console.log(user.otp);
    if (user.otp == req.body.otp) {
      const result = await verificationAccount(req.body.email);
      return response(res, 200, true, [], "Successfuly verified account");
    }
    return response(res, 401, false, null, "Access denied, otp is incorrect");
  },

  update: async (req, res, next) => {
    try {
      const id = req.payload.id;
      console.log(id);
      const {
        photo: [photo],
      } = req.files;
      req.body.photo = photo.path;
      const result = await updateUser(id, req.body);
      return response(res, 200, true, result, "Success update user data");
    } catch (error) {
      console.log(error);
      return response(res, 400, false, error, "Update user data failed");
    }
  },
  get: async (req, res) => {
    try {
      const id = req.payload.id;
      console.log(id);
      const data = await getUserById(id);
      return response(res, 200, true, data.rows, "Get user by ID success");
    } catch (error) {
      return response(res, 400, false, error, "Get user by ID failed");
    }
  },
};

exports.user = user;
