// Declaring Variables
let nextButton = document.querySelector(".link-button");
let inputs = document.querySelectorAll(".inputs .input input");
let inputContainer = document.querySelectorAll(".inputs .input");

// On clicking the NEXT button
nextButton.onclick = () => {
  let allInputsAreFilledCorrectly = true;
  inputs.forEach((i) => {
    if (i.value.trim() == "") {
      i.classList.add("error");
      allInputsAreFilledCorrectly = false;

      // Creating the error-message for the missed values without repition
      if (i.parentElement.firstElementChild.children.length == 0) {
        let errorMessage = document.createElement("span");
        errorMessage.className = "error-message";
        errorMessage.appendChild(
          document.createTextNode("This Field is required")
        );
        i.parentElement.firstElementChild.appendChild(errorMessage);
      }
    }
    if (i.classList.contains("wrong-values")) {
      allInputsAreFilledCorrectly = false;
    }
  });

  // Checking the inputs before heading to the next page
  if (allInputsAreFilledCorrectly) {
    // Creating Object
    dataObject = {
      name: inputs[0].value,
      email: inputs[1].value,
      number: inputs[2].value,
    };
    // Saving data to the local storage
    window.localStorage.personalInfo = JSON.stringify(dataObject);
    window.location.href = "plans.html";
  }
};

inputs.forEach((i) => {
  // For condition purpose
  let rgx = new RegExp(`${i.getAttribute("data-match")}`, "gi");
  i.onkeyup = () => {
    // Remove the error border color
    i.classList.remove("error");
    // Checking for the error-message
    if (i.parentElement.firstElementChild.children.length != 0) {
      i.parentElement.firstElementChild.firstElementChild.remove();
    }
    // Checking for values
    if (i.value.trim() != "") {
      // Checking if values match the conditions, if not the class "wrong-values" is assigned to the specified input
      if (i.value.match(rgx) == null) {
        i.classList.add("wrong-values");
      } else {
        i.classList.remove("wrong-values");
      }
    }
  };
  // It will replace the input multiple values with only the conditon value
  i.addEventListener("blur", () => {
    if (i.value.match(rgx) != null) i.value = i.value.match(rgx)[0];
  });
});
