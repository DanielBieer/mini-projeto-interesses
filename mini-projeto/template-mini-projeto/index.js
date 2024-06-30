

const meusInteresses = document.querySelector('.meus-interesses');
const inputInteresse = document.querySelector('#novo-interesse');

// Função de atualizar e carregar a lista 
function carregarInteresses() {
    const interesses = localStorage.getItem('meus-interesses');

    if (interesses) {
        const listaInteresses = JSON.parse(interesses);

        const ul = document.querySelector('ul');
        ul.innerHTML = '';

        listaInteresses.forEach(interesse => {
            const li = document.createElement('li');
            li.textContent = interesse;
            ul.appendChild(li);
        });
    }
}
// Função de evento para adicionar novos interesses
function buttonAdd() {
    const novoInteresse = inputInteresse.value;
    if (novoInteresse) {
        let listaInteresses = localStorage.getItem('meus-interesses');

        if (listaInteresses) {
            listaInteresses = JSON.parse(listaInteresses);
        } else {
            listaInteresses = [];
        }

        
        if (listaInteresses.includes(novoInteresse)) {
            alert('Interesse já adicionado na lista.')
        } else {
        listaInteresses.push(novoInteresse);
        localStorage.setItem('meus-interesses', JSON.stringify(listaInteresses));

        carregarInteresses();
        }

        inputInteresse.value = '';
    }
}

// Limpar a lista
function clearList() {
    localStorage.removeItem('meus-interesses');

    const ul = document.querySelector('ul');
    ul.innerHTML = '';

    carregarInteresses();
}

carregarInteresses();

setInterval(carregarInteresses, 1000);

inputInteresse.addEventListener('keydown', (event) => {
    if(event.key == 'Enter'){
        buttonAdd()
    }
})


// Função para buscar notícias do IBGE
async function fetchNoticiasIBGE() {
    const url = 'https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release';

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const primeiraNoticia = data.items[0];
            const titulo = primeiraNoticia.titulo;

            

            const tituloNoticiaElement = document.querySelector('.title-news-today');
            tituloNoticiaElement.textContent = titulo;
        }
    } catch (error) {
        console.error('Erro ao buscar notícias do IBGE:', error);
    }
}


fetchNoticiasIBGE();