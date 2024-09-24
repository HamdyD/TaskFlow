const express = require("express");
const app = express();
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoute");

app.use(express.json());
app.use("/api/tasks", taskRoutes);

const PORT = 3000;
connectDB().then(
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
);
