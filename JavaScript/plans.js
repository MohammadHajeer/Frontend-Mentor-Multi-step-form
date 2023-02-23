// Declaring Variables
let nextButton = document.querySelector(".link-button");
let backButton = document.querySelector(".previous");
let plans = document.querySelectorAll(".plans .plan");
let timeSwitcher = document.querySelector(".plans-switcher label");
let timeSwitcherCheck = document.querySelector(".plans-switcher input");
let monthlyTime = document.querySelector(".monthly");
let yearlyTime = document.querySelector(".yearly");

// On clicking the BACK button
backButton.onclick = () => {
  plansData();
  window.history.back();
};

plans.forEach((p) => {
  p.onclick = () => {
    // Remove active class
    plans.forEach((p) => p.classList.remove("active"));
    // Add active class
    p.classList.add("active");
  };
});

// On clicking the NEXT button
nextButton.onclick = () => {
  plansData();
  window.location.href = "add-ons.html";
};

// Creation of data
function plansData() {
  plans.forEach((p) => {
    if (p.classList.contains("active")) {
      // Storing plan data inside an object
      let planObject = {
        planName: p.children[1].children[0].innerHTML,
        amount: p.children[1].children[1].innerHTML,
        time:
          p.children[1].children[1].innerHTML.match(/\w+/gi)[1] == "mo"
            ? "Month"
            : "Year",
      };
      // Saving the object in the localStorage
      window.localStorage.planData = JSON.stringify(planObject);
    }
  });
}

// Switching time mo/yr
timeSwitcher.onclick = () => {
  // Yearly
  if (timeSwitcherCheck.checked == true) {
    yearlyTime.classList.add("active");
    monthlyTime.classList.remove("active");

    plans.forEach((p) => {
      // Changing prices per year
      let planPrice = p.lastElementChild.lastElementChild;
      planPrice.innerHTML = planPrice.getAttribute("data-year");

      // Creating message offer per year
      let messageOffer = document.createElement("span");
      messageOffer.appendChild(
        document.createTextNode(p.getAttribute("data-year-offer"))
      );
      p.lastElementChild.appendChild(messageOffer);
    });
    // Monthly
  } else {
    yearlyTime.classList.remove("active");
    monthlyTime.classList.add("active");

    plans.forEach((p) => {
      //Changing prices per month
      let planPrice = p.lastElementChild.children[1];
      planPrice.innerHTML = planPrice.getAttribute("data-month");

      // Removing message offer per year
      p.lastElementChild.lastElementChild.remove();
    });
  }
};

// On loading the page
window.onload = () => {
  if (window.localStorage.personalInfo) {
    let planData = JSON.parse(window.localStorage.planData);
    if (planData.time == "Year") {
      timeSwitcher.click();
    }
    plans.forEach((p) => {
      p.classList.remove("active");
      let planName = p.children[1].children[0].innerHTML;
      if (planName == planData.planName) {
        p.classList.add("active");
      }
    });
  } else {
    window.location.href = "index.html";
  }
};
