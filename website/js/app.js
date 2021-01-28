// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric';
const apiKey = 'a6c42706782cc9d8c193fc06e62d1795';

// Get the date of the user's device to Create a new date instance dynamically with JS

let date = new Date();
let userDate = date.toLocaleDateString();

// Event listener to the press of the button
document
  .querySelector('#generate')
  .addEventListener('click', generateWeatherData);

  /* Function called by event listener */
// Get the weather of the city's zip provided by the user
function generateWeatherData() {
   const zip = document.querySelector('#zip').value;
  const feelings = document.querySelector('#feelings').value;

   temperature(baseURL, zip, apiKey).then(function (data) {
     postWeatherData(`http://localhost:8080/weatherData`, {
       temp: data.main.temp,
       weatherIcons: data.weather[0].icon,
       date: userDate,
       userFeelings: feelings,
       weatherDetails : data.weather[0].description,
     }).then(() => {
       updateUI();
     });
   });
}

// Access OpenWeatherMap's API Data
 const temperature = async (baseURL, zip, apiKey) => {
   const response = await fetch(baseURL + '&zip=' + zip + '&appid=' + apiKey);
   console.log(response);
   try {
     const data = await response.json();
     console.log(data);
     return data;
   } catch (error) {
     console.log('error', error);
   }
  };

// Function to POST data
const postWeatherData = async (url = '', data = {}) => {
  const request = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'Application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await request.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

// Event listener to add function to existing HTML DOM element
const updateUI = async () => {
  const request = await fetch(`http://localhost:8080/all`);
  try {
    const finalData = await request.json();
    document.querySelector('#date').innerHTML = finalData.date;
    document.querySelector('#temp').innerHTML = `${finalData.temp}°C`;

    // Just to add some styling
  
    document.querySelector('#weatherDetails ').innerHTML =
      finalData.weatherDetails ;

    // Displaying weather's icon
    document.querySelector('#weatherIcons').style.display = 'block';
    document
      .querySelector('#weatherIcons')
      .setAttribute(
        'src',
        `http://openweathermap.org/img/wn/${finalData.weatherIcons}@4x.png`
      );

    document.querySelector('#userFeelings').innerHTML = finalData.userFeelings;
  } catch (error) {
    console.log('error', error);
  }
};
