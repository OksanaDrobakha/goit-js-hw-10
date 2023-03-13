import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

input.addEventListener(
  'input',
  debounce(event => {
    const valueTrim = input.value.trim();
    cleanHtml();
    if (valueTrim !== '') {
      fetchCountries(valueTrim).then(countryData => {
        if (countryData.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (countryData.length === 0) {
          Notiflix.Notify.info('Oops, there is no country with that name');
        } else if (countryData.length >= 2 && countryData.length <= 10) {
          renderCountryList(countryData);
        } else if (countryData.length === 1) {
          renderOneCountry(countryData);
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
<img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
<p>${country.name.official}</p>
        </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderOneCountry(countries) {
  const markup = countries
    .map(country => {
      return `<li>
<img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
<p><b>${country.name.official}</b></p>
<p><b>Capital:</b> ${country.capital}</p>
<p><b>Population:</b> ${country.population}</p>
<p><b>Languages:</b> ${country.languages}</p>
        </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function cleanHtml() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
