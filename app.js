const express = require('express');
const app = express();

const bucketList = require('./routes/bucketList');
const dailyTasks = require('./routes/dailyTasks');
const myTasks = require('./routes/myTasks');
const stuff = require('./routes/stuff');

app.use('/api', bucketList);
app.use('/api', dailyTasks);
app.use('/api', myTasks);
app.use('/api', stuff);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});