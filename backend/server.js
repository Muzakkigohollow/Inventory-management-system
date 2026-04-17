const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

const db = require('./models');

db.sequelize.authenticate()
  .then(() => console.log('DB Connected'))
  .catch(err => console.log('DB Error:', err));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
