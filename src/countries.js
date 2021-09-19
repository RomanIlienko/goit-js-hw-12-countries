import { refs } from './js/refs';
import fetchCountries from './js/fetchCountries';
import countriesMarkup from './templates/countries-markup.hbs';
import countryMarkup from './templates/country-markup.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, success, error } from '@pnotify/core';

const debounce = require('lodash.debounce'); 
refs.input.addEventListener('input',debounce(handleInput, 500),
);

function handleInput(event) {
    const searchQuery = event.target.value.trim()
    refs.countryContainer.innerHTML = '';
    if (searchQuery) {
        fetchCountries(searchQuery)
        .then(country => {
            if (country.length === 1) {
                renderCountryCard(country)
                success({
                    title: 'Cool!',
                    text: "Congratulations! You found the country.",
                    delay: 2000,
                    mouseReset: true,
                });
                event.target.value = ''

            } else if (country.length > 1 && country.length <= 10) {
                renderCountriesMarkup(country)
                alert({
                    title: 'Give me more letters.',
                    text: "Please enter a more specific query!",
                    delay: 2000,
                });
            } else {
                country.length > 10
                error({
                    title: 'Oops!',
                    text: 'Please, be more specifically!',
                    delay: 2000,
                })
            }
            return
        })
        .catch(requestError)
    }

}



function renderCountryCard(country) {
    const markup = countryMarkup(country)
    refs.countryContainer.innerHTML = markup
    clearContainer()
}

function renderCountriesMarkup(countries) {
    clearContainer()
    const oneMarkup = countries.map(country => {
        return countriesMarkup(country)
    }).join('')
    refs.countryList.insertAdjacentHTML('beforeend', oneMarkup);
}

function clearContainer() {
    refs.countryList.innerHTML = ''
}

function requestError() {
    error({
        text: "Please enter a valid country name",
        delay: 2000,
    })
}




