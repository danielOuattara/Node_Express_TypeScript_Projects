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

// submit form
const btn = document.querySelector(".submit-btn");
const input = document.querySelector(".form-input");
const formAlert = document.querySelector(".form-alert");

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  const nameValue = input.value;

  try {
    const { data } = await axios.post("/api/people", {
      name: nameValue,
    });
    console.log("data = ", data);
    // const h5 = document.createElement("h5");
    // h5.textContent = data.name;
    // result.appendChild(h5);
    fetchPeople();
  } catch (error) {
    console.log(error.response);
    formAlert.textContent = error.response.data.msg;
  }
  input.value = "";
});
