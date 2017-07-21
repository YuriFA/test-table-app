import DOMBuilder from './utils/DOMBuilder';
import { randomHexColor } from './utils';

const MAX_ROWS = 256;
const MAX_COLS = 8;
const CELL_HEIGHT = 32;
const LOAD_COUNT = 10;

function getRandomRows(rowsCount, colsCount = MAX_COLS) {
  let rowsData = '';

  for (let row = 0; row < rowsCount; row++) {
    rowsData += '<tr>';
    for (let col = 0; col < colsCount; col++) {
      rowsData += `<td>${Math.random().toString(36).substring(5)}</td>`;
    }
    rowsData += '</tr>';
  }

  return rowsData;
}

const menuLinks = document.querySelectorAll('.menu a');
const contentNode = document.querySelector('.content');

const helloNode = DOMBuilder.createElement('h1', {
  text: 'Hello, World!',
});

const tableContainerNode = DOMBuilder.createElement('div', {
  attrs: {
    class: 'table-container',
  },
});

const needToShow = Math.ceil((window.innerHeight - contentNode.offsetTop) / CELL_HEIGHT) + 10;
const randomTable = `<table><tbody>${getRandomRows(needToShow)}</tbody></table>`;
tableContainerNode.innerHTML = randomTable;

const lazyLoad = (event) => {
  const { offsetTop, scrollTop, scrollHeight, clientHeight } = tableContainerNode;
  const scrollOffset = 30;

  if (scrollTop >= scrollHeight - (clientHeight + scrollOffset)) {
    const tbodyNode = tableContainerNode.querySelector('tbody');
    const rowsCount = tbodyNode.querySelectorAll('tr').length;
    const needToLoad = rowsCount + LOAD_COUNT <= MAX_ROWS ? LOAD_COUNT : (MAX_ROWS - rowsCount);

    tbodyNode.insertAdjacentHTML('beforeend', getRandomRows(needToLoad));
  }
};

tableContainerNode.addEventListener('scroll', lazyLoad);
tableContainerNode.addEventListener('click', (event) => {
  if (event.target.nodeName.toLowerCase() === 'td') {
    const cellNode = event.target;
    cellNode.style.backgroundColor = randomHexColor();
  }
});

// Location
const links = {
  hello: helloNode,
  table: tableContainerNode,
};

const updateMenu = (hash) => {
  Array.prototype.slice.call(menuLinks)
    .forEach((link) => {
      if (hash === link.getAttribute('href')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
};

const updateContent = () => {
  const content = links[location.hash.slice(1)] || '';
  contentNode.innerHTML = '';
  if (content) {
    contentNode.appendChild(content);
  }
  updateMenu(location.hash);
};

window.addEventListener('hashchange', updateContent);
window.addEventListener('load', () => {
  if (!location.hash) {
    location.assign('#hello');
  }
  updateContent();
});
