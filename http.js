const express = require("express");
const app = express();
const cors = require("cors");
const uuid = require("uuid");
const fs = require("fs");
const {
  todoFileWrite,
  newTodoKeys,
  updateTodoKeys,
  completeTodoKeys,
  validate,
} = require("./util");

app.use(cors());
app.use(express.json());
const PORT = 4001;
let todoList = require("./todo.json");

// const todos = [
//   { item: "test1", complete: false, id: uuid.v4() },
//   { item: "test2", complete: false, id: uuid.v4() },
// ];

// fs.writeFileSync("todo.json", JSON.stringify(todos, null, 4));

app.get("/api/todos", (req, res) => {
  res.json(todoList);
});

app.post("/api/todo", (req, res) => {
  const { item } = req.body;
  const error = validate(req, res, newTodoKeys);

  if (error) {
    return error;
  }

  const newId = uuid.v4();
  todoList = {
    [newId]: { item: item, complete: false, id: newId },
    ...todoList,
  };
  todoFileWrite(todoList);
  res.json(todoList);
});

app.put("/api/todo/update", (req, res) => {
  const { editId, updateItem } = req.body;
  const error = validate(req, res, updateTodoKeys);

  if (error) {
    return error;
  }

  if (
    editId in todoList &&
    updateItem.trim().length !== 0 &&
    todoList[editId]["item"] !== updateItem
  ) {
    todoList = {
      ...todoList,
      [editId]: {
        ...todoList[editId],
        item: updateItem,
      },
    };
    todoFileWrite(todoList);
    res.json(todoList);
  } else {
    res.status(400).json({
      message: `Wrong input`,
    });
  }
});

app.put("/api/todo/complete", (req, res) => {
  const { id } = req.body;
  const error = validate(req, res, completeTodoKeys);

  if (error) {
    return error;
  }

  if (id in todoList) {
    todoList = {
      ...todoList,
      [id]: {
        ...todoList[id],
        complete: true,
      },
    };
    todoFileWrite(todoList);
    res.json(todoList);
  } else {
    res.status(400).json({
      message: `Wrong input`,
    });
  }
});

app.delete("/api/todo/delete", (req, res) => {
  const { id } = req.body;
  const error = validate(req, res, completeTodoKeys);

  if (error) {
    return error;
  }

  if (id in todoList) {
    delete todoList[id];
    todoFileWrite(todoList);
    res.json(todoList);
  } else {
    res.status(400).json({
      message: `Wrong input`,
    });
  }
});

app.listen(PORT, () => console.log(`Server started in ${PORT}`));
