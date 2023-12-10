console.log('client.js is sourced!');

let myResults;
let currentMath = {}

function setOperator(event) {
    event.preventdefault();
    let myOperator = event.target.textContent
    currentMath.operator = myOperator
    console.log(results)
}

//Inside the <section data-testid="resultHistory"> element, display a list of all previous calculations on the page when it loads (using a GET '/calculations' request).
//Update this list when a new calculation is made.


// event for when = button is clicked
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
        data: {
            num: currentMath
        },
        data: currentMath
    })
        .then((response) => {
            console.log("Success", response.data);
            myMath()
            let resultHistory = document.getElementByID('resultHistory')
            resultHistory.innerHTML = '';
            for (const calculationItem of response.data) {
                resultHistory.innerHTML += `<li>${calculationItem.numOneInput} ${calculationItem.operator} ${calculationItem.numTwoInput} = ${resultHistory} </>`
            }
        }
        ).catch((error) => {
            console.log("server error:", error)
        })
}


//Inside the <section data-testid="recentResult"> element, display the most recent calculation result.
//Update this when a new calculation is made.

function myMath() {
    axios({
        method: 'GET',
        url: "/calculations"
    })
        .then((response) => {
            console.log('inside displayResults GET', response.data)
            let responseData = response.data;

            let currentMath = responseData[responseData.length - 1].numbers
            let resultHistory = document.getElementById("resultHistory")
            resultHistory.innerHTML += `<div> ${currentMath.numOne} ${currentMath.operator} ${currentMath.numTwo} = ${currentMath.result}</div>`
            resultHistory.innerHTML = ''
            for (let items of responseData) {
                resultHistory.innerHTML += `<div>${items.numOne} ${items.operator} ${items.numtwo} = ${items.result}</div>`
            }

            let myResult = document.getElementById('result')
            result.innerHTML = myResult.result
            let myRecentResult = document.getElementById('recentResult')
            myRecentResult.innerHTML = `<h2> Result: ${myRecentResult.result}</h2>`

        })
        .catch((error) => {
            console.log("server error", error);
        })
}



//Inside <form data-testid="calculator">:
//Create a user interface where the user can input two values and select a mathematical operator.


//Each mathematical operator is represented by a button:
//<button onclick = "setOperator(event)">+</button>
//<button onclick = "setOperator(event)">-</button>
//<button onclick = "setOperator(event)">*</button>
//<button onclick = "setOperator(event)">/</button>

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

//let operatorInput = document.getElementByID("operatorInput");
//const buttons = document.querySelectorAll("button");

// loop through each button and add a click event listener
//buttons.forEach(function(button) {
// button.addEventListener("click", function() {
// do something when the button is clicked
//  console.log("You clicked a button");
// });
//});
