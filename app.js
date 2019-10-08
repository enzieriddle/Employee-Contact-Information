const apiURL = "https://randomuser.me/api/?results=12";
const peopleList = document.getElementById("people");

/* Fetch the data and turn it into JSON --------------------------*/
async function createJSON() {
  const apiJson = fetch(apiURL).then(response => response.json());
  // console.log(apiJson);
  return apiJson;
}

/* Post profile information in index.html --------------------------*/
// Create instance of createJSON
// Use .map() to take a single person from the array of people
// Create the section variable to store each person in
// Append each section to the peopleList div
// Create HTML tags and store information within them

async function genereateHTML() {
  const people = createJSON(apiJson);
  people.map(person => {
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

createJSON();
