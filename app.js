const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const todos = require('./routes/todos');
const create = require('./routes/create');
const complete = require('./routes/complete');
const mode = require('./routes/mode');
const bin = require('./routes/bin');

app.use('/api/todos', todos);
app.use('/api/create', create);
app.use('/api/complete', complete);
app.use('/api/mode', mode);
app.use('/api/bin', bin);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});