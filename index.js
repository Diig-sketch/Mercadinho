
document.addEventListener('DOMContentLoaded', () => {

    carregarDados();


    const lista = document.getElementById('lista-itens');
    if (lista.children.length === 0) {
        adicionarLinha();
    }
});

function adicionarLinha(nome = '', preco = '', qtd = 1) {
    const lista = document.getElementById('lista-itens');
    const div = document.createElement('div');
    div.className = 'product-row';

    div.innerHTML = `
        <input type="text" placeholder="Item" class="p-nome" value="${nome}" oninput="salvarECalcular()">
        <input type="number" step="0.01" placeholder="0,00" class="p-preco" value="${preco}" oninput="salvarECalcular()">
        <input type="number" value="${qtd}" min="1" class="p-qtd" oninput="salvarECalcular()">
        <div class="subtotal-item subtotal-value">R$ 0,00</div>
        <button class="btn-remove" onclick="removerLinha(this)">×</button>
    `;

    lista.appendChild(div);
    calcular();
}

function removerLinha(botao) {
    botao.parentElement.remove();
    salvarECalcular();
}


function salvarECalcular() {
    let totalGeral = 0;
    const linhas = document.querySelectorAll('.product-row');
    const dadosParaSalvar = [];

    linhas.forEach(linha => {
        const nome = linha.querySelector('.p-nome').value;
        const preco = parseFloat(linha.querySelector('.p-preco').value) || 0;
        const qtd = parseInt(linha.querySelector('.p-qtd').value) || 0;
        const subtotal = preco * qtd;


        linha.querySelector('.subtotal-item').innerText =
            subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        totalGeral += subtotal;


        dadosParaSalvar.push({ nome, preco, qtd });
    });


    document.getElementById('total-geral').innerText =
        totalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


    const infoCompra = {
        mercado: document.getElementById('mercado').value,
        data: document.getElementById('data-compra').value,
        itens: dadosParaSalvar
    };

    localStorage.setItem('mercadinho_dados', JSON.stringify(infoCompra));
}


function calcular() {
    salvarECalcular();
}


function carregarDados() {
    const dadosSalvos = localStorage.getItem('mercadinho_dados');

    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);


        document.getElementById('mercado').value = dados.mercado || '';
        document.getElementById('data-compra').value = dados.data || new Date().toISOString().split('T')[0];


        const lista = document.getElementById('lista-itens');
        lista.innerHTML = '';

        dados.itens.forEach(item => {
            adicionarLinha(item.nome, item.preco, item.qtd);
        });
    } else {

        document.getElementById('data-compra').valueAsDate = new Date();
    }
}
