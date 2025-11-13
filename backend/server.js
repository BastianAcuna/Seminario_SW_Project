
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
	res.send('API is running');
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
