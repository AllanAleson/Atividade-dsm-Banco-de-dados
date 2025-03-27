import mysql from 'mysql2'; // Importando a biblioteca do MySQL pra conectar no banco

class ConexaoDB {
    // Função pra conectar no banco de dados
    static connect() {
        return mysql.createConnection({
            host: 'localhost', // Servidor do banco (local nesse caso)
            user: 'root', // Usuário do banco
            password: 'admin', // Senha do banco
            database: 'fatec' // Nome do banco de dados
        });
    }

    // Busca todos os estudantes cadastrados
    static getAllStudents(callback) {
        const connection = this.connect(); // Abre conexão com o banco
        connection.query("SELECT * FROM student", (error, results) => { // Faz a consulta pra pegar todos os alunos
            if (error) throw error; // Se der erro, joga a exceção
            callback(results); // Retorna os resultados da consulta
            connection.end(); // Fecha a conexão com o banco
        });
    }

    // Busca um estudante pelo ID
    static getStudentById(id, callback) {
        const connection = this.connect(); // Abre conexão com o banco
        connection.query("SELECT * FROM student WHERE id = ?", [id], (error, results) => { // Busca um estudante pelo ID
            if (error) throw error; // Se der erro, lança a exceção
            callback(results); // Retorna o estudante encontrado (se existir)
            connection.end(); // Fecha a conexão com o banco
        });
    }

    // Cadastra um novo estudante
    static save(student, callback) {
        const connection = this.connect(); // Abre conexão com o banco
        connection.query("INSERT INTO student SET ?", student, (error, results) => { // Insere um novo estudante
            if (error) throw error; // Se der erro, lança a exceção
            student.id = results.insertId; // Pega o ID gerado automaticamente pelo banco
            callback(student); // Retorna o estudante cadastrado com o ID gerado
            connection.end(); // Fecha a conexão com o banco
        });
    }

    // Atualiza os dados de um estudante
    static update(student, callback) {
        const connection = this.connect(); // Abre conexão com o banco
        connection.query("UPDATE student SET ? WHERE id = ?", [student, student.id], (error, results) => { // Atualiza o estudante pelo ID
            if (error) throw error; // Se der erro, lança a exceção
            callback(results); // Retorna o resultado da atualização
            connection.end(); // Fecha a conexão com o banco
        });
    }

    // Remove um estudante pelo ID
    static deleteById(id, callback) {
        const connection = this.connect(); // Abre conexão com o banco
        connection.query("DELETE FROM student WHERE id = ?", [id], (error, results) => { // Deleta o estudante pelo ID
            if (error) throw error; // Se der erro, lança a exceção
            callback(results); // Retorna o resultado da exclusão
            connection.end(); // Fecha a conexão com o banco
        });
    }
}

export default ConexaoDB; // Exporta a classe pra poder ser usada no app.js
