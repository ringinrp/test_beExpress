const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const levelRoute = require('./routes/levels')
const departmentRoute = require('./routes/departments');
const morgan = require('morgan')
const {
    errorHandler,notFound
} = require('./middleware/errorMiddleware');
const cookieParse = require('cookie-parser')

dotenv.config();

//middleware routes
app.use(express.json());
app.use(cookieParse());


app.use(morgan("dev"))
app.use(cors());


//route
app.get('/', (req, res) => {
    res.send('test');
});
app.use('/api/v1/level', levelRoute);
app.use('/api/v1/department', departmentRoute);
app.use('/api/v1/auth', authRouter);


app.use(notFound);
app.use(errorHandler);


//server
const port = process.env.PORT
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});