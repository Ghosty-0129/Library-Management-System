const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve static files


app.use('/api/user', userRoutes);
app.use('/api/books', bookRoutes);

mongoose
	.connect(
		'mongodb+srv://Sanda:ModaPutha89@atlascluster.wvmxs5l.mongodb.net/library?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
