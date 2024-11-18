var menuItem = document.querySelectorAll('.item-menu');

function selecionaItem(event) {
    // console.log(event.currentTarget);
    menuItem.forEach((item) => {
        item.classList.remove('ativo');
        const submenu = item.querySelector('.submenu');
        if (submenu) submenu.classList.remove('ativo');
    });

    this.classList.add('ativo');
    const submenu = this.querySelector('.submenu');
    if (submenu) {
        submenu.classList.add('ativo');
    }
    // console.log(`Item clicado: ${this.textContent.trim()}`);
}

menuItem.forEach((item) =>
    item.addEventListener('click', selecionaItem)
);
