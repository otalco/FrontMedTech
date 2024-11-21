# MedTech

MedTech é uma aplicação web para gerenciamento de prontuários médicos. O projeto é dividido em duas partes principais: o frontend e o backend.

## Funcionalidades

- Listagem de pacientes
- Visualização de prontuários de pacientes
- Registro de novos prontuários
- Alteração do status de prontuários

## Tecnologias Utilizadas

### Frontend

- HTML
- CSS
- JavaScript
- Fetch API

### Backend

- .NET Core
- ASP.NET Web API
- Entity Framework Core
- SQL Server

## Estrutura do Projeto

### Frontend

- `index.html`: Página inicial
- `pacientes.html`: Página de listagem de pacientes
- `verProntuario.html`: Página de visualização de um prontuário específico
- `listaProntuarios.html`: Página de listagem de prontuários de um paciente
- `assets/`: Diretório contendo arquivos estáticos (CSS, imagens, etc.)
- `assets/js/`: Diretório contendo arquivos JavaScript

### Backend

- `Controllers/`: Diretório contendo os controladores da API
- `Models/`: Diretório contendo os modelos de dados
- `Data/`: Diretório contendo o contexto do banco de dados
- `Program.cs`: Arquivo principal para configuração e inicialização da aplicação

## Configuração

### Pré-requisitos

- .NET Core SDK
- SQL Server
- Node.js (opcional, para gerenciamento de pacotes frontend)

### Backend

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/medtech-backend.git
    ```

2. Navegue até o diretório do projeto:
    ```sh
    cd medtech-backend
    ```

3. Configure a string de conexão com o banco de dados no arquivo `appsettings.json`.

4. Execute as migrações do Entity Framework para criar o banco de dados:
    ```sh
    dotnet ef database update
    ```

5. Inicie a aplicação:
    ```sh
    dotnet run
    ```

### Frontend

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/medtech-frontend.git
    ```

2. Navegue até o diretório do projeto:
    ```sh
    cd medtech-frontend
    ```

3. Abra o arquivo `index.html` no seu navegador.

## Uso

### Listagem de Pacientes

1. Abra a página `pacientes.html`.
2. A lista de pacientes será carregada automaticamente.
3. Clique no botão "Ver Prontuários" para visualizar os prontuários de um paciente específico.

### Visualização de Prontuário

1. Abra a página `verProntuario.html` com o parâmetro `prontuarioID` na URL.
    ```sh
    verProntuario.html?prontuarioID=1
    ```
2. Os dados do prontuário serão carregados automaticamente.

### Alteração de Status do Prontuário

1. Na página `verProntuario.html`, clique no botão "Em Atendimento" para alterar o status do prontuário.

## Exemplo de Código

### Função para Buscar Prontuário (Frontend)

```javascript
function fetchProntuario() {
    const prontuarioId = getProntuarioIdFromUrl();
    fetch(`http://168.75.108.156:5107/api/Prontuario/${prontuarioId}`)
        .then(response => response.json())
        .then(data => {
            const prontuarioDados = document.getElementById('prontuario-dados');
            if (!data || !data.id) {
                prontuarioDados.innerHTML = '<p><strong>Aviso:</strong> Prontuário não encontrado.</p>';
            } else {
                prontuarioDados.innerHTML = `
                    <p><strong>ID do Paciente:</strong> ${data.pacienteId || 'ID não disponível'}</p>
                    <p><strong>Peso:</strong> ${data.peso || 'Peso não disponível'}</p>
                    <p><strong>Altura:</strong> ${data.altura || 'Altura não disponível'}</p>
                    <p><strong>Pressão Arterial:</strong> ${data.pressaoArterial || 'Pressão Arterial não disponível'}</p>
                    <p><strong>Temperatura:</strong> ${data.temperatura || 'Temperatura não disponível'}</p>
                    <p><strong>Saturação:</strong> ${data.saturacao || 'Saturação não disponível'}</p>
                    <p><strong>Frequência Cardíaca:</strong> ${data.frequenciaCardiaca || 'Frequência Cardíaca não disponível'}</p>
                    <p><strong>Queixa Principal:</strong> ${data.queixaPrincipal || 'Queixa Principal não disponível'}</p>
                    <p><strong>Data de Atendimento:</strong> ${data.dataAtendimento ? formatDate(data.dataAtendimento) : 'Data não disponível'}</p>
                    <p><strong>Status:</strong> ${data.status !== undefined ? getStatusDescription(data.status) : 'Status não disponível'}</p>
                    <p><strong>Urgência:</strong> ${data.urgencia !== undefined ? getUrgenciaDescription(data.urgencia) : 'Urgência não disponível'}</p>
                `;
            }
        })
        .catch(error => {
            console.error('Erro ao buscar prontuário:', error);
            document.getElementById('prontuario-dados').innerHTML = '<p><strong>Erro:</strong> Não foi possível buscar o prontuário.</p>';
        });
} 
```

### Função para Alterar Status para "Em Atendimento" (Frontend)

```javascript
function alterarStatusParaEmAtendimento() {
    const prontuarioId = document.getElementById('emAtendimento-btn').dataset.prontuarioId;
    fetch(`http://168.75.108.156:5107/api/Prontuario/status/${prontuarioId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(2) // 2 representa "Em Atendimento"
    })
    .then(response => {
        if (response.ok) {
            alert('Status do prontuário atualizado para "Em Atendimento"');
            // Atualizar a exibição do prontuário
            fetchProntuario();
        } else {
            alert('Erro ao atualizar o status do prontuário.');
        }
    })
    .catch(error => console.error('Erro ao atualizar o status do prontuário:', error));
}
```

### Contribuição

1. Faça um fork do projeto
2. Crie uma nova branch: ```git checkout -b minha-nova-funcionalidade.```
3. Faça suas alterações e commit: ```git commit -m 'Adiciona nova funcionalidade'```
4. Envie para o repositório remoto: ```git push origin minha-nova-funcionalidade```
5. Abra um pull Request