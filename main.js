'use strict';

document.addEventListener("DOMContentLoaded", async () => {
    const resp = await fetch('./data.json');
    const data = await resp.json();

    const mainEl = document.querySelector('main');
    const filterEl = document.querySelector('input');
    initFilter(mainEl, filterEl, data);

    const darkModeToggleEl = document.querySelector('select');
    initDarkMode(darkModeToggleEl);
});

const initFilter = (containerEl, filterEl, data) => {
    filterEl.addEventListener('keyup', () => render(containerEl, filter(filterEl.value, data)));
    render(containerEl, filter(filterEl.value, data));
}

const categoryColors = ['#b6469d', '#bf678b', '#c98879', '#ddcb55', '#a5b872', '#6ea68f', '#3794ac', '#0082c9', '#2d73be', '#5b64b3', '#8855a8'];

const render = (container, data) => {
    removeAllChildren(container);

    const documentFragment = document.createDocumentFragment();
    data.forEach((category, index) => {
        const categorySection = document.createElement('div');
        categorySection.style.backgroundColor = categoryColors[(index % categoryColors.length) * 2];
        
        const categoryHeader = document.createElement('h2');
        categoryHeader.innerText = category.title;

        const romList = document.createElement('ul');
        category.roms.forEach(rom => romList.appendChild(renderRom(rom)))

        categorySection.appendChild(categoryHeader);
        categorySection.appendChild(romList);
        documentFragment.appendChild(categorySection);
    });
    container.appendChild(documentFragment)
}

const removeAllChildren = (el) => {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

const renderRom = (rom) => {
    const romItem = document.createElement('li');
    romItem.innerText = rom.name;
    rom.links.forEach(link => renderLink(romItem, link));
    return romItem;
}

const renderLink = (parentEl, link) => {
    parentEl.appendChild(document.createElement('br'));
    const anchor = document.createElement('a');
    anchor.innerText = link.text;
    anchor.setAttribute('href', link.url);
    parentEl.appendChild(anchor);
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

const initDarkMode = (darkModeToggleEl) => {
    const themePersistenceKey = 'theme';
    const themePersistenceValueDark = 'dark';
    const darkModeCSSClass = 'dark';
    const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const darkModeMediaListener = (e) => {
        if (e.matches) {
            document.body.classList.add(darkModeCSSClass);
        } else {
            document.body.classList.remove(darkModeCSSClass);
        }
    };

    switch (localStorage.getItem(themePersistenceKey)) {
        case themePersistenceValueDark: {
            document.body.classList.add(darkModeCSSClass);
            darkModeToggleEl.value = 'dark';
            break;
        }
        case null: {
            darkModeMedia.addEventListener('change', darkModeMediaListener);
            if (darkModeMedia.matches) {
                document.body.classList.add(darkModeCSSClass);
            } else {
                document.body.classList.remove(darkModeCSSClass);
            }
            darkModeToggleEl.value = 'system';
            break;
        }
        default: {
            darkModeToggleEl.value = 'light';
            break;
        }
    }

    darkModeToggleEl.addEventListener('change', (e) => {
        switch (e.target.value) {
            case 'light': {
                darkModeMedia.removeEventListener('change', darkModeMediaListener);
                document.body.classList.remove(darkModeCSSClass);
                localStorage.setItem(themePersistenceKey, 'light');
                break;
            }
            case 'dark': {
                darkModeMedia.removeEventListener('change', darkModeMediaListener);
                document.body.classList.add(darkModeCSSClass);
                localStorage.setItem(themePersistenceKey, themePersistenceValueDark);
                break;
            }
            default: {
                darkModeMedia.addEventListener('change', darkModeMediaListener);
                if (darkModeMedia.matches) {
                    document.body.classList.add(darkModeCSSClass);
                } else {
                    document.body.classList.remove(darkModeCSSClass);
                }
                localStorage.removeItem(themePersistenceKey);
                break;
            }
        }
    });
}