import IMask from "imask";

const mask = {
  cvc: {
    mask: "000",
  },
  expiration: {
    mask: "MM{/}YY",
    blocks: {
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
      },
      YY: {
        mask: IMask.MaskedRange,
        from: String(new Date().getFullYear()).slice(2),
        to: String(new Date().getFullYear() + 10).slice(2),
      },
    },
  },
  numberCard: {
    mask: [
      {
        mask: "0000 0000 0000 0000",
        regex: /^4\d{0,15}/,
        cardtype: "visa",
      },
      {
        mask: "0000 0000 0000 0000",
        regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
        cardtype: "mastercard",
      },
      {
        mask: "0000 0000 0000 0000",
        cardtype: "default",
      },
    ],
    dispatch: function (appended, dynamicMasked) {
      const number = (dynamicMasked.value + appended).replace(/\D/g, "");
      const foundMask = dynamicMasked.compiledMasks.find(function (item) {
        return number.match(item.regex);
      });
      return foundMask;
    },
  },
};

const cvcInput = document.querySelector("#security-code");
const cvcMask = mask.cvc;
export const cvc = IMask(cvcInput, cvcMask);

const expirationDate = document.querySelector("#expiration-date");
const expirationMask = mask.expiration;
export const expiration = IMask(expirationDate, expirationMask);

const cardNumberInput = document.querySelector("#card-number");
const cardNumberMask = mask.numberCard;
export const cardNumber = IMask(cardNumberInput, cardNumberMask);
