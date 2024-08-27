const scopeOfWorksDAO = require("../daos/scopeOfWorks");

async function getScopeOfWorks(req, res) {
  try {
    const scopeOfWorks = await scopeOfWorksDAO.findAllScopeOfWorks();
    if (!scopeOfWorks) {
      return res.status(404).json({ message: "No Works found" });
    }
    res.json(scopeOfWorks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  getScopeOfWorks,
};
