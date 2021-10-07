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
        categoryHeader.appendChild(document.createTextNode(category.title));

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
    romItem.appendChild(document.createTextNode(rom.name));
    rom.links.forEach(link => renderLink(romItem, link));
    if (rom.maintainer) {
        romItem.appendChild(renderMaintainer(rom.maintainer));
    }
    return romItem;
}

const renderMaintainer = (maintainer) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('maintainer');
    wrapper.appendChild(document.createTextNode('Maintainer: '));
    const list = document.createElement('ul');
    wrapper.appendChild(list);
    maintainer
        .map(m => {
            const item = document.createElement('li');
            if (typeof m.link === 'string') {
                const anchor = document.createElement('a');
                anchor.setAttribute('href', m.link);
                anchor.setAttribute('target', '_blank');
                anchor.appendChild(document.createTextNode(m.name));
                item.appendChild(anchor);
            } else {
                item.appendChild(document.createTextNode(m.name));
            }
            return item;
        })
        .forEach(node => list.appendChild(node));
    return wrapper;
}

const renderLink = (parentEl, link) => {
    parentEl.appendChild(document.createElement('br'));
    const anchor = document.createElement('a');
    anchor.appendChild(document.createTextNode(link.text));
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
