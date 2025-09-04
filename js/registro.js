const data = {
    nomeClube: '',
    cidadeClube: '',
    estadoClube: '',
    anoCriacaoClube: '',
    cnpjClube: '',
    enderecoClube: '',
    bioClube: '',
    senhaClube: '',
    interesseClube: '',
    categoriaClube: ''
}

// Etapa 25
const nextBtn25 = document.getElementById('nextBtn-25');
if (nextBtn25) {
    nextBtn25.addEventListener('click', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nomeClube');
        const cidade = document.getElementById('cidadeClube');
        const estado = document.getElementById('estadoClube');
        const ano = document.getElementById('anoCriacaoClube');
        const interesse = document.getElementById('interesseClube');

        if (nome) data.nomeClube = nome.value;
        if (cidade) data.cidadeClube = cidade.value;
        if (estado) data.estadoClube = estado.value;
        if (ano) data.anoCriacaoClube = ano.value;
        if (interesse) data.interesseClube = interesse.value;

        console.log(data);
        window.location.href = "registro50.html";
    });
}

// Etapa 50
const nextBtn50 = document.getElementById('nextBtn-50');
if (nextBtn50) {
    nextBtn50.addEventListener('click', function(event) {
        event.preventDefault();

        const cnpj = document.getElementById('cnpjClube');
        const endereco = document.getElementById('enderecoClube');
        const bio = document.getElementById('bioClube');
        const categoria = document.getElementById('categoriaClube');

        if (cnpj) data.cnpjClube = cnpj.value;
        if (endereco) data.enderecoClube = endereco.value;
        if (bio) data.bioClube = bio.value;
        // if (categoria) data.categoriaClube = categoria.value;

        console.log(data);
        window.location.href = "registro75.html";
    });
}


// Etapa final (senha)
const submitBtn = document.getElementById('submitBtn');
if (submitBtn) {
    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();

        const senha = document.getElementById('senhaClube');
        const confirmarSenha = document.getElementById('confirmarSenha');

        if (senha && confirmarSenha) {
            data.senhaClube = senha.value;
            if (data.senhaClube !== confirmarSenha.value) {
                alert('As senhas não coincidem. Por favor, tente novamente.');
                return;
            }
        }
        console.log(data);

    });
}

// costruir data com localStorage talvez e enviar com axios ou fetch

// Redirecionar para a página de login
// window.location.href = "login.html";