console.log('client.js is sourced!');

myResults();
let currentCalculations = {}


// function for when +-*/ is clicked operatorClicked(event)
function setOperator(event) {
    event.preventDefault();
    let myOperator = event.target.textContent //this line of code extracts the text content (+ - * /) that was input
    currentCalculations.operator = myOperator// this keeps track of teh current state 
    console.log(currentCalculations)
}

// event for when = button is clicked calculateValue(event)
// values are stored in the currentCalculations{} object
function handleGetCalculations(event) {
    event.preventDefault();
    let firstNumberInput = document.getElementById("firstNumberInput").value
    let secondNumberInput = document.getElementById("secondNumberInput").value;

    currentCalculations.numOne = firstNumberInput
    currentCalculations.numTwo = secondNumberInput

    console.log("inside handleGetCalculations(event)", currentCalculations)

    axios({
        method: 'POST',
        url: '/calculations',
        data: currentCalculations
    })
        .then((res) => {
            console.log("Success in handleGetCalculations(event) POST");
            myResults()
            //document.getElementById("calculator").reset();
        })
        .catch((error) => {
            console.log("server error:", error)
        })



}

//function to display the result
function myResults() {

    axios({
        method: "GET",
        url: "/calculations",
    })
        .then((response) => { //.then is a "promise handler" that executes when GET request is successful
            console.log('inside GET response', response.data)

            let responseInfo = response.data;//response data is stored in variable responseInfo
            console.log("responseInfo:", responseInfo)
            let myResults = responseInfo[responseInfo.length - 1];
            console.log("myResults:", myResults)


            //recentResult
            let recentResult = document.getElementById('recentResult');
            recentResult.innerHTML = '';
            for(let items of responseInfo){
                recentResult.innerHTML = `<h2><p>${items.numOne} ${items.operator} ${items.numTwo} = ${items.result}</p></h2>`;
            }
            console.log("recentResult:", recentResult)
            
            
             //resultHistory
            let resultHistory = document.getElementById("resultHistory");
           resultHistory.innerHTML = ''
            for (let items of responseInfo) {
                resultHistory.innerHTML += `<h2><li> ${items.numOne} ${items.operator} ${items.numTwo} = ${items.result}</li></h2>`
            }
            console.log("resultHistory:", resultHistory)
            
        })
        .catch((error) => {
            console.log("server error", error);
        })

}



//function for when C button is clicked
function clearInputs(event) {
    event.preventDefault()
    numOne = '';
    numTwo = '';
    operator = '';

    document.getElementById("firstNumberInput").value = '';
    document.getElementById("secondNumberInput").value = '';
}
