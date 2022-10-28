import debounce from 'lodash.debounce';
import notification from './notifications';
import fetchCountries from './fetchCountries';
import countryList from '../partials/countryList.hbs';
import fullInfoCard from '../partials/fullInfoCard.hbs';

const inputCountryName = document.querySelector('.inputCountryRequest');
const outputCountryInfo = document.querySelector('.output-country');

const searchRequest = () => {
  if (!inputCountryName.value) {
    outputCountryInfo.innerHTML = '';
    return;
  }

  outputCountryInfo.innerHTML = '';

  fetchCountries(inputCountryName.value)
    .then(countryData => {
      const clearData = countryData.filter(country =>
        country.name.common
          .toLowerCase()
          .includes(inputCountryName.value.toLowerCase())
      );

      if (countryData.length > 10) {
        outputCountryInfo.innerHTML = `По указанным данным найдено ${countryData.length} совпадений. Уточните запрос.`;
        notification('alert');
        return;
      }

      if (clearData.length >= 2 && clearData.length <= 10) {
        outputCountryInfo.innerHTML = countryList(clearData);
        return;
      }

      outputCountryInfo.innerHTML = fullInfoCard(clearData);
    })
    .catch(err => {
      outputCountryInfo.innerHTML = '';
      notification('error');
    });
};

inputCountryName.addEventListener('input', debounce(searchRequest, 500));
