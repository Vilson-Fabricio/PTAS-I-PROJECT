# PTAS-I-PROJECT

   OQUE É?

Middleware é um termo usado em desenvolvimento de software, especialmente em aplicações web, para se referir a uma camada de software que fica entre a requisição de um cliente e a resposta do servidor. Em um framework como o Express (Node.js), por exemplo, middleware são funções que têm acesso ao objeto de requisição (req), ao objeto de resposta (res) e a uma função next na aplicação, permitindo manipular a requisição antes que ela chegue ao endpoint ou processar a resposta antes de enviá-la de volta ao cliente.

   EXEMPLOS

1. Processamento de Requisição e Resposta:  Middleware pode modificar, inspecionar ou adicionar dados à requisição antes que ela chegue ao manipulador de rotas. Pode também alterar a resposta antes de ser enviada ao cliente.

2. Autenticação e Autorização: Muito usado para verificar se o usuário possui permissão para acessar determinada rota ou recurso.

3. Log e Monitoramento: Middleware pode registrar logs detalhados de cada requisição, incluindo informações como o tipo de requisição, o caminho, e o tempo de resposta, para monitoramento e auditoria.

4. Manipulação de Erros: Middleware especializado em erros pode capturar exceções que ocorrem durante o processamento da requisição e tratá-las de maneira centralizada, enviando uma resposta adequada ao cliente.

5. Parsing de Dados: É comum usar middleware para interpretar o corpo de requisições em formatos como JSON, XML ou URL-encoded, para que esses dados sejam acessíveis no manipulador de rotas.

6. Compressão e Otimização de Respostas: Alguns middlewares comprimem respostas (como gzip) para reduzir o tempo de transferência de dados entre o servidor e o cliente.

7. CORS (Cross-Origin Resource Sharing): Configurações de CORS são muitas vezes gerenciadas por middleware, permitindo ou restringindo o acesso de diferentes origens à API.

   USO COM NODE.JS

1. Middleware de Logging
   const express = require('express');
const app = express();

// Middleware de log
app.use((req, res, next) => {
    console.log(`Método: ${req.method} - URL: ${req.url}`);
    next(); // Passa para o próximo middleware ou rota
});

app.get('/', (req, res) => {
    res.send('Página Inicial');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

2. Middleware de Autenticação
// Middleware de autenticação
function autenticacao(req, res, next) {
    const token = req.headers['authorization'];
    if (token === 'seu-token-secreto') {
        next(); // Token válido, passa para a próxima etapa
    } else {
        res.status(401).send('Acesso não autorizado');
    }
}

// Aplica o middleware apenas para rotas protegidas
app.get('/dados', autenticacao, (req, res) => {
    res.send('Dados confidenciais');
});

3. Middleware para Parse do Corpo da Requisição
app.use(express.json()); // Middleware para interpretar JSON
app.use(express.urlencoded({ extended: true })); // Middleware para interpretar dados URL-encoded

app.post('/dados', (req, res) => {
    console.log(req.body); // Acessa os dados enviados no corpo da requisição
    res.send('Dados recebidos');
});

4. Middleware de Manipulação de Erros
   // Middleware de erro
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

// Simulação de erro em uma rota
app.get('/erro', (req, res, next) => {
    next(new Error('Erro simulado!'));
});

5. Middleware de Configuração de CORS
const cors = require('cors');
app.use(cors()); // Configura CORS para permitir todas as origens

// Configuração mais específica de CORS
app.use(cors({
    origin: 'https://meusite.com',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/dados', (req, res) => {
    res.send('Dados disponíveis para CORS');
});

6. Middleware para Compressão de Respostas
   const compression = require('compression');
app.use(compression()); // Middleware para comprimir as respostas

app.get('/grande-conteudo', (req, res) => {
    res.send('Conteúdo comprimido');
});

7. Middleware para Limite de Requisições (Rate Limiting)
const rateLimit = require('express-rate-limit');

// Configura o limite de requisições
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // Limita a 100 requisições por IP por janela de 15 minutos
});

app.use(limiter); // Aplica o middleware de limite a todas as rotas

app.get('/', (req, res) => {
    res.send('Bem-vindo! Com limite de requisições.');
});

8. Middleware de Rotas Específicas
// Middleware que só será executado para a rota /admin
app.use('/admin', (req, res, next) => {
    console.log('Acessando a área de administração');
    next();
});

app.get('/admin', (req, res) => {
    res.send('Área Administrativa');
});
