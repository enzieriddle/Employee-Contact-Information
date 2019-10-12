const apiURL = "https://randomuser.me/api/?results=12";
const peopleList = document.getElementById("people");
const sectionClass = document.getElementsByClassName("section");
const close = document.getElementsByClassName("close");

/* Post profile information in index.html --------------------------*/
// Create instance of createJSON
// Use .map() to take a single person from the array of people
// Create the section variable to store each person in
// Append each section to the peopleList div
// Create HTML tags and store information within them
function generateHTML(data) {
  data.map(person => {
    const section = document.createElement("section");
    section.classList = "section";
    peopleList.appendChild(section);
    section.innerHTML = `
      <button>
        <div class="person-image">
          <img src=${person.picture.medium}>
        </div>
        <div class="person-info">
          <div class="person-name">
            <h2>${person.name.first} ${person.name.last}</h2>
          </div>
          <div class="person-email">
            <h3>${person.email}</h3>
          </div>
          <div class="person-city">
            <h3>${person.location.city}</h3>
          </div>
        </div>
      </button>
    `;
  });
  const sectionButton = document.querySelectorAll(".section button");
  sectionButton.forEach((button, index) => {
    button.addEventListener("click", () => {
      generateModal(data[index]);
    });
  });
}
/* Generate modal information--------------------------*/
// Take the section that was passed in and map each person
// Create an element to hold the section in the modal
// Append the section to the list of people in the modal
// Set the inner HTML of the modal being viewed.
async function generateModal(person) {
  const modalPeopleList = document.getElementById("modal");
  const modalSection = document.createElement("section");
  modalPeopleList.appendChild(modalSection);
  modalSection.innerHTML = `
      <img src=${person.picture.medium}>
      <h2>${person.name.first} ${person.name.last}</h2>
      <h3>${person.email}</h3>
      <h3>${person.cell}</h3>
      <h3>${person.location.street} ${person.location.city} ${person.location.state} ${person.location.postcode}</h3>
      <h3>${person.dob.date}</h3>
    `;
  // If user clicks the closing 'x', change display of modalPeopleList (id=modal-people) from "none" to "block"
  window.onclick = function(event) {
    if (event.target == modalPeopleList) {
      modalPeopleList.style.display = "none";
    }
  };
}
/* Fetch the data--------------------------*/
// Turn response into json
// Send the data to the generateHTML function
// Catch any errors
fetch(apiURL)
  .then(response => response.json())
  .then(data => generateHTML(data.results))
  .catch(error => console.log("Looks like there was a problem", error));
