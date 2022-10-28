const fetchCountries = searchQuery => {
  return fetch(`https://restcountries.com/v3.1/name/${searchQuery}`).then(
    response => {
      if (response.ok) return response.json();
      outputCountryInfo.innerHTML = '';
    }
  );
};

export default fetchCountries;
