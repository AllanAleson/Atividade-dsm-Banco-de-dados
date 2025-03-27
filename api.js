// Aqui eu tô pegando os campos do HTML pelos IDs. Isso inclui os inputs de ID, nome e email, 
// além da div que vai mostrar as mensagens (tipo sucesso ou erro)
const idInput = document.getElementById('id');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const messageDiv = document.getElementById('message');

// Essa função aqui é responsável por lidar com as operações (CRUD): cadastrar, buscar, atualizar e deletar estudantes
async function handleOperation(operation) {
    const id = idInput.value; // Pegando o valor que foi digitado no campo de ID
    const nome = nomeInput.value; // Pegando o nome que foi digitado
    const email = emailInput.value; // Pegando o email que foi digitado

    // Se não for um cadastro (POST), obrigatoriamente precisa ter um ID informado
    if (operation !== 'POST' && !id) {
        showMessage('Informe o ID para esta operação!', 'error'); // Mostra um erro se o ID estiver vazio
        return;
    }

    // Se não for uma exclusão (DELETE), precisa ter nome e email preenchidos
    if (operation !== 'DELETE' && (!nome || !email)) {
        showMessage('Preencha nome e email!', 'error'); // Se estiver faltando algo, exibe uma mensagem de erro
        return;
    }

    try {
        const baseUrl = "http://localhost:3000/student"; // URL base da API
        const url = operation === 'POST' ? baseUrl : `${baseUrl}/${id}`; // Se for POST, usa a URL base, senão inclui o ID no final

        // Fazendo a requisição pra API com fetch
        const response = await fetch(url, {
            method: operation, // Diz qual operação tá sendo feita (GET, POST, PUT, DELETE)
            headers: { "Content-Type": "application/json" }, // Informa que os dados são JSON
            body: operation === 'GET' ? undefined : JSON.stringify({ nome, email }) // No GET não manda nada no body, nos outros sim
        });

        const data = await response.json(); // Convertendo a resposta pra JSON

        // Se deu erro na requisição, lança um erro e mostra uma mensagem pro usuário
        if (!response.ok) throw new Error(data.error || "Erro no servidor");

        // Aqui eu tô verificando qual operação foi feita e executando ações diferentes pra cada uma
        switch (operation) {
            case 'GET': // Se for busca, preenche os campos com os dados encontrados
                nomeInput.value = data.nome;
                emailInput.value = data.email;
                showMessage('Estudante encontrado!', 'success');
                break;
            case 'POST': // Se for cadastro, mostra o ID gerado na tela
                idInput.value = data.id;
                showMessage(`Cadastrado com ID ${data.id}!`, 'success');
                break;
            case 'PUT': // Se for atualização, só exibe uma mensagem de sucesso
                showMessage('Dados atualizados!', 'success');
                break;
            case 'DELETE': // Se for exclusão, limpa os campos e avisa que o estudante foi apagado
                limparCampos();
                showMessage('Estudante apagado!', 'success');
                break;
        }
    } catch (error) {
        showMessage(`Erro: ${error.message}`, 'error'); // Se algo deu errado, exibe uma mensagem de erro
        console.error(error); // Joga o erro no console pra ajudar no debug
    }
}

// Função pra exibir mensagens de erro ou sucesso na tela
function showMessage(text, type) {
    messageDiv.textContent = text; // Define o texto da mensagem
    messageDiv.className = `message ${type}`; // Adiciona a classe pra estilizar a mensagem (erro ou sucesso)
    setTimeout(() => messageDiv.textContent = '', 5000); // Depois de 5 segundos, some com a mensagem
}

// Função que limpa os campos do formulário
function limparCampos() {
    idInput.value = ''; // Apaga o ID digitado
    nomeInput.value = ''; // Apaga o nome digitado
    emailInput.value = ''; // Apaga o email digitado
}

// Aqui eu tô pegando os botões e adicionando eventos pra chamar as funções corretas quando forem clicados
document.getElementById('btnNovo').addEventListener('click', () => handleOperation('POST')); // Cadastrar um novo estudante
document.getElementById('btnBuscar').addEventListener('click', () => handleOperation('GET')); // Buscar um estudante pelo ID
document.getElementById('btnAlterar').addEventListener('click', () => handleOperation('PUT')); // Atualizar os dados de um estudante
document.getElementById('btnApagar').addEventListener('click', () => handleOperation('DELETE')); // Deletar um estudante
document.getElementById('btnLimpar').addEventListener('click', limparCampos); // Apenas limpa os campos do formulário

// Aqui eu tô impedindo que o usuário aperte Enter e envie o formulário sem querer
document.addEventListener('keypress', (e) => e.key === 'Enter' && e.preventDefault());
