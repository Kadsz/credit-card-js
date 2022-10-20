import "./css/index.css";
import "../utils/masks";
import { cardNumber, expiration, cvc } from "../utils/masks";

const form = document.querySelector("form");

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(type) {
  const colors = {
    visa: ["#436d99", "#2d57f2"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "gray"],
  };

  ccBgColor01.setAttribute("fill", colors[type][0]);
  ccBgColor02.setAttribute("fill", colors[type][1]);
  ccLogo.setAttribute("src", `cc-${type}.svg`);
}

const addButton = document.querySelector("#add-button");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

const cardHolder = document.querySelector("#card-holder");
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value");
  ccHolder.innerText = cardHolder.value.length === 0 ? "Fulano da silva" : cardHolder.value;
});

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value");
  ccSecurity.innerText = code.value.length === 0 ? "123" : code.value;
}
cvc.on("accept", () => {
  updateSecurityCode(cvc);
});

cardNumber.on("accept", () => {
  const cardType = cardNumber.masked.currentMask.cardtype;
  setCardType(cardType);
  updateNumberCard(cardNumber);
});

function updateNumberCard(number) {
  const ccNumberCard = document.querySelector(".cc-number");
  ccNumberCard.innerText = number.value.length === 0 ? "1234 5678 9012 3456" : number.value;
}

expiration.on("accept", () => {
  updateExpirationDate(expiration);
});

function updateExpirationDate(date) {
  const ccExpirationDate = document.querySelector(".cc-expiration .value");
  ccExpirationDate.innerText = date.value.length === 0 ? "19/22" : date.value;
}
