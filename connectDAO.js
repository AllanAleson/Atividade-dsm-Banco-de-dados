import connDAO from './conexao.js'; // Importando a conexão com o banco de dados

// Função que pega todos os estudantes cadastrados e imprime no console
function pegaTodos() {
    connDAO.getAllStudents(function(students) { // Chama a função que busca todos os estudantes
        // Percorre a lista de estudantes e imprime cada um no formato "ID: Nome: Email"
        for (let i = 0; students.length > i; i++) {
            console.log(students[i].id + ":" + students[i].nome + ":" + students[i].email);
        }
    });
}

// Função que busca estudantes pelo nome e imprime no console
function pegaPorNome(nome) {
    connDAO.getStudentsByName(nome, function(students) { // Chama a função que busca pelo nome
        for (let i = 0; students.length > i; i++) { // Percorre a lista de resultados e imprime
            console.log(students[i].id + ":" + students[i].nome + ":" + students[i].email);
        }
    });
}

// Função que cadastra um novo estudante
function cadastrar(nome, email) {
    let student = { nome: nome, email: email }; // Monta o objeto do estudante
    connDAO.save(student, function(student) { // Chama a função que salva no banco
        // Imprime uma confirmação com os dados do estudante cadastrado
        console.log("Estudante cadastrado! " + student.id + ":" + student.nome + ":" + student.email);
    });
}

// Função que atualiza os dados de um estudante pelo ID
function atualizar(id, nome, email) {
    let student = { id: id, nome: nome, email: email }; // Monta o objeto com os novos dados
    connDAO.update(student, function(student) { // Chama a função que atualiza no banco
        // Imprime uma confirmação com os dados atualizados
        console.log("Dados atualizados! " + student.id + ":" + student.nome + ":" + student.email);
    });
}

// Função que deleta um estudante pelo ID
function apagar(id) {
    let student = { id: id }; // Cria o objeto só com o ID do estudante a ser deletado
    connDAO.delete(student, function(student) { // Chama a função que deleta no banco
        // Imprime a confirmação de exclusão
        console.log("Deletado! " + student.id);
    });
}
