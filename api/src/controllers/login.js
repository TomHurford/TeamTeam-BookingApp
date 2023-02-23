// LOGIN CONTROLLER
const prisma = require("../../prisma/prisma.js");
const jwt = require("jsonwebtoken");

const auth = require("../utils/jwt_auth.js");
const { randomString } = require("../utils/random.js");

// This function is used to login a user
async function login(email, password, res) {
  if (email === undefined || password === undefined) {
    return res
      .status(409)
      .send({ token: null, message: "Request body cannot be empty" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    if (user.password === password) {
      const token = await auth.generateToken(user);
      res.status(200).send({ token: token, message: "Login successful" });
    } else {
      res.status(401).send({ token: null, message: "Invalid password" });
    }
  } else {
    res.status(404).send({ token: null, message: "User not found" });
  }
}

// This function is used to logout a user
async function logout(req, res) {
  // const auth_resopnse =
  // Get the token from the request header
  //const token = req.headers['authorization'].split(' ')[1]

  // Try to verify the token using the auth.authenticate function
  try {
    const auth_response = await auth.authenticate(req);
    if (auth_response) {
      // release token
      res.status(200).send({ message: "Logout successful" });
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(401).send({ message: "Unauthorized" });
  }
}

// This function is used to reset a user's password, the new password is sent in the request body
async function reset(req, res) {
  if (
    req.body === undefined ||
    req.body.verificationCode === undefined ||
    req.body.userId === undefined ||
    req.body.new_password === undefined
  ) {
    return res
      .status(409)
      .send({ token: null, message: "Request body cannot be empty" });
  }

  const verification = await prisma.verifications.findFirst({
    where: {
      verificationCode: req.body.verificationCode,
      userId: req.body.userId,
      verificationType: "forgotPassword",
    },
  });

  // Verify the code
  if (verification) {
    // If the users password is the same as the old password, return an error
    let user = await prisma.user.findUnique({
      where: {
        id: req.body.userId,
      },
    });
    if (user.password === req.body.new_password) {
      return res
        .status(409)
        .send({
          token: null,
          message: "New password cannot be the same as the old password",
        });
    }

    // If the new password is empty, return an error
    if (req.body.new_password === "") {
      return res
        .status(409)
        .send({ token: null, message: "New password cannot be empty" });
    }

    // Update the user's password
    user = await prisma.user.update({
      where: {
        id: req.body.userId,
      },
      data: {
        password: req.body.new_password,
      },
    });
    // Delete forget password request
    await prisma.verifications.delete({
      where: {
        id: verification.id,
      },
    });

    // Create a new JWT token
    const token = await auth.generateToken(user);
    res.status(200).send({ token: token });
  } else {
    res.status(401).send({ token: null, message: "Unauthorized" });
  }
}

// This function is used to sign up a new user
async function signup(req, res) {
  // Check that the request body is not empty and contains the correct properties
  if (
    req.body === undefined ||
    req.body.email === undefined ||
    req.body.password === undefined ||
    req.body.name === undefined
  ) {
    return res
      .status(409)
      .send({ token: null, message: "Request body cannot be empty" });
  }

  // Check if the user already exists
  let user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    return res
      .status(409)
      .send({ token: null, message: "User already exists" });
  }

  // Check that name, email and password are not empty
  if (
    req.body.name === "" ||
    req.body.email === "" ||
    req.body.password === ""
  ) {
    return res
      .status(409)
      .send({
        token: null,
        message: "Name, email and password cannot be empty",
      });
  }

  // Create a new user
  user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      type: {
        connect: {
          id: 1,
        },
      },
    },
  });

  // Create verification code
  verifyCode = randomString();
  verification = await prisma.verifications.create({
    data: {
      verificationCode: verifyCode,
      verificationType: "newUser",
      userId: user.id,
    },
  });

  // Mail the verification code

  // Send the JWT token in the response
  res.status(200).send();
}

async function forgotPassword(req, res) {
  if (
    req.body.email === undefined ||
    req.body.email === undefined ||
    req.body.email === ""
  ) {
    return res
      .status(409)
      .send({ token: null, message: "Request body cannot be empty" });
  }

  // Check if the user already exists
  let user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    //Add code to table
    //Email link with code to user

    // Create verification code
    verifyCode = randomString();
    verification = await prisma.verifications.create({
      data: {
        verificationCode: verifyCode,
        verificationType: "forgotPassword",
        userId: user.id,
      },
    });

    // Mail the verification code

    return res.status(200).send();
  }

  res.status(404).send({ message: "User Not Found" });
}

// This function is used to login a user
async function verify(req, res) {
  if (
    req.body === undefined ||
    req.body.verificationCode === undefined ||
    req.body.verificationType === undefined ||
    req.body.userId === undefined
  ) {
    return res.status(409).send({ message: "Request body cannot be empty" });
  }

  const verification = await prisma.verifications.findFirst({
    where: {
      verificationCode: req.body.verificationCode,
      userId: req.body.userId,
      verificationType: "newUser",
    },
  });

  if (!verification)
    return res
      .status(404)
      .send({ token: null, message: "Verification Code not found" });

  // Delete verification request
  await prisma.verifications.delete({
    where: {
      id: verification.id,
    },
  });

  return res.status(200).send();
}

module.exports = {
  login,
  logout,
  reset,
  signup,
  forgotPassword,
  verify,
};
