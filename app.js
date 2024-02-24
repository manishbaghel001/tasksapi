require("dotenv").config();

const express = require('express');
const { logReqRes } = require('./middleware')
const { connectMongoDB } = require('./connections.js')

const cors = require('cors');
const app = express();
app.use(cors());

const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@tasks.u3s8du2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
// const DB = "mongodb://127.0.0.1:27017/tasks"

connectMongoDB(DB)
    .then(() => console.log("Tasks MongoDB Connected"))
    .catch((err) => console.log("Tasks Mongo Error", err))


const tasks = require('./routes/tasks');
const todos = require('./routes/todos');
const mode = require('./routes/mode');
const image = require('./routes/image');
const logs = require('./models/logs')

app.use(logReqRes(logs))
app.use('/api/tasks', tasks);
app.use('/api/todos', todos);
app.use('/api/mode', mode);
app.use('/api/image', image);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});