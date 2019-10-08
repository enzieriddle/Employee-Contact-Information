const apiURL = "https://randomuser.me/api/?results=12";
const peopleList = document.getElementById("people");

/* Post profile information in index.html --------------------------*/
// Create instance of createJSON
// Use .map() to take a single person from the array of people
// Create the section variable to store each person in
// Append each section to the peopleList div
// Create HTML tags and store information within them

async function genereateHTML(data) {
  data.map(person => {
    const section = document.createElement("section");
    peopleList.appendChild(section);
    section.innerHTML = `
      <img src=${person.picture.medium}>
      <h2>${person.name}</h2>
      <h3>${person.email}</h3>
      <h3>${person.location.city}</h3>
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
  .catch(error => console.log("Looks like there was a problem", error));