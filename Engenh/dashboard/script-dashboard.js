document.addEventListener('DOMContentLoaded', function() {
    // Gráfico de Pizza - Vendas por categoria
    const ctxPizza = document.getElementById('grafico-pizza').getContext('2d');
    new Chart(ctxPizza, {
        type: 'pie',
        data: {
            labels: ['Camisetas', 'Shorts', 'Calças', 'Tênis', 'Moletons'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                    '#4169E1',
                    '#FFA500',
                    '#808080',
                    '#228B22',
                    '#FF0000'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });

    // Gráfico de Linha - Receita x Despesa x Saldo
    const ctxLinha = document.getElementById('grafico-linha').getContext('2d');
    new Chart(ctxLinha, {
        type: 'line',
        data: {
            labels: Array.from({length: 31}, (_, i) => i + 1),
            datasets: [{
                label: 'Receita',
                data: generateRandomData(31, 1000, 5000),
                borderColor: '#4169E1',
                backgroundColor: '#4169E1',
                fill: false
            },
            {
                label: 'Despesa',
                data: generateRandomData(31, 500, 3000),
                borderColor: '#FF0000',
                backgroundColor: '#FF0000',
                fill: false
            },
            {
                label: 'Saldo',
                data: generateRandomData(31, 0, 2000),
                borderColor: '#800080',
                backgroundColor: '#800080',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de Barras - Vendas Primeiro Semestre
    const ctxBarras = document.getElementById('grafico-barras').getContext('2d');
    new Chart(ctxBarras, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
            datasets: [{
                label: 'Vendas',
                data: [28000, 29000, 28000, 25000, 27000, 28000],
                backgroundColor: '#4169E1'
            },
            {
                label: 'Custo',
                data: [10000, 11000, 10500, 9000, 10000, 10500],
                backgroundColor: '#FFA500'
            },
            {
                label: 'Lucro',
                data: [18000, 18000, 17500, 16000, 17000, 17500],
                backgroundColor: '#808080'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    function generateRandomData(count, min, max) {
        return Array.from({length: count}, () => 
            Math.floor(Math.random() * (max - min + 1)) + min
        );
    }

    // Eventos dos botões do gráfico
    const botoesGrafico = document.querySelectorAll('.btn-grafico');
    botoesGrafico.forEach(botao => {
        botao.addEventListener('click', function() {
            botoesGrafico.forEach(b => b.classList.remove('ativo'));
            this.classList.add('ativo');
        });
    });
});


//Abrir página ao clicar botão
window.abrirPagina =function (url){
    console.log(url);
    window.location.href = url;
}