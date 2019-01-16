const rowsPerPage = 3,
           medalsRowsCol = document.querySelectorAll('.prod'),
      rowsCount = medalsRowsCol.length,
      currentPage = 1,
      pagerEl = document.querySelector('.pager'),
      descriptionEl = createPageDescriptionEl(currentPage, rowsPerPage, rowsCount),
      pagerControlsEl = document.createElement('div');

pagerControlsEl.classList.add('pager__controls');

fillPagerControlsContent(pagerControlsEl, currentPage, rowsPerPage, rowsCount);

pagerEl.innerHTML = '';
pagerEl.append( descriptionEl, pagerControlsEl );

showOnlyRowsFromPage(currentPage, rowsPerPage);

pagerControlsEl.addEventListener('click', function(e) {
  const linkEl = e.target.closest('a'),
        linkHref = linkEl.getAttribute('href'),
        [, pageCount] = linkHref && linkHref.split('#page-'),
        pageNumber = parseInt( pageCount );
  
  if (!isNaN(pageNumber) && pageNumber >=1) {
    fillPagerControlsContent(pagerControlsEl, pageNumber, rowsPerPage, rowsCount);
    descriptionEl.innerText = getPageDescriptionText(pageNumber, rowsPerPage, rowsCount);
    showOnlyRowsFromPage(pageNumber, rowsPerPage);
  }
});

function showOnlyRowsFromPage(currentPage, rowsPerPage) {
  const {from, to} = getRowsForShow(currentPage, rowsPerPage),
        hiddenElCol = document.querySelectorAll(
          `.prod:nth-child(-n + ${from - 1}):not(.hidden), .prod:nth-child(n + ${to + 1}):not(.hidden)`
        ),
        shownElCol = document.querySelectorAll(
          `.prod:nth-child(n + ${from}):nth-child(-n + ${to}).hidden`
        );
  
  for (let i=0; i < hiddenElCol.length; i++) {
    hiddenElCol[i].classList.add('hidden');
  }

  for (let i=0; i < shownElCol.length; i++) {
    shownElCol[i].classList.remove('hidden');
  }

//   document.querySelectorAll('#medals-table tbody tr:nth-child(-n + 10), #medals-table tbody tr:nth-child(n + 21)')
}

function fillPagerControlsContent(pagerControlsEl, currentPage, rowsPerPage, rowsCount) {
  const lastPageNumber = getLastPageCount(rowsPerPage, rowsCount),
        prevLinkEl = createPageLinkEl(
          currentPage - 1,
          currentPage,
          'Previous',
          'pager__prev'
        ),
        nextLinkEl = createPageLinkEl(
          (currentPage % lastPageNumber) && (currentPage + 1) ,
          currentPage,
          'Next',
          'pager__next'
        ),
        pagerListEl = document.createElement('ul');
  
  pagerListEl.classList.add('pager__list');
  
  pagerControlsEl.innerHTML = '';
  pagerControlsEl.append(prevLinkEl, pagerListEl, nextLinkEl);
  
  pagerListEl.append.apply( pagerListEl, createShownPageLinks(lastPageNumber, currentPage) );
  
  function createShownPageLinks(lastPageNumber, currentPage) {
  
    const result = [
      createPageLinkEl(1, currentPage)
    ];

    if (lastPageNumber > 1) {

      if (currentPage > 3) {
        result.push(
          createPageLinkEl(-1, currentPage, '...')
        );
      }

      if (currentPage > 2) {
        result.push(
          createPageLinkEl(currentPage - 1, currentPage)
        );
      }

      if (currentPage !== 1 && currentPage !== lastPageNumber) {
        result.push(
          createPageLinkEl(currentPage, currentPage)
        );
      }

      if (currentPage + 1 < lastPageNumber) {
        result.push(
          createPageLinkEl(currentPage + 1, currentPage)
        );
      }

      if (currentPage + 2 < lastPageNumber) {
        result.push(
          createPageLinkEl(-1, currentPage, '...')
        );
      }

      result.push(
        createPageLinkEl(lastPageNumber, currentPage)
      );
    }

    return result;
  }
}

function getLastPageCount(rowsPerPage, rowsCount) {
  return Math.ceil( rowsCount/rowsPerPage );
}

function getRowsForShow(currentPage, rowsPerPage) {
  return {
    from: currentPage*rowsPerPage - rowsPerPage + 1,
    to: currentPage*rowsPerPage
  }
}

function getPageDescriptionText(currentPage, rowsPerPage, rowsCount) {
  const {from, to} = getRowsForShow(currentPage, rowsPerPage);
  
return `Show ${from} to ${to} of ${rowsCount} rows`;
}

function createPageDescriptionEl(currentPage, rowsPerPage, rowsCount) {
  const desc = getPageDescriptionText(currentPage, rowsPerPage, rowsCount),
        descriptionEl = document.createElement('div');
  
  descriptionEl.innerText = desc;
  descriptionEl.classList.add('pager__info');

  // descriptionEl.append(document.createTextNode(desc));

  return descriptionEl;
}

function createPageLinkEl(pageCount, currentPage, linkDesc, className = 'pager__page') {
  const linkEl = document.createElement('a');
  
  linkEl.classList.add(className);
  
  if (pageCount >= 1) {
    linkEl.setAttribute('href', `#page-${pageCount}`);
  }
  
  if (pageCount === currentPage) {
    linkEl.classList.add(`${className}--current`);
  }
  
  // linkEl.innerText = typeof linkDesc === 'undefined' ? pageCount : linkDesc;
  linkEl.innerText = linkDesc || pageCount;
  
  return linkEl;
}

