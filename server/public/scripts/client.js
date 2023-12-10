console.log('client.js is sourced!');

function onReady() {
    handleGetCalculations()

}

//Inside the <section data-testid="resultHistory"> element, display a list of all previous calculations on the page when it loads (using a GET '/calculations' request).
//Update this list when a new calculation is made.

function handleGetCalculations() {
    axios({
        method: 'GET',
        url: '/calculations'
    })
        .then((response) => {
            console.log("Success", response.data);
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





//Inside <form data-testid="calculator">:
//Create a user interface where the user can input two values and select a mathematical operator.
//Each mathematical operator is represented by a button:
//<button>+</button>
//When the = button is clicked, capture the input values and operator, then send this data to POST '/calculations'. You'll need to format it like so:
//{ numOne: 25, numTwo: 10, operator: '+' }
//There should be a 'C' button that will clear the inputs.

let numOne = " ";
let numTwo = " ";
let operator = " ";

function appendValue(value) {
    if (operator === '') {
        numOne += value;
        document.getElementById('numOneInput').value = numOne;
    } else {
        numTwo += value;
        document.getElementById('numTwoInput').value = numTwo
    }
}

function setOperator(op) {
    operator = op;
}

function clearInputs() {
    numOne = '';
    numTwo = '';
    operator = '';
    document.getElementById('numOneInput').value = '';
    document.getElementById('numTwoInput').value = '';
}

function calculateHandler(event) {
    event.preventdefault;

    if (numOne !== '' && numTwo !== '' && operator !== '') {
        const calculationData = {
            numOne: parseFloat(numOne),
            numTwo: parseFloat(numTwo),
            operator: operator
        };

        axios({
            method: 'POST',
            url: '/calculations',
            data: {
                numOne,
                numTwo,
                operator,
            },
            body: JSON.stringify(calculationData),
        })
            .then(response => response.json())
            .then(data => {
                alert('Result: ' + data.result);
                clearInputs();
            })
            .catch(error => {
                console.log('Error:', error);

            })
    }
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

onReady();