// // submit form
// const btn = document.querySelector(".submit-btn")! as HTMLButtonElement;
// const input = document.querySelector(".form-input")! as HTMLInputElement;
// const formAlert = document.querySelector(".form-alert")! as HTMLElement;
// import { fetchPeople } from "./fetch-user";

// btn.addEventListener("click", async (e) => {
//   e.preventDefault();
//   const nameValue = input.value;

//   try {
//     const { data } = await axios.post("/api/people", {
//       name: nameValue,
//     });
//     console.log("data = ", data);
//     // const h5 = document.createElement("h5");
//     // h5.textContent = data.name;
//     // result.appendChild(h5);
//     fetchUser();
//   } catch (error) {
//     // console.log(error.response)
//     formAlert.textContent = error.response.data.msg;
//   }
//   input.value = "";
// });
