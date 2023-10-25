const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const todos = require('./routes/todos');
const create = require('./routes/create');

app.use('/api/todos', todos);
app.use('/api/create', create);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});