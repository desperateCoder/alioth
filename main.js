'use strict';

const darkModeClass = 'dark';
const categoryColors = ['#b6469d', '#bf678b', '#c98879', '#ddcb55', '#a5b872', '#6ea68f', '#3794ac', '#0082c9', '#2d73be', '#5b64b3', '#8855a8'];

const render = (container, data) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const documentFragment = document.createDocumentFragment();
    data.forEach((category, index) => {
        const categorySection = document.createElement('div');
        categorySection.style.backgroundColor = categoryColors[(index % categoryColors.length) * 2];
        const categoryHeader = document.createElement('h2');
        categoryHeader.innerText = category.title;
        categorySection.appendChild(categoryHeader);
        const romList = document.createElement('ul');
        category.roms.forEach(rom => {
            const romItem = document.createElement('li');
            romItem.innerText = rom.name;
            rom.links.forEach(link => {
                romItem.appendChild(document.createElement('br'));
                const anchor = document.createElement('a');
                anchor.innerText = link.text;
                anchor.setAttribute('href', link.url);
                romItem.appendChild(anchor);
            });
            romList.appendChild(romItem);
        })
        categorySection.appendChild(romList);
        documentFragment.appendChild(categorySection);
    });
    container.appendChild(documentFragment)
}

const filter = (term, data) => {
    const lowerTerm = term.toLowerCase();
    return data.map(category => {
        return {
            title: category.title,
            roms: category.roms.filter(rom => rom.name.toLowerCase().indexOf(lowerTerm) > -1)
        };
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const resp = await fetch('./data.json');
    const roms = await resp.json();

    const mainEl = document.querySelector('main');
    const filterEl = document.querySelector('input');
    const darkModeToggleEl = document.querySelector('button');

    filterEl.addEventListener('keyup', () => render(mainEl, filter(filterEl.value, roms)));
    render(mainEl, filter(filterEl.value, roms));

    darkModeToggleEl.addEventListener('click', () => document.body.classList.toggle(darkModeClass));
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            document.body.classList.add(darkModeClass);
        } else {
            document.body.classList.remove(darkModeClass);
        }
    });
});