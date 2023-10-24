const express = require('express');
const app = express();

const todos = require('./routes/todos');

app.use('/api', todos);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});