const firstName = "Hugo Luca";
const lastName = "Tigane";
const datetimeValue = require("./datetime_et");

console.log("Programmi autor on: " + firstName + " " + lastName);

//console.log("Täna on: " + dateETformated());
console.log("Täna on: " + datetimeValue.dateETformated());
console.log("Kell on: " + datetimeValue.timeETformated());