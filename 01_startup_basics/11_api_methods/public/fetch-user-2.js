"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

const result = document.querySelector(".result");
// requesting & displaying people list on page loading
const fetchPeople = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { data } = yield axios.get("/api/people");
      const people = data.people.map((person) => {
        return `<h5>${person.name}</h5>`;
      });
      result.innerHTML = people.join("");
    } catch (error) {
      // Explicitly type the 'error' parameter as AxiosError
      const axiosError = error;
      if (axiosError.response) {
        // The request was made, and the server responded with a status code
        result.innerHTML = `<div class="alert alert-danger">${axiosError.response.data}</div>`;
      } else if (axiosError.request) {
        // The request was made but no response was received
        result.innerHTML = `<div class="alert alert-danger">No response from the server</div>`;
      } else {
        // Something happened in setting up the request that triggered an Error
        result.innerHTML = `<div class="alert alert-danger">${axiosError.message}</div>`;
      }
    }
  });

fetchPeople();
