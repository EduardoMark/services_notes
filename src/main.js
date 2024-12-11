require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', noteRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ON: http://locahost:${PORT}`);
})