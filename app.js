const express = require('express');
const app = express();
const { logReqRes } = require('./middleware')
const { connectMongoDB } = require('./connections.js')

const cors = require('cors');
app.use(cors());

// const DB = "mongodb+srv://manish20171999:Manish%401234@tasks.u3s8du2.mongodb.net/tasks"
const DB = "mongodb+srv://manish20171999:Manish@1234@tasks.u3s8du2.mongodb.net/tasks?retryWrites=true&w=majority"
const localDB = "mongodb://127.0.0.1:27017/tasks"

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