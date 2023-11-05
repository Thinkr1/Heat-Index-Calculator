var temp = document.getElementById("temp");
var humid = document.getElementById("humid");
let button = document.getElementById("button");

// Function to calculate the heat index. The formulas below (in the vars HIF1, HIF2 and HIC) are from the Wikipedia source, https://en.wikipedia.org/wiki/Heat_index. I just formatted them for readability.
// Also, as I wanted the user to be inputting the value in degrees Celcius, I have made it this way. But if you want to make it so that it is in degrees Fahrenheit, the commented bits below (not just in the calc function) contain the whole logic for that.
const calc = (temp, humid) => {
  const tempC = (temp - 32) * (5 / 9); // Fahrenheit to Celcius (unused)
  const tempF = temp * (9 / 5) + 32; // Celcius to Fahrenheit
  //const HIF1 = -42.379 + (2.04901523 * temp) + (10.14333127 * humid) + (-0.22475541 * temp * humid) + (-6.83783 * (10 ** (-3)) * (temp ** 2)) + (-5.481717 * (10 ** (-2)) * (humid ** 2)) + (1.22874 * (10 ** (-3)) * (temp ** 2) * humid) + (8.5282 * (10 ** (-4)) * temp * (humid ** 2)) + (-1.99 * (10 ** (-6)) * (temp ** 2) * (humid ** 2));
  //const HIF2 = 16.923 + (0.185212 * temp) + (5.37941 * humid) + (-0.100254 * temp * humid) + (9.41695 * (10 ** (-3)) * (temp ** 2)) + (7.28898 * (10 ** (-3)) * (temp ** 2)) + (3.45372 * (10 ** (-4)) * (temp ** 2) * humid) + (-8.14971 * (10 ** (-4)) * temp * (humid ** 2)) + (1.02102 * (10 ** (-5)) * (temp ** 2) * (humid ** 2)) + (-3.8646 * (10 ** (-5)) * (temp ** 3)) + (2.91583 * (10 ** (-5)) * (humid ** 3)) + (1.42721 * (10 ** (-6)) * (temp ** 3) * humid) + (1.97483 * (10 ** (-7)) * temp * (humid ** 2)) + (-2.18429 * (10 ** (-8)) * (temp ** 3) * (humid ** 2)) + (8.43296 * (10 ** (-10)) * (temp ** 2) * (humid ** 3)) + (-4.81975 * (10 ** (-11)) * (temp ** 3) * (humid ** 3));
  const HIF1 =
    -42.379 +
    2.04901523 * tempF +
    10.14333127 * humid +
    -0.22475541 * tempF * humid +
    -6.83783 * 10 ** -3 * tempF ** 2 +
    -5.481717 * 10 ** -2 * humid ** 2 +
    1.22874 * 10 ** -3 * tempF ** 2 * humid +
    8.5282 * 10 ** -4 * tempF * humid ** 2 +
    -1.99 * 10 ** -6 * tempF ** 2 * humid ** 2; // First formula from the Wikipedia source (https://en.wikipedia.org/wiki/Heat_index), this one is obviously less precise that the HIF2 (most detailed one on Wikipedia) - it only contains 9 coefficients
  const HIF2 =
    16.923 +
    0.185212 * tempF +
    5.37941 * humid +
    -0.100254 * tempF * humid +
    9.41695 * 10 ** -3 * tempF ** 2 +
    7.28898 * 10 ** -3 * tempF ** 2 +
    3.45372 * 10 ** -4 * tempF ** 2 * humid +
    -8.14971 * 10 ** -4 * tempF * humid ** 2 +
    1.02102 * 10 ** -5 * tempF ** 2 * humid ** 2 +
    -3.8646 * 10 ** -5 * tempF ** 3 +
    2.91583 * 10 ** -5 * humid ** 3 +
    1.42721 * 10 ** -6 * tempF ** 3 * humid +
    1.97483 * 10 ** -7 * tempF * humid ** 2 +
    -2.18429 * 10 ** -8 * tempF ** 3 * humid ** 2 +
    8.43296 * 10 ** -10 * tempF ** 2 * humid ** 3 +
    -4.81975 * 10 ** -11 * tempF ** 3 * humid ** 3; // HIF2 is the most precise from the Wikipedia source, it contains 16 coefficients
  //const HIC = -8.78469475556 + (1.61139411 * tempC) + (2.33854883889 * humid) + (-0.14611605 * tempC * humid) + (-0.012308094 * (tempC ** 2)) + (-0.0164248277778 * (humid ** 2)) + (2.211732 * (10 ** (-3)) * (tempC ** 2) * humid) + (7.2546 * (10 ** (-4)) * tempC * (humid **2)) + (-3.582 * (10 ** (-6)) * (tempC ** 2) * (humid ** 2));
  const HIC =
    -8.78469475556 +
    1.61139411 * temp +
    2.33854883889 * humid +
    -0.14611605 * temp * humid +
    -0.012308094 * temp ** 2 +
    -0.0164248277778 * humid ** 2 +
    2.211732 * 10 ** -3 * temp ** 2 * humid +
    7.2546 * 10 ** -4 * temp * humid ** 2 +
    -3.582 * 10 ** -6 * temp ** 2 * humid ** 2; // A formula to get the temperature in Celcius (only 9 coefficients)
  console.log({ HIF1, HIF2, HIC });
  return { /*HIF1, */ HIF2, HIC }; // I prefer to return only HIF2 and HIC since HIF1 is another version of HIF2 but less precise
};

button.addEventListener("click", (e) => {
  e.preventDefault(); // prevent form submission
  if (temp.value.length < 1 || humid.value.length < 1) { // Checking if the user has inputted values on both fields. Even though I have added the `required` parameter to the input elements in the html file, this is only to show the error message
    console.log("Error: Make sure you input values on both fields!");
    alert("Error: Make sure you input values on both fields!");
  } else {
    console.log("form successfully submitted");
    var result = calc(parseFloat(temp.value), parseFloat(humid.value));
    console.log(
      /*"HIC: " + */ result.HIC +
        " °C" /* + "\nHIF1: " + result.HIF1 + " °F" + "\nHIF2: "*/ +
        "\n" +
        result.HIF2 +
        " °F"
    );
    const snackbar = document.getElementById("snackbar"); // This is to have the result added to the snackbar content. I have originally planned to show the result as an alert (see comment below) but decided to switch to a notification-type announcement
    snackbar.innerHTML =
      /*"HIC: " + */ result.HIC +
      " °C" /* + "\nHIF1: " + result.HIF1 + " °F" + "\nHIF2: "*/ +
      "\n" +
      result.HIF2 +
      " °F";
    showNotif();
    // alert(/*"HIC: " + */result.HIC + " °C"/* + "\nHIF1: " + result.HIF1 + " °F" + "\nHIF2: "*/ + "\n" + result.HIF2 + " °F");
  }
});

function showPopup() { // Function to add the class "show" to the popup element, thereby making it appear (that's for the sources part)
  var popup = document.getElementById("sourcesp");
  popup.classList.toggle("show");
}

function showNotif() { // Just adding a "show" class to the snackbar, making it appear
  var a = document.getElementById("snackbar");
  a.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 5000);
}
