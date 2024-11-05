const express = require('express');
const app = express();
const itemsRoutes = require('./routes/itemsRoutes');
const logMiddleware = require('./middlewares/logMiddleware');

app.use(express.json());

app.use(logMiddleware);

app.get('/', (req, res) => {
    res.send('Bem-vindo ao sistema!');
});

app.use('/items', itemsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});