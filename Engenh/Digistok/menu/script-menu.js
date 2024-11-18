// var menuItem = document.querySelectorAll('.item-menu, .submenu');
//
// function selecionaItem() {
//     menuItem.forEach((item) =>
//         item.classList.remove('ativo')
//     )
//     this.classList.add('ativo')
//     console.log(this);
//
// }
//
// menuItem.forEach((item) =>
//     item.addEventListener('click', selecionaItem)
// )
//

// Seleciona todos os itens do menu principal com submenu
var menuItem = document.querySelectorAll('.item-menu');

// Função que adiciona a classe 'ativo'
function selecionaItem(event) {
    // Remove a classe "ativo" de todos os menus e submenus
    menuItem.forEach((item) => {
        item.classList.remove('ativo');
        const submenu = item.querySelector('.submenu');
        if (submenu) submenu.classList.remove('ativo');
    });

    // Adiciona a classe "ativo" ao item-menu clicado
    this.classList.add('ativo');

    // Adiciona a classe "ativo" ao submenu correspondente (se existir)
    const submenu = this.querySelector('.submenu');
    if (submenu) {
        submenu.classList.add('ativo');
    }

    // console.log(`Item clicado: ${this.textContent.trim()}`);
}

// Adiciona o evento de clique para cada item do menu
menuItem.forEach((item) =>
    item.addEventListener('click', selecionaItem)
);
