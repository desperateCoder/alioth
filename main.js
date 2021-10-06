'use strict';

document.addEventListener("DOMContentLoaded", async () => {
    const darkModeToggleEl = document.querySelector('select');
    initDarkMode(darkModeToggleEl);

    const resp = await fetch('./data.json');
    const data = await resp.json();

    const mainEl = document.querySelector('main');
    const filterEl = document.querySelector('input');
    initFilter(mainEl, filterEl, data);
});

const initFilter = (containerEl, filterEl, data) => {
    filterEl.addEventListener('keyup', () => render(containerEl, filter(filterEl.value, data)));
    render(containerEl, filter(filterEl.value, data));
}

const render = (container, data) => {
    removeAllChildren(container);

    const documentFragment = document.createDocumentFragment();
    data.forEach(category => {
        const categorySection = document.createElement('section');

        const categoryHeader = document.createElement('h2');
        categoryHeader.innerText = category.title;

        const romList = document.createElement('ul');
        if (category.roms.length > 0) {
            category.roms
                .map(rom => renderRom(rom))
                .forEach(node => romList.appendChild(node));
        } else {
            categorySection.classList.add('empty');
        }

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
    if (rom.maintainer) {
        renderMaintainer(romItem, rom.maintainer);
    }
    rom.links.forEach(link => renderLink(romItem, link));
    return romItem;
}

const renderMaintainer = (parentEl, maintainer) => {
    parentEl.appendChild(document.createElement('br'));
    const parentSpan = document.createElement('span');
    parentSpan.setAttribute('class', "maintainer");
    const prefixSpan = document.createElement('span');
    prefixSpan.innerText = "Maintainer: "
    parentSpan.appendChild(prefixSpan);
    for (let i = 0; i<maintainer.length; i++) {
        if (i > 0) {
            const separatorSpan = document.createElement('span');
            separatorSpan.innerText = ", "
            parentSpan.appendChild(separatorSpan);
        }
        let maintainerElement;
        if (maintainer[i].link) {
            maintainerElement = document.createElement('a');
            maintainerElement.setAttribute('href', maintainer[i].link);
            maintainerElement.setAttribute('target', '_blank');
        } else{
            maintainerElement = document.createElement('span');
        }
        maintainerElement.innerText = maintainer[i].name;
        parentSpan.appendChild(maintainerElement);
        parentEl.appendChild(parentSpan);
    }
}

const renderLink = (parentEl, link) => {
    parentEl.appendChild(document.createElement('br'));
    const anchor = document.createElement('a');
    anchor.innerText = link.text;
    anchor.setAttribute('href', link.url);
    anchor.setAttribute('target', '_blank');
    parentEl.appendChild(anchor);
}

const filter = (term, data) => {
    const lowerTerm = term.toLowerCase();
    return data.map(category => {
        return {
            title: category.title,
            roms: category.roms
                .filter(rom =>
                    rom.name
                        .toLowerCase()
                        .indexOf(lowerTerm) > -1 ||
                    rom.links
                        .map(link => link.text.toLowerCase())
                        .some(lowerLinkText => lowerLinkText.indexOf(lowerTerm) > -1)
                )
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
