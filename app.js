const express = require('express');
const app = express();
const { logReqRes } = require('./middleware')
const { connectMongoDB } = require('./connections.js')

const cors = require('cors');
app.use(cors());

connectMongoDB("mongodb://127.0.0.1:27017/tasks")
    .then(() => console.log("Tasks MongoDB Connected"))
    .catch((err) => console.log("Tasks Mongo Error", err))


const create = require('./routes/create');
const todos = require('./routes/todos');
const complete = require('./routes/complete');
const mode = require('./routes/mode');
const bin = require('./routes/bin');

app.use(logReqRes("./data/log.txt"))
app.use('/api/create', create);
app.use('/api/todos', todos);
// app.use('/api/complete', complete);
// app.use('/api/mode', mode);
// app.use('/api/bin', bin);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});