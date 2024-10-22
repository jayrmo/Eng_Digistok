document.addEventListener("DOMContentLoaded", function (event) {

    // Função para carregar o conteúdo dinamicamente usando AJAX
    window.abrirPagina = function (page) {
        const requisicao = new XMLHttpRequest();
        requisicao.open('GET', page, true);
        console.log(requisicao);
        requisicao.onload = function () {
            if (requisicao.status == 200) {
                //console.log(requisicao.responseText);
                document.getElementById('content-area').innerHTML = requisicao.responseText;
                carregarScriptDinamicamente('/listarProduto/script-lista-produto.js'); // Carrega o script após o HTML ser inserido
                //console.log("carregou script");
                carregarScriptDinamicamente('/addProduto/script-cadastra-produto.js');
            } else {
                document.getElementById('content-area').innerHTML = '<p>Erro ao carregar a página.</p>';
            }
        };
        requisicao.send();
    }
    // Função para carregar um script JavaScript dinamicamente
    function carregarScriptDinamicamente(src) {
        const script = document.createElement('script');
        //console.log(src);
        //console.log(script);
        script.src = src;
        script.defer = true; // Garante que o script seja carregado de forma assíncrona

        script.onload = function () {
            console.log(`Script ${src} carregado com sucesso.`);
        };
        document.body.appendChild(script);
        //console.log(document.body);
    }





})