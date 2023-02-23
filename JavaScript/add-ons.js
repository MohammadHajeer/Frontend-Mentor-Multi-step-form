// Declaring Variables
let nextButton = document.querySelector(".link-button");
let backButton = document.querySelector(".previous");
let price = document.querySelectorAll(".price-per-time");
let features = document.querySelectorAll(".add-ons .features .feature");

// On clicking the BACK button
backButton.onclick = () => {
  picksAddOnsData();
  window.history.back();
};

// On Loading the page
window.onload = () => {
  if (window.localStorage.personalInfo) {
    let planData = JSON.parse(window.localStorage.planData);

    if (planData.time == "mo") {
      price.forEach((p) => {
        p.innerHTML = p.getAttribute("data-month");
      });
    } else {
      price.forEach((p) => {
        p.innerHTML = p.getAttribute("data-year");
      });
    }

    // Saved data
    if (window.localStorage.picksData) {
      let picksData = JSON.parse(window.localStorage.picksData);
      console.log(picksData);

      features.forEach((f) => {
        picksData.forEach((p) => {
          if (
            f.firstElementChild.lastElementChild.firstElementChild.innerHTML ==
            p.featureName
          ) {
            f.click();
          }
        });
      });
    }
  }else {
    window.location.href = "index.html"
  }
};
// On checking
features.forEach((c) => {
  c.onclick = () => {
    let addCheck = c.firstElementChild.firstElementChild;
    if (addCheck.checked) {
      addCheck.checked = false;
      c.classList.remove("active");
    } else {
      addCheck.checked = true;
      c.classList.add("active");
    }
  };
});

// On clicking the NEXT button
nextButton.onclick = () => {
  picksAddOnsData();
  window.location.href = "summary.html";
};

// Create data
function picksAddOnsData() {
  // Array of data
  let picksData = [];
  features.forEach((f) => {
    if (f.classList.contains("active")) {
      // Store data inside an object
      let obj = {
        featureName:
          f.firstElementChild.lastElementChild.firstElementChild.innerHTML,
        featurePrice: f.lastElementChild.innerHTML,
      };
      // Store the data object inside the array
      picksData.push(obj);
    }
  });
  // Save the data in the localStorage
  window.localStorage.picksData = JSON.stringify(picksData);
  console.log(window.localStorage.picksData);
}
