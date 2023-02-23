// Declaring Variables
let confirmButton = document.querySelector(".link-button");
let backButton = document.querySelector(".previous");
let planName = document.querySelector(".summary .menu .lists .plan h4");
let planPrice = document.querySelector(".summary .menu .lists .plan .price");
let featuresContainer = document.querySelector(".features");
let totalTime = document.querySelector(".total span");
let totalPrice = document.querySelector(".total-price");

// On clicking the BACK button
backButton.onclick = () => {
  window.history.back();
};

// On loading the page
window.onload = () => {
  // Checking if there is atleast one of the data in the localStorage
  if (window.localStorage.personalInfo) {
    // Plan data
    let planData = JSON.parse(window.localStorage.planData);
    planName.innerHTML = `${planData.planName} (${planData.time})`;
    planPrice.innerHTML = planData.amount;

    // Features data
    let featuresData = JSON.parse(window.localStorage.picksData);
    if (featuresData.length == 0) {
      let featuresMessage = document.createElement("span");
      featuresMessage.className = "no-features-message";
      featuresMessage.appendChild(
        document.createTextNode("No features selected")
      );
      featuresContainer.appendChild(featuresMessage);
    } else {
      createFeatures(featuresData);
    }

    // Total Price
    totalTime.innerHTML = planData.time.toLowerCase();
    let prices = document.querySelectorAll("span.price");
    let total = 0;
    prices.forEach((p) => {
      total += +p.innerHTML.match(/\d+/gi);
    });
    console.log(total);
    totalPrice.innerHTML = `+$${total}/${
      planData.time == "Month" ? "mo" : "yr"
    }`;
  } else {
    window.location.href = "index.html";
  }
};

function createFeatures(array) {
  for (let i = 0; i < array.length; i++) {
    let feature = document.createElement("div");
    feature.className = "feature";

    let featureName = document.createElement("span");
    featureName.className = "feature-name";
    featureName.appendChild(document.createTextNode(array[i].featureName));
    feature.appendChild(featureName);

    let featurePrice = document.createElement("span");
    featurePrice.className = "price";
    featurePrice.appendChild(document.createTextNode(array[i].featurePrice));
    feature.appendChild(featurePrice);

    featuresContainer.appendChild(feature);
  }
}

// On clicking the CONFIRM button
confirmButton.onclick = () => {
  window.localStorage.clear();
  window.location.href = "finish.html";
};
