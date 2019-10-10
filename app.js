const apiURL = "https://randomuser.me/api/?results=12";
const peopleList = document.getElementById("people");
const modalPeopleList = document.getElementById("modal-people");
const sectionClass = document.getElementsByClassName("section");
const sectionButton = document.getElementsByTagName("BUTTON");
const close = document.getElementsByClassName("close");

/* Post profile information in index.html --------------------------*/
// Create instance of createJSON
// Use .map() to take a single person from the array of people
// Create the section variable to store each person in
// Append each section to the peopleList div
// Create HTML tags and store information within them

async function generateHTML(data) {
  data.map(person => {
    const section = document.createElement("section");
    section.classList = "section";
    peopleList.appendChild(section);
    section.innerHTML = `
      <button>
      <img src=${person.picture.medium}>
      <h2>${person.name.first} ${person.name.last}</h2>
      <h3>${person.email}</h3>
      <h3>${person.location.city}</h3>
      </button>
    `;
  });
  for (i = 0; i <= sectionButton.length; i += 1) {
    generateModal(sectionButton[i]);
  }
}

/* Generate modal information--------------------------*/
// Take the section that was passed in and map each person
// Create an element to hold the section in the modal
// Append the section to the list of people in the modal
// Set the inner HTML of the modal being viewed.
async function generateModal(section, data) {
  section.map(person => {
    const modalSection = document.createElement("modalSection");
    modalPeopleList.appendChild(modalSection);
    modalSection.innerHTML = `
      <img src=${person.picture.medium}>
      <h2>${person.name.first} ${person.name.last}</h2>
      <h3>${person.email}</h3>
      <h3>${person.cell}</h3>
      <h3>${person.location.street} ${person.location.city} ${person.location.state} ${person.location.postcode}</h3>
      <h3>${person.dob.date}</h3>
    `;
  });
}

/* Fetch the data--------------------------*/
// Turn response into json
// Send the data to the generateHTML function
// Catch any errors
fetch(apiURL)
  .then(response => response.json())
  .then(data => generateHTML(data.results))
  .then(data => generateModal(sectionClass))
  .catch(error => console.log("Looks like there was a problem", error));

// If user clicks the closing 'x', change display of modalPeopleList (id=modal-people) from "none" to "block"
window.onclick = function(event) {
  if (event.target == modalPeopleList) {
    modalPeopleList.style.display = "none";
  }
};
