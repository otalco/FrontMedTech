// Função para lidar com a submissão do formulário de cadastro de paciente
function handleCadastroFormSubmit(event) {
    event.preventDefault();

    const formData = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        cartaoSus: document.getElementById('cartaoSus').value,
        rg: document.getElementById('rg').value,
        dataNascimento: document.getElementById('data-nascimento').value,
        sexo: document.getElementById('sexo').value,
        nomeMae: document.getElementById('nomeMae').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
        observacoes: document.getElementById('observacoes').value
    };

    fetch('http://localhost:5107/api/Paciente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Cadastro realizado com sucesso!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Ocorreu um erro ao realizar o cadastro.');
    });
}

// Função para lidar com a submissão do formulário de registro de atendimento
function handleAtendimentoFormSubmit(event) {
    event.preventDefault();

    const formData = {
        paciente: document.getElementById('paciente').value,
        status: document.getElementById('status').value,
        peso: document.getElementById('peso').value,
        altura: document.getElementById('altura').value,
        pressaoArterial: document.getElementById('pressaoArterial').value,
        temperatura: document.getElementById('temperatura').value,
        saturacao: document.getElementById('saturacao').value,
        frequenciaCardiaca: document.getElementById('frequenciaCardiaca').value,
        queixaPrincipal: document.getElementById('queixaPrincipal').value,
        dataAtendimento: document.getElementById('dataAtendimento').value
    };

    fetch('http://localhost:5107/api/Prontuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Atendimento registrado com sucesso!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Ocorreu um erro ao registrar o atendimento.');
    });
}

// Adicionar event listeners para os formulários se existirem na página
document.addEventListener('DOMContentLoaded', () => {
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', handleCadastroFormSubmit);
    }

    const atendimentoForm = document.getElementById('atendimentoForm');
    if (atendimentoForm) {
        atendimentoForm.addEventListener('submit', handleAtendimentoFormSubmit);
    }
});
// Função para carregar a lista de pacientes
function loadPacientes() {
    fetch('http://localhost:5107/api/Paciente')
        .then(response => response.json())
        .then(data => {
            const pacientesTableBody = document.querySelector('#pacientesTable tbody');
            pacientesTableBody.innerHTML = '';

            data.forEach(paciente => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${paciente.nome}</td>
                    <td>${paciente.cpf}</td>
                    <td>${paciente.dataNascimento}</td>
                    <td>
                        <button onclick="viewProntuario('${paciente.id}')">Ver Prontuário</button>
                        <button onclick="editPaciente('${paciente.id}')">Editar</button>
                    </td>
                `;

                pacientesTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching pacientes:', error));
}

// Função para ver o prontuário do paciente
function viewProntuario(pacienteId) {
    window.location.href = `view.html?id=${pacienteId}`;
}

// Função para editar o paciente
function editPaciente(pacienteId) {
    window.location.href = `register.html?id=${pacienteId}`;
}

// Adicionar event listener para o botão de cadastrar novo paciente
document.addEventListener('DOMContentLoaded', () => {
    const novoPacienteBtn = document.getElementById('novoPacienteBtn');
    if (novoPacienteBtn) {
        novoPacienteBtn.addEventListener('click', () => {
            window.location.href = 'register.html';
        });
    }

    // Carregar a lista de pacientes
    if (document.querySelector('#pacientesTable')) {
        loadPacientes();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const prontuarioId = new URLSearchParams(window.location.search).get('id');
    if (prontuarioId) {
        fetchProntuario(prontuarioId);
    }

    const atualizarBtn = document.getElementById('atualizar-btn');
    if (atualizarBtn) {
        atualizarBtn.addEventListener('click', fetchProntuario);
    }
});

function fetchProntuario() {
    fetch(`http://localhost:5107/api/Prontuario/next`)
        .then(response => response.json())
        .then(data => {
            displayProntuario(data);
        })
        .catch(error => {
            console.error('Error fetching prontuario:', error);
            alert('Ocorreu um erro ao buscar o prontuário.');
        });
}

function displayProntuario(prontuario) {
    const prontuarioDados = document.getElementById('prontuario-dados');
    prontuarioDados.innerHTML = `
        <p><strong>ID:</strong> ${prontuario.id}</p>    
        <p><strong>Paciente ID:</strong> ${prontuario.pacienteId}</p>
        <p><strong>Status:</strong> ${prontuario.status}</p>
        <p><strong>Peso:</strong> ${prontuario.peso || 'N/A'}</p>
        <p><strong>Altura:</strong> ${prontuario.altura || 'N/A'}</p>
        <p><strong>Pressão Arterial:</strong> ${prontuario.pressaoArterial || 'N/A'}</p>
        <p><strong>Temperatura:</strong> ${prontuario.temperatura || 'N/A'}</p>
        <p><strong>Saturação:</strong> ${prontuario.saturacao || 'N/A'}</p>
        <p><strong>Frequência Cardíaca:</strong> ${prontuario.frequenciaCardiaca || 'N/A'}</p>
        <p><strong>Queixa Principal:</strong> ${prontuario.queixaPrincipal || 'N/A'}</p>
        <p><strong>Data de Atendimento:</strong> ${new Date(prontuario.dataAtendimento).toLocaleString()}</p>
    `;
}