import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Nasa from './js/nasaAPI.js';

function clearFields() {
  $('.showErrors1').text ("");
}
function getMarsWeather(marsWeather) {
  console.log(marsWeather)
  let marsTempArray = marsWeather.sol_keys;
  
  for(let i=0; i< marsTempArray.length; i++) {
    if(marsWeather[marsTempArray[i]]) {
      if ('AT' in marsWeather[marsTempArray[i]]) {
        console.log(marsWeather[marsTempArray[i]].AT.av);
        $('.showResponse').html(`<p>The average temperature on Mars yesterday was ${marsWeather[marsTempArray[i]].AT.av} degrees celcius.</p>`);
      }
    } else {
      $('.showErrors1').text(`There was an error: $(marsWeather[marsTempArray[i]])`);
    }
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
}); 