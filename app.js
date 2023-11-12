require("dotenv").config();

const express = require('express');
const { logReqRes } = require('./middleware')
const { connectMongoDB } = require('./connections.js')

const cors = require('cors');
const app = express();
app.use(cors());
console.log(process.env.DB_USER, "klklkl");
console.log(process.env.DB_PASS, "klklkl");

console.log(process.env.DB_NAME, "klklkl");
const user = process.env.DB_USER
console.log(user, "klklklklkl");
const DB = `mongodb+srv://manishbaghel:${process.env.DB_PASS}@tasks.u3s8du2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
// const DB = "mongodb://127.0.0.1:27017/tasks"
console.log(DB, "klklklklkl");

connectMongoDB(DB)
    .then(() => console.log("Tasks MongoDB Connected"))
    .catch((err) => console.log("Tasks Mongo Error", err))


const tasks = require('./routes/tasks');
const todos = require('./routes/todos');
const mode = require('./routes/mode');

app.use(logReqRes("./data/log.txt"))
app.use('/api/tasks', tasks);
app.use('/api/todos', todos);
app.use('/api/mode', mode);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});