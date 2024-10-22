
//Inicia após o DOM carregar.
document.addEventListener("DOMContentLoaded", function (event) {

    //Variaveis para receber  os valores do input
    const nomeProduto = document.getElementById('produto');
    const undproduto = document.getElementById('unidades');
    const qtdProduto = document.getElementById('qtd');
    const descricao = document.getElementById('descricao');
    const categoria = document.getElementById('categoria');
    const btnAddCategoria = document.getElementById('add');
    const btnSalvar = document.getElementById('salvar');
    const btnSalvarCategoria = document.getElementById('salvarCategoria');
    const btnListar = document.getElementById('listar');
    const btnUpdate = document.getElementById('update');
    const btnDelet = document.getElementById('delet');



    //Verifica se estar no modal para  adicionar categoria
    if (window.location.pathname.includes('cadastra-categoria.html')) {
        //Botão salvar categoria do modal
        if (btnSalvarCategoria) {
            //Botão Salva categoria
            btnSalvarCategoria.addEventListener('click', function () {
                if (document.getElementById('categoriaAdd').value.trim() != "") {
                    salvarCategoria();
                    document.getElementById('categoriaAdd').value = '';
                } else {
                    alert('Preencha o nome da categoria');
                }

            })
        }
    }

     //Abrir página ao clicar botão
     window.abrirPagina =function (url){
        console.log(url);
        window.location.href = url;
    }
    
    if (btnDelet) {
        btnDelet.addEventListener('click', function () {
            if (categoriasSelecionadas().length != 0) {
                if (window.confirm("Deletar as Categorias selecionadas?")) {
                    for (let deletar of categoriasSelecionadas()) {
                        console.log(deletar);
                        deletarCategoria(deletar);
                    }
                }
            } else {
                alert('Selecione as categorias que deseja deletar');
            }
        });

    }


    //Roda a função ao iniciar o DOM para já carregar as categorias do db
    if (btnUpdate) {
        btnUpdate.addEventListener('click', function () {
            limparCategoria();
            exibiCategorias();
        })
    }

    //Verifica se existe o botão 
    if (btnAddCategoria) {
        //Botão abre modal de add categoria
        btnAddCategoria.addEventListener('click', function () {
            window.open('/addProduto/cadastra-categoria.html', '_blanck', 'width=600,height=400');


        })
    }

    // Verifica se o botão "Salvar" existe (só estará disponível em cadastra-produtos.html)
    if (btnSalvar) {
        btnSalvar.addEventListener('click', function () {
            salvar();
            limpar();
        });
    }


    // Verifica se o botão "Listar" existe (só estará disponível em cadastra-produtos.html)
    if (btnListar) {
        btnListar.addEventListener('click', function () {
            window.location.href = "../listarProduto/lista-produtos.html"; // Redireciona para a página de listagem
        });
    }











    //------------PRODUTOS-------------------------
    //Ação para limpar após clicar no botão
    function limpar() {
        nomeProduto.value = "";
        qtdProduto.value = "0";
        undproduto.value = "----";
        descricao.value = "";
        categoria.value = "";
    }


    //Função para enviar os dados em formato JS pela API para o backEnd
    function salvar() {
        console.log(nomeProduto.value);
        console.log(qtdProduto.value);
        console.log(categoria.value);
        if (!nomeProduto.value.trim() != '' || !qtdProduto.value.trim() != '' || !categoria.value.trim() != '') {
            alert("Preencha os campos obrigatórios!");
            return;
        }
        const dados = {
            nome: nomeProduto.value,
            quantidade: qtdProduto.value,
            medida: undproduto.value,
            descricao: descricao.value,
            categorias: { id: parseInt(categoria.value, 10) }

            //categoria: Array.from(categoria.selectedOptions).map(function (option) {
            //  return { id: parseInt(option.value, 10) };}) //envia uma lista para o  backEnd
        }

        console.log(JSON.stringify(dados));
        fetch("http://localhost:8080/produto",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(dados)
            })
            .then(function (res) {
                if (res.ok) { // Verifica se a resposta foi bem-sucedida (status 200–299)
                    return res.json(); // Continua o fluxo retornando a resposta como JSON
                } else {
                    throw new Error('Erro ao salvar o produto. Status: ' + res.status);

                }
            })
            .then(function (data) {
                sucessoMensagem('Produto "' + data.nome + '" foi Salvo!');


            })
            .catch(function (error) {
                erroMensagem('Erro ao Salvar!');


            });



    }













    //------------CATEGORIAS--------------------------

    function categoriasSelecionadas() {
        const selecionadas = document.getElementById('categoria').selectedOptions;
        const idCategoriasSelecionadas = [];
        for (let option of selecionadas) {
            idCategoriasSelecionadas.push(option.value);
        }
        return idCategoriasSelecionadas;
    }


    //Pesquisa e exibe as categorias criadas no db
    function exibiCategorias() {
        fetch("http://localhost:8080/categoria", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            //Pega a resposta do servidor e transforma em JASON
            .then(function (respostaServidor) {
                return respostaServidor.json();
            })

            .then(function (categorias) {
                //console.log(categorias);
                for (let i = 0; i < categorias.length; i++) {
                    //console.log(categorias[i]);
                    const categoriaEl = document.createElement('option');//cria um elemento html option e coloca em categoriaEL
                    categoriaEl.value = categorias[i].id;//armazena o id da categoria no value do elemento option
                    //console.log(categoriaEl.value);
                    categoriaEl.textContent = categorias[i].nome;//armazena o nome da categoria  no texto do elemento option
                    document.getElementById('categoria').appendChild(categoriaEl);//adiciona  o elemento option ao elemento select com id categoria

                }
            })
            .catch(function (error) {
                console.log('Erro:', error);
            });

    }


    //Limpa categoria do HTML
    function limparCategoria() {
        categoria.innerHTML = '';
    }



    function salvarCategoria() {
        const categoria = document.getElementById('categoriaAdd').value;
        const dados = {
            nome: categoria
        }
        console.log(categoria);
        console.log(JSON.stringify(dados));
        fetch("http://localhost:8080/categoria",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(dados)
            })
            .then(function (res) {
                if (res.ok) { // Verifica se a resposta foi bem-sucedida (status 200–299)
                    return res.json(); // Continua o fluxo retornando a resposta como JSON
                } else {
                    throw new Error('Erro ao salvar o produto. Status: ' + res.status);

                }
            })
            .then(function (data) {
                sucessoMensagem('Produto "' + data.nome + '" foi Salvo!');


            })
            .catch(function (error) {
                erroMensagem('Erro ao Salvar!');


            });
    }

    //Função para deletar categoria
    function deletarCategoria(id) {
        fetch(`http://localhost:8080/categoria/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                if (response.ok) {
                    sucessoMensagem("Categorias deletadas com sucesso!");
                    limparCategoria();
                    exibiCategorias();
                } else {
                    throw new Error(erroMensagem("Erro ao deletar Categoria!"));
                }
            })
            .catch(function (error) {
                erroMensagem("Falha de Conexão com o Backend!");
                console.error('Erro:', error);
            });
    }
















    //Função para mostrar mensagem de sucesso
    function sucessoMensagem(mensagem) {
        const mensagemEl = document.getElementById('mensagem');
        mensagemEl.innerHTML = `<span style="display: inline-flex; align-items: center;"><img src="/Imag/Icon/check.png" alt="Ícone de sucesso" style="width: 20px; height: 20px; margin-right: 5px;"> ${mensagem} </span>`;
        mensagemEl.classList.remove('error');  // Remove a classe de erro, se houver
        mensagemEl.classList.add('success');   // Adiciona a classe de sucesso
        mensagemEl.style.display = 'block';    // Torna a mensagem visível
    }

    //Função para mostrar mensagem de erro
    function erroMensagem(mensagem) {
        const mensagemEl = document.getElementById('mensagem');
        mensagemEl.innerHTML = `<span style="display: inline-flex; align-items: center;"><img src="/Imag/Icon/error.png" alt="Ícone de sucesso" style="width: 20px; height: 20px; margin-right: 5px;"> ${mensagem}</span>`;
        mensagemEl.classList.remove('success');  // Remove a classe de sucesso, se houver
        mensagemEl.classList.add('error');       // Adiciona a classe de erro
        mensagemEl.style.display = 'block';        // Torna a mensagem visível


    }



});