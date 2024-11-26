const usuario = document.getElementById('usuario');
const senha = document.getElementById('senha');
const mensagem = document.getElementById('mensagem');
const botao = document.getElementById('botao');

const usuarioValido = 'admin';
const senhaValida = 'admin';

document.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        botao.click();
    }
});
botao.addEventListener('click', function () {
    const usuarioDigitado = usuario.value;
    const senhaDigitada = senha.value;
    if (usuarioDigitado === usuarioValido && senhaDigitada === senhaValida) {
        window.location.href = '../dashboard/dashboard.html';
    } else if (usuarioDigitado === "" || senhaDigitada === "") {
        mensagem.textContent = 'Preencha todos os campos';
        mensagem.className = 'erro';
    } else {
        mensagem.textContent = 'Usuario ou Senha Invalido!';
        mensagem.className = 'erro';
    }

})

