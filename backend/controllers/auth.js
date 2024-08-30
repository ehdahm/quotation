const authService = require("../service/auth");

async function login(req, res) {
  try {
    console.log(req.body);
    const credentials = req.body;
    console.log(`controller passing credentials: `, credentials);
    const user = await authService.login(credentials);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function register(req, res) {
  try {
    const userInfo = req.body;

    const createdUser = await authService.register(userInfo);

    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function fetchSaltAndIterations(req, res) {
  try {
    const { email } = req.query;
    console.log(`${email} received on the backend`);

    const userData = await authService.fetchSaltAndIterations(email);
    res.status(201).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  register,
  fetchSaltAndIterations,
  login,
};
