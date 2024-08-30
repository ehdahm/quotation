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
    console.log(`userInfo in controller: ${userInfo}`);

    const createdUser = await authService.register(userInfo);
    console.log(`createdUser in controller: ${userInfo}`);
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

async function logout(req, res) {
  try {
    const { user_id } = req.user;
    console.log(`userid received in controller: ${user_id}`);

    const user = await authService.removeToken(user_id);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  register,
  fetchSaltAndIterations,
  login,
  logout,
};
