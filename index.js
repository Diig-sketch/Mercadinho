
document.getElementById('data-compra').valueAsDate = new Date();

function adicionarLinha() {
    const lista = document.getElementById('lista-itens');
    const div = document.createElement('div');
    div.className = 'product-row';

    div.innerHTML = `
            <input type="text" placeholder="Ex: Café" class="nome">
            <input type="number" step="0.01" placeholder="0,00" class="preco" oninput="calcular()">
            <input type="number" value="1" min="1" class="qtd" oninput="calcular()">
            <div class="subtotal-item subtotal-value">R$ 0,00</div>
            <button class="btn-remove" onclick="removerLinha(this)">×</button>
        `;

    lista.appendChild(div);
}

function removerLinha(botao) {
    botao.parentElement.remove();
    calcular();
}

function calcular() {
    let totalFinal = 0;
    const linhas = document.querySelectorAll('.product-row');

    linhas.forEach(linha => {
        const preco = parseFloat(linha.querySelector('.preco').value) || 0;
        const qtd = parseInt(linha.querySelector('.qtd').value) || 0;
        const subtotal = preco * qtd;

        linha.querySelector('.subtotal-item').innerText = 'R$ ' + subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        totalFinal += subtotal;
    });

    document.getElementById('total-geral').innerText = 'R$ ' + totalFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}

adicionarLinha();