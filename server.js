const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/products', productsRouter);

app.use((req, res) => {
  res.status(404).json({ code: 'NOT_FOUND', message: 'Зам олдсонгүй' });
});

app.use((err, req, res, next) => {
  if (err.status === 400) {
    return res.status(400).json({ code: 'BAD_REQUEST', message: 'JSON буруу форматтай' });
  }
  console.error(err);
  res.status(500).json({ code: 'SERVER_ERROR', message: 'Серверийн алдаа' });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Node API: http://localhost:${PORT}`);
  });
}

module.exports = app;
