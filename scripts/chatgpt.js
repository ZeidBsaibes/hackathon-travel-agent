const OPEN_API_KEY = `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`;
const URL = `https://api.openai.com/v1/chat/completions`;

async function askGPT3() {
  const api_url = URL;
  const api_key = OPEN_API_KEY; // NOTE: Exposing API key in client-side code is not safe

  const prompt = `Translate the following English text to French: "hello how are you?"`;
  const max_tokens = 60;

  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${api_key}`,
  });

  const body = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: mainPrompt,
      },

      {
        role: "system",
        content: `You are a travel agent, you must provide a response in the form of JSON with the keys: destination, flight_time, expected_price, destination_average_temperature, suggested_activities. For destination_average_temperature, supply the average temperature for the destination at the specified time of year. suggested_activities should be an array with three values. Supply ${promptResponses} destinations`,
      },
    ],
    temperature: 1,
    top_p: 1,
    n: 1,
    stream: false,
    max_tokens: 2500,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const data = await response.json();

    const destinationsObj = JSON.parse(data.choices[0].message.content);
    const destinations = Object.values(destinationsObj);
    console.log(destinations);
    const destinationsArr = destinations[0];
    console.log(destinations[0]);
    destinationsArr.forEach((destination) => {
      createDestinationCard(destination);
    });
  } catch (error) {
    console.error("Error during fetch operation", error);
    answerElement.innerText = "Sorry, an error occurred.";
  }
}

const hideLoader = () => {
  spinner = document.querySelector(".loader--spin");
  if (spinner) {
    spinner.classList.remove("loader--spin");
    spinner.classList.add("loader--hidden");
  }
};

const destinationEl = document.querySelector(".destination");

const createDestinationCard = (destination) => {
  const cardEl = document.createElement("article");
  cardEl.classList.add("destination__card");

  const locationEl = document.createElement("h2");
  locationEl.classList.add("destination__name");
  locationEl.innerText = destination.destination;

  const cardFlightEl = document.createElement("div");
  cardFlightEl.classList.add("destination__container");

  const planeImg = document.createElement("img");
  planeImg.setAttribute("src", "../assets/icons/plane.svg");
  planeImg.setAttribute("alt", "Plane Icon");
  planeImg.classList.add("destination__icon");

  const flighTimeEl = document.createElement("p");
  flighTimeEl.classList.add("destination__flight-time");
  flighTimeEl.innerText = destination.flight_time;

  const cardPriceEl = document.createElement("div");
  cardPriceEl.classList.add("destination__container");

  const poundImg = document.createElement("img");
  poundImg.setAttribute("src", "../assets/icons/pound.svg");
  poundImg.setAttribute("alt", "Pound Icon");
  poundImg.classList.add("destination__icon");

  const priceEl = document.createElement("p");
  priceEl.classList.add("destination__price");
  priceEl.innerText = destination.expected_price;

  const cardTempEl = document.createElement("div");
  cardTempEl.classList.add("destination__container");

  const tempImg = document.createElement("img");
  tempImg.setAttribute("src", "../assets/icons/temperature.svg");
  tempImg.setAttribute("alt", "Temperature Icon");
  tempImg.classList.add("destination__icon");

  const tempEl = document.createElement("p");
  tempEl.classList.add("destination__temp");
  tempEl.innerText = destination.destination_average_temperature;

  const cardActivitiesEl = document.createElement("div");
  cardActivitiesEl.classList.add("destination__container");

  const checkImg = document.createElement("img");
  checkImg.setAttribute("src", "../assets/icons/checklist.svg");
  checkImg.setAttribute("alt", "Checklist Icon");
  checkImg.classList.add("destination__icon");

  const activities = destination.suggested_activities;
  const activitiesEl = document.createElement("div");
  activitiesEl.classList.add("destination__activities");

  const firstActivityEl = document.createElement("p");
  firstActivityEl.classList.add("destination__activity");
  firstActivityEl.innerText = activities[0];

  const secondActivityEl = document.createElement("p");
  secondActivityEl.classList.add("destination__activity");
  secondActivityEl.innerText = activities[1];

  const thirdActivityEl = document.createElement("p");
  thirdActivityEl.classList.add("destination__activity");
  thirdActivityEl.innerText = activities[2];

  cardFlightEl.append(planeImg);
  cardFlightEl.append(flighTimeEl);

  cardPriceEl.append(poundImg);
  cardPriceEl.append(priceEl);

  cardTempEl.append(tempImg);
  cardTempEl.append(tempEl);

  activitiesEl.append(firstActivityEl);
  activitiesEl.append(secondActivityEl);
  activitiesEl.append(thirdActivityEl);
  cardActivitiesEl.append(checkImg);
  cardActivitiesEl.append(activitiesEl);

  cardEl.append(locationEl);
  cardEl.append(cardFlightEl);
  cardEl.append(cardPriceEl);
  cardEl.append(cardTempEl);
  cardEl.append(cardActivitiesEl);
  destinationEl.append(cardEl);
  hideLoader();
};
