import "./../styles.css";

const barLocation = document.querySelector("#barLocation");
const buttonWeather = document.querySelector("#buttonWeather");
const divInfo = document.querySelector("#information");

window.getWeather = getWeather;
window.packJSON = packJSON;
buttonWeather.addEventListener("click", () => {
  if (barLocation.value) {
    //call a loading animation here
    getWeather(barLocation.value)
      .then((response) => {
        console.log(response);
        return response;
      })
      .then(packJSON)
      .then(prepareUI);
  }
});

async function getWeather(argArea = "Fugging") {
  try {
    const weatherData = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${argArea}?unitGroup=metric&key=P2N5CDXN3NCLKECMWKKJU77HR&contentType=json`,
    );
    const weatherJSON = await weatherData.json();
    return weatherJSON;
  } catch (error) {
    alert(error);
  }
}

async function packJSON(argData) {
  try {
    const data = await argData;
    let cleanedWeather = {
      address: data.address,
      resolvedAddress: data.resolvedAddress,
      currentConditions: data.currentConditions,
      description: data.description,
    };
    return cleanedWeather;
  } catch (error) {
    alert(error);
  }
}

async function prepareUI(argData) {
  const data = await argData;
  const spanInfo = document.createElement("span");
  spanInfo.innerText = `${data.resolvedAddress},${data.address} ${data.currentConditions.conditions} ${data.currentConditions.temp} ${data.description}`;
  divInfo.appendChild(spanInfo);
}
