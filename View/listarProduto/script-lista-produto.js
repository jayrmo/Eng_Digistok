document.addEventListener("DOMContentLoaded", function (event) {

    const btnCadastrar = document.getElementById('cadastrar');
    const btnAlterar = document.getElementById('alterar');
    const btnDeletar = document.getElementById('deletar');
    const boxcabecalho = document.querySelector('.boxcabecalho');
    console.log(btnDeletar);

    // Verifica se estamos na página "produtos.html" e carrega os produtos
    if (window.location.pathname.includes('lista-produtos.html')) {
        listarProduto(); // Chama a função para carregar os produtos na tabela
    }

    //Abrir página ao clicar botão
    window.abrirPagina =function (url){
        console.log(url);
        window.location.href = url;
    }

    // Cadastar Novo
    if (btnCadastrar) {
        btnCadastrar.addEventListener('click', function () {
            console.log("Foi clicado")
            window.location.href = "../addProduto/cadastra-produtos.html"; // Redireciona para a página de listagem
        });
    }




    //Botão Alterar Produtos Selecionados
    if (btnAlterar) {
        btnAlterar.addEventListener('click', function () {
            
            const box = document.querySelectorAll('.boxlinha');
            console.log(box);
            box.forEach(function (bx) {
                console.log(bx);
                if (bx.checked) {
                    console.log("Achei  o produto → " + bx.getAttribute('data-id'));
                    //window.location.href = "../addProduto/cadastra-produtos.html?id=" + bx.getAttribute
                    //('data-id'); // Redireciona para a página de listagem

                    const entrada = document.querySelector('#tabela-produtos tbody');
                    const input = document.createElement('input');
                    console.log(entrada);
                    console.log(input);
                    input.type = 'hidden';
                    input.value = bx.nome;
                    entrada.appendChild(input);

                }
            })

        })
    }



    //Botão Deletar Produtos Selecionados
    if (btnDeletar) {
        btnDeletar.addEventListener('click', function () {
            //console.log('aqui→ '+ btnDeletar);
            const box = document.querySelectorAll('.boxlinha');
            const marcados = [];
            for (let i = 0; i < box.length; i++) {
                if (box[i].checked) {
                    marcados.push(box[i].getAttribute('data-id'));
                }
            }
            
            if (marcados.length == 0) {
                alert("Selecione os produtos que deseja deletar");
            } else {
                if (window.confirm("Deseja deletar os produtos selecionados?")) {
                    marcados.forEach(function (id) {
                        deletarProduto(id);

                    })
                }

            }
        })
    }




    //CheckBox Cabeçalho evento que é disparado quando altera o valor  do checkbox
    boxcabecalho.addEventListener('change', function () {
        const boxes = document.querySelectorAll('.boxlinha');
        boxes.forEach(function (box) {
            box.checked = boxcabecalho.checked;

        });
    })






    //Função para listar produto
    function listarProduto() {
        fetch("http://localhost:8080/produto", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            //Pega a resposta do servidor e transforma em JASON
            .then(function (respostaServidor) {
                //console.log(respostaServidor.json);
                return respostaServidor.json();
            })

            .then(function (produtos) {
                //console.log(produtos.body);
                const conteudoTabela = document.querySelector('#tabela-produtos tbody');
                //console.log(conteudoTabela.innerHTML);
                //console.log(conteudoTabela);
                conteudoTabela.innerHTML = ''; // Limpa a tabela antes de adicionar os produtos
                //console.log("→"+conteudoTabela.innerHTML);
                for (let i = 0; i < produtos.body.length; i++) {
                    const produto = produtos.body[i];
                    //console.log(produtos);
                    // console.log(p.descricao + " -> " + p.nome);
                    // produtos.body.forEach(function (produto) {
                    const linha = document.createElement('tr');
                    //console.log(linha);
                    //console.log(produto.categoria.nome);
                    linha.innerHTML = `
                    <td><input type="checkbox" data-id="${produto.id}" class="boxlinha"></td>
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.quantidade}</td>
                    <td>${produto.medida}</td>
                    <td>${produto.descricao}</td>
                    <td>${produto.categorias.nome}</td>
                    <td> <button  class="botaoId">
                    <img src="/Imag/Icon/edit.png" alt="Ícone" width="20" height="20" class="editId"> 
                    <img src="/Imag/Icon/delete.png" alt="Ícone" width="20" height="20" class="deleteId"> 
                    </td>
                    
                `;

                    const botaoDeletar = linha.querySelector('.deleteId');
                    botaoDeletar.addEventListener('click', function () {
                        if (window.confirm("Deseja deletar o produto " + produto.nome + " ?")) {
                            deletarProduto(produto.id);
                        }
                    });

                    const botaoEditar = linha.querySelector('.editId');
                    botaoEditar.addEventListener('click', function () {
                        console.log("Editando...");
                        const div = document.querySelector('.input');
                        console.log(div);
                        div.innerHTML = `
                            <input value= ${produto.nome} class='teste'>
                            <input value= ${produto.id}>
                        `
                        const inputs = div.querySelector('.teste');
                        console.log(inputs.value);
                        //abrirNovaJanela("../addProduto/cadastra-produtos.html");
                        //window.open(`localhost:8080/produto/${produto.id}`);

                    })



                    //console.log(linha);
                    conteudoTabela.appendChild(linha);
                    //console.log(conteudoTabela);

                    // CheckBox linha evento que desmarca o cabeçalho se desmarcar uma das linhas
                    const boxlinhas = linha.querySelector('.boxlinha');
                    boxlinhas.addEventListener('change', function () {
                        let desmarcado = false;
                        const boxAtual = conteudoTabela.querySelectorAll('.boxlinha');
                        // Verifica se há algum checkbox desmarcado
                        for (let j = 0; j < boxAtual.length; j++) {
                            if (!boxAtual[j].checked) {
                                desmarcado = true;
                                break; // Sai do loop se encontrar um checkbox desmarcado
                            }
                        }

                        boxcabecalho.checked = !desmarcado; // Atualiza o cabeçalho conforme as linhas
                    });

                };

            })
            .catch(function (error) {
                console.error('Erro ao carregar os produtos:', error);
            });
    }



    //Função para deletar produto
    function deletarProduto(id) {
        fetch(`http://localhost:8080/produto/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                if (response.ok) {
                    sucessoMensagem("Produto Deletado com sucesso!");
                    listarProduto();
                } else {
                    throw new Error(erroMensagem("Erro ao deletar produto!"));
                }
            })
            .catch(function (error) {
                erroMensagem("Falha de Conexão com o Backend!");
                console.error('Erro:', error);
            });
    }



    //Função para alterar produto
    function editarProduto(id) {
        fetch(`http://localhost:8080/produto/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                if (response.ok) {
                    sucessoMensagem("Produto Editado com Sucesso!");
                    listarProduto();
                } else {
                    throw new Error(erroMensagem("Erro ao Editar Produto!"));
                }
            })
            .catch(function (error) {
                erroMensagem("Falha de Conexão com o Backend!");
                console.error('Erro:', error);
            });
    }











    //Função para mostrar mensagem de sucesso
    function sucessoMensagem(mensagem) {
        document.getElementById('mensagem').innerText = mensagem;//define a mensagem
        document.getElementById('mensagem').classList.add('sucesso');
    }

    //Função para mostrar mensagem de erro
    function erroMensagem(mensagem) {
        document.getElementById('mensagem').innerText = mensagem;
        document.getElementById('mensagem').classList.add('erro');

    }


})
