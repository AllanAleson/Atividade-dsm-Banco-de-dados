import express from 'express'; // Importando o Express pra criar o servidor
import ConexaoDB from './conexao.js'; // Importando a conexão com o banco de dados
import bodyParser from 'body-parser'; // Importando o body-parser pra conseguir ler JSON no corpo das requisições
import cors from 'cors'; // Importando o CORS pra permitir requisições de outros domínios (tipo do frontend)

const app = express(); // Criando o servidor com Express
app.use(cors()); // Habilitando CORS pra evitar bloqueios quando o frontend fizer requisições
app.use(bodyParser.json()); // Configurando o Express pra aceitar JSON no corpo das requisições

// Rota que busca todos os estudantes cadastrados
app.get('/student', (req, res) => {
    ConexaoDB.getAllStudents(students => { // Chama a função do banco que pega todos os estudantes
        res.json(students); // Retorna a lista de estudantes em formato JSON
    });
});

// Rota que busca um estudante pelo ID
app.get('/student/:id', (req, res) => {
    ConexaoDB.getStudentById(req.params.id, student => { // Pega o ID da URL e busca o estudante no banco
        // Se encontrou o estudante, retorna os dados, senão retorna erro 404
        student.length > 0 
            ? res.json(student[0]) // Retorna o primeiro estudante encontrado (deveria ser único)
            : res.status(404).json({ error: "Estudante não encontrado!" }); // Se não achou, manda erro 404
    });
});

// Rota pra cadastrar um novo estudante
app.post('/student', (req, res) => {
    ConexaoDB.save(req.body, student => { // Pega os dados do corpo da requisição e salva no banco
        res.json(student); // Retorna os dados do estudante cadastrado, já com o ID gerado
    });
});

// Rota pra atualizar os dados de um estudante
app.put('/student/:id', (req, res) => {
    req.body.id = req.params.id; // Pega o ID da URL e coloca dentro do corpo da requisição pra atualizar no banco
    ConexaoDB.update(req.body, result => { // Chama a função que faz a atualização
        res.json({ success: "Dados atualizados!" }); // Retorna uma mensagem dizendo que deu certo
    });
});

// Rota pra deletar um estudante pelo ID
app.delete('/student/:id', (req, res) => {
    ConexaoDB.deleteById(req.params.id, result => { // Chama a função que deleta o estudante pelo ID
        // Se encontrou o ID e deletou, retorna sucesso. Senão, retorna erro 404
        result.affectedRows > 0 
            ? res.json({ success: "Estudante removido!" }) // Se deletou, avisa que deu certo
            : res.status(404).json({ error: "ID não encontrado!" }); // Se não achou o ID, retorna erro 404
    });
});

// Definindo a porta do servidor
const PORT = 3000;

// Iniciando o servidor e deixando ele rodando
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`); // Exibe no console que o servidor tá online e onde acessar
});
