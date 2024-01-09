const result = document.querySelector(".result");

// requesting & displaying people list on page loading
const fetchPeople = async () => {
  try {
    const { data } = await axios.get("/api/people");
    const people = data.people.map((person) => {
      return `<h5>${person.name}</h5>`;
    });
    result.innerHTML = people.join("");
  } catch (error) {
    result.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
  }
};

fetchPeople();
