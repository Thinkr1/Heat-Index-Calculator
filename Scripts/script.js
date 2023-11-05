var temp = document.getElementById("temp");
var humid = document.getElementById("humid");
let button = document.getElementById("button");

const calc = (temp, humid) => {
  const tempC = (temp - 32) * (5 / 9);
  const tempF = temp * (9 / 5) + 32;
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
    -1.99 * 10 ** -6 * tempF ** 2 * humid ** 2;
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
    -4.81975 * 10 ** -11 * tempF ** 3 * humid ** 3;
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
    -3.582 * 10 ** -6 * temp ** 2 * humid ** 2;
  console.log({ HIF1, HIF2, HIC });
  return { /*HIF1, */ HIF2, HIC };
};

button.addEventListener("click", (e) => {
  e.preventDefault(); // prevent form submission
  if (temp.value.length < 1 || humid.value.length < 1) {
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
    const snackbar = document.getElementById("snackbar");
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

function showPopup() {
  var popup = document.getElementById("sourcesp");
  popup.classList.toggle("show");
}

function showNotif() {
  var a = document.getElementById("snackbar");
  a.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 5000);
}
