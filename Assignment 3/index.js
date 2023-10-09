const url = 'https://covid-193.p.rapidapi.com/statistics?country=';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '36bc468fedmshbb0c2f6a24c6eeap1d53d0jsncb6b7a46c347',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
};

// Fetch using async await
const searchButton = document.querySelector('#searchButton');
const cardContainer = document.getElementById('card-container');

searchButton.addEventListener('click', async () => {
  const searchInput = document.querySelector('#searchInput').value.trim();

  if (!searchInput) {
    displayMessage('input cannot be empty!!');
    return;
  }

  try {
    const response = await fetch(url + searchInput, options);
    if (!response.ok) throw new Error('Data tidak ditemukan');
    const { response: dataCov } = await response.json();
    
    cardContainer.innerHTML = dataCov.length === 0
      ? createCard('country not found:(')
      : dataCov.map(c => covResult(c)).join('');
    
    document.querySelector('#searchInput').value = '';
  } catch (error) {
    alert(error.m);
  }
});

// error Message
function displayMessage(m) {
  cardContainer.innerHTML = createCard(m);
}

function createCard(content) {
  return `<div class="errorMessage">${content}</div>`;
}

// null data and separator number for result
function separatorNumber(data) {
  return data === null ? '0' : data.toLocaleString("de-DE");
}

// target result
function covResult(c) {
  const cardTemplate = document.getElementById('card-template');
  const cardClone = cardTemplate.cloneNode(true);
  cardClone.style.display = '';

  cardClone.innerHTML = cardClone.innerHTML
    .replace('{{country}}', c.country)
    .replace('{{day}}', c.day)
    .replace('{{activeCases}}', separatorNumber(c.cases.active))
    .replace('{{newCases}}', separatorNumber(c.cases.new))
    .replace('{{recoveredCases}}', separatorNumber(c.cases.recovered))
    .replace('{{totalCases}}', separatorNumber(c.cases.total))
    .replace('{{totalDeaths}}', separatorNumber(c.deaths.total))
    .replace('{{totalTests}}', separatorNumber(c.tests.total));

  return cardClone.innerHTML;
}