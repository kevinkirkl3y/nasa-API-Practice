import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Nasa from './js/nasaAPI.js';
import Apod from './js/apodAPI.js';

function clearFields() {
  $('.showErrors1').text ("");
  $('showErrors2').text ("");
}
function getMarsWeather(marsWeather) {
  console.log(marsWeather)
  let marsTempArray = marsWeather.sol_keys;
  
  for(let i=0; i< marsTempArray.length; i++) {
    if(marsWeather[marsTempArray[i]]) {
      if ('AT' in marsWeather[marsTempArray[i]]) {
        console.log(marsWeather[marsTempArray[i]].Season);
        $('.showResponse').append(`<p>The average temperature on Mars was ${marsWeather[marsTempArray[i]].AT.av} degrees celcius on ${marsWeather[marsTempArray[i]].First_UTC}.<br> The current season on Mars is ${marsWeather[marsTempArray[i]].Season}.</p>`);
      }
    } else {
      $('.showErrors1').append(`There was an error: ${marsWeather[marsTempArray[i]]}`);
    }
  } 
}
function getApod (apodApi) {
  if(apodApi.url && apodApi.explanation) {
    
    $('.showApod').html(`<img id="apod" src="${apodApi.url}" alt="${apodApi.explanation}" width="300px" height="auto" /> `);
  } else {
    $('.showErrors2').text(`There was an error: ${apodApi}`);
  }

}


 



$(document).ready(function() {
  
  $('#weatherButton').click(function() {
   clearFields();
   (async function() {
     const marsWeather =  await Nasa.getMarsWeather();
     getMarsWeather(marsWeather);
   })();
  });
  
  $('#getApod').click(function() {
    (async function() {
      const apodApi = await Apod.getApod();
      getApod(apodApi);
    })();
  });
}); 