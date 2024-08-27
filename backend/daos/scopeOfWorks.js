const mongoose = require("mongoose");

const scopeOfWorksSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const ScopeOfWorks = mongoose.model("ScopeOfWorks", scopeOfWorksSchema);

function createScopeOfWorks(name) {
  return ScopeOfWorks.create({ name });
}

function findAllScopeOfWorks() {
  return ScopeOfWorks.find({});
}

module.exports = {
  createScopeOfWorks,
  findAllScopeOfWorks,
};
