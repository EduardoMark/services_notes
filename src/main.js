require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/api', userRouter)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ON: http://locahost:${PORT}`);
})