console.log('client.js is sourced!');

myResults();
let currenCalculations = {}


function myResults() {
    axios({
        method: 'GET',
        url: "/calculations"
    })
        .then((response) => {
            console.log('inside GET response', response.data)

            let responseData = response.data;
            //resultHistory
            let newestResult = responseData[responseData.length - 1];
            let resultHistory = document.getElementById("resultHistory");
            resultHistory.innerHTML = ''
            for (let items of responseData) {
                resultHistory.innerHTML += `<div> ${items.numOne} ${items.operator} ${items.numTwo} = ${items.result}</div>`
            }
            //recentResult
            let recentResult = document.getElementById('recentResult');
            recentResult.innerHTML = `<h2> Result: ${newestResult.result}</h2>`
        })
        .catch((error) => {
    console.log("server error", error);
})

}



// event for when = button is clicked
// values are stored in the currentCalculations{} object
function handleGetCalculations(event) {
    event.preventdefault();

    let numOne = " ";
    let numTwo = " ";
    let operator = " ";

    if (operator === '') {
        numOne += value;
        document.getElementById('numOneInput').value = numOne;
    } else {
        numTwo += value;
        document.getElementById('numTwoInput').value = numTwo
    }


    axios({
        method: 'POST',
        url: '/calculations',
        data: currenCalculations
    })
        .then((response) => {
            console.log("Success");
            myResults()
        })  
        .catch((error) => {
            console.log("server error:", error)
        })
        document.getElementById("calculator").reset()
}


//let operatorInput = document.getElementByID("operatorInput");
//const buttons = document.querySelectorAll("button");

// loop through each button and add a click event listener
//buttons.forEach(function(button) {
// button.addEventListener("click", function() {
// do something when the button is clicked
//  console.log("You clicked a button");
// });
//});


function setOperator(event) {
    event.preventdefault();
    let myOperator = event.target.textContent
    currenCalculations.operator = myOperator
    console.log(currenCalculations)
}


//When the = button is clicked, capture the input values and operator, then send this data to POST '/calculations'. You'll need to format it like so:
//{ numOne: 25, numTwo: 10, operator: '+' }
//<button onclick = "calculateHandler(event)">=</button>

//There should be a 'C' button that will clear the inputs.
//<button onclick = "clearInputs(event)">C</button>
function clearInputs(event) {
    event.preventdefault();
    numOne = '';
    numTwo = '';
    operator = '';
    document.getElementById('numOneInput').value = '';
    document.getElementById('numTwoInput').value = '';
}
