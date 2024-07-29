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