"use strict";
// const result = document.querySelector(".result")! as HTMLDivElement;
// // Import Axios and its type definitions
// import axios, { AxiosResponse, AxiosError } from "axios";
// // requesting & displaying people list on page loading
// const fetchPeople = async () => {
//   try {
//     const { data }: AxiosResponse<{ people: People[] }> = await axios.get(
//       "/api/people",
//     );
//     const people = data.people.map((person: People) => {
//       return `<h5>${person.name}</h5>`;
//     });
//     result.innerHTML = people.join("");
//   } catch (error) {
//     // Explicitly type the 'error' parameter as AxiosError
//     const axiosError = error as AxiosError;
//     if (axiosError.response) {
//       // The request was made, and the server responded with a status code
//       result.innerHTML = `<div class="alert alert-danger">${axiosError.response.data}</div>`;
//     } else if (axiosError.request) {
//       // The request was made but no response was received
//       result.innerHTML = `<div class="alert alert-danger">No response from the server</div>`;
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       result.innerHTML = `<div class="alert alert-danger">${axiosError.message}</div>`;
//     }
//   }
// };
// document.addEventListener("DOMContentLoaded", () => {
//   fetchPeople();
// });
