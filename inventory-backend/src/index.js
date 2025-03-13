import express from 'express'
import cors from 'cors'
import sequelize from './config/database.js'
import authRoutes from './routes/auth.route.js'
import inventoryRoutes from './routes/inventory.route.js'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/inventory', inventoryRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });