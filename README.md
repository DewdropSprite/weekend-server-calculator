# Project Name

[Project Instructions](./INSTRUCTIONS.md), this line may be removed once you have updated the README.md

## Description

Your project description goes here. What problem did you solve? How did you solve it?

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).


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
