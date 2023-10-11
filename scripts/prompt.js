let prompt = [];

const numberDays = "number-days";
const numberPeople = "number-people";

form = document.querySelector(".prompt-form");
section = document.querySelector(".form-wrapper");
spinner = document.querySelector(".loader");
header = document.querySelector(".header");
promptDisplay = document.createElement("h2");
promptDisplay.classList.add("prompt-form__text");

const promptVar = (event) => {
  promptBudget = event.target.budget.value;
  promptPeople = event.target.people.value;
  promptDays = event.target.days.value;
  promptFlightTime = event.target.flighttime.value;
  promptInterests = event.target.interest.value;
  promptMonth = event.target.month.value;
  promptTemperature = event.target.temperature.value;
  promptDislikes = event.target.dislikes.value;
  promptResponses = event.target.responses.value;
};

const mainPromptCreator = () => {
  mainPrompt = `I have £${promptBudget} I want to go on holiday for ${promptDays} days with ${promptPeople} people, travelling during ${promptMonth} but flying from London for only ${promptFlightTime} hours. On holiday, I enjoy ${promptInterests} and I'm looking for ${promptTemperature} degrees celsius to enjoy myself but I don't like ${promptDislikes} and I'd like to consider ${promptResponses} options`;

  promptDisplay.innerText = mainPrompt;
  section.appendChild(promptDisplay);
};

const formValidation = () => {
  if (promptBudget / promptPeople < 50) {
    warningSign = document.createElement("h1");
    warningSign.innerText = "Please reconsider travelling by plane, scumbag";
    warningSign.classList.add("header__tagline");
    header.appendChild(warningSign);
    return;
  }
};

const readonlyAssign = () => {
  const budgetSelect = document.getElementById("budget");
  const peopleSelect = document.getElementById("people");
  const daysSelect = document.getElementById("days");
  const flightTimeSelect = document.getElementById("flighttime");
  const interestSelect = document.getElementById("interest");
  const monthSelect = document.getElementById("month");
  const temperatureSelect = document.getElementById("temperature");
  const dislikesSelect = document.getElementById("dislikes");
  const responsesSelect = document.getElementById("responses");
  const buttonSelect = document.querySelector(".prompt-form__button");

  budgetSelect.setAttribute("readonly", "true");
  peopleSelect.setAttribute("readonly", "true");
  daysSelect.setAttribute("readonly", "true");
  flightTimeSelect.setAttribute("readonly", "true");
  interestSelect.setAttribute("readonly", "true");
  monthSelect.setAttribute("disabled", "true");
  temperatureSelect.setAttribute("readonly", "true");
  dislikesSelect.setAttribute("readonly", "true");
  responsesSelect.setAttribute("readonly", "true");
  buttonSelect.setAttribute("disabled", "true");
};

const readonlyRemove = () => {
  const budgetSelect = document.getElementById("budget");
  const peopleSelect = document.getElementById("people");
  const daysSelect = document.getElementById("days");
  const flightTimeSelect = document.getElementById("flighttime");
  const interestSelect = document.getElementById("interest");
  const monthSelect = document.getElementById("month");
  const temperatureSelect = document.getElementById("temperature");
  const dislikesSelect = document.getElementById("dislikes");
  const responsesSelect = document.getElementById("responses");
  const buttonSelect = document.querySelector(".prompt-form__button");

  budgetSelect.setAttribute("readonly", "false");
  peopleSelect.setAttribute("readonly", "false");
  daysSelect.setAttribute("readonly", "false");
  flightTimeSelect.setAttribute("readonly", "false");
  interestSelect.setAttribute("readonly", "false");
  monthSelect.setAttribute("disabled", "false");
  temperatureSelect.setAttribute("readonly", "false");
  dislikesSelect.setAttribute("readonly", "false");
  responsesSelect.setAttribute("readonly", "false");
  buttonSelect.setAttribute("disabled", "false");
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  spinner.classList.add("loader--spin");
  promptDisplay.innerText = "";

  promptVar(event);
  readonlyAssign();
  formValidation();

  mainPromptCreator();

  askGPT3();

  form.reset();
});
