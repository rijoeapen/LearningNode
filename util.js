const fs = require("fs");

const add = (p1, p2) => {
  return p1 + p2;
};

const sub = (p1, p2) => {
  return p1 - p2;
};

const divide = (p1, p2) => {
  return p1 / p2;
};

const todoFileWrite = (list) => {
  fs.writeFile("todo.json", JSON.stringify(list, null, 4), (err) => {
    if (err) throw err;
    console.log("File updated successfully.");
  });
};

const newTodoKeys = ["item"];
const updateTodoKeys = ["editId", "updateItem"];
const completeTodoKeys = ["id", "item", "complete"];


const validate = (req, res, keys) => {
  const error = {
    missingAttr: [],
    matchInput: true,
  };

  const reqBodyKeys = Object.keys(req.body);

  for (const key of keys) {
    if (!(key in req.body)) {
      error.missingAttr.push(key);
    }
  }

  for (const key of reqBodyKeys) {
    const match = keys.includes(key);
    if (!match) {
      error.matchInput = false;
      break;
    }
  }

  if (error.missingAttr.length > 0) {
    return res.status(400).json({
      message: `Missing attribute: ${error.missingAttr.join(",")}`,
    });
  }

  if (!error.matchInput) {
    return res.status(400).json({
      message: `Wrong input`,
    });
  }
};

module.exports = { add, sub, divide, todoFileWrite, newTodoKeys, updateTodoKeys, completeTodoKeys, validate };
