import express from "express";
import cors from "cors";
import { fetchTasks, createTasks } from "./task.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

if (process.env.DEVELOPMENT) {
  app.use(cors());
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/task", async (req, res) => {
  try {
    const tasks = await fetchTasks();

    res.send(tasks.Items);
  } catch (err) {
    res.status(400).send(`Error fetching tasks: ${err}`);
  }
});

app.post("/task", async (req, res) => {
  try {
    const task = req.body;

    console.log('malakian api index post 1 task:', task)
    console.log('malakian api index post 1 req.body.name:', req.body.name)
    console.log('malakian api index post 1 req.body.completed:', req.body.completed)
    
    

    const response = await createTasks(req.body.name, req.body.completed);

    res.send(response);
  } catch (err) {
    res.status(400).send(`Error creating tasks: ${err}`);
  }
});

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
}
