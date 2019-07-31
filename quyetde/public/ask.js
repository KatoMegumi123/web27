window.onload = () => {
    
    const submitButton = document.querySelector('.submit-button');
    console.log(submitButton);
    if(submitButton)
    {
        submitButton.addEventListener('click',(event)  => {
        const textAreaValue = document.querySelector('.question').value;
        event.preventDefault();
        fetch('/create-question',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionContent: textAreaValue,
            }),
        })
            .then((response)=>{
                // response.json() only when server reponse with json
                // response.text() only when server response with string
                return response.json();
            })
            .then((data)=>{
                // xu ly response data
                console.log('Data: ',data);
            })
            .catch((error)=>{
                console.log(error);
                window.alert(error.message);
            });
        });
    }
    function Word_counter()
    {
        const wordElement = document.querySelector('.question');
        const word = wordElement.value;
        let x = 200 - word.length;
        const textareaElement = document.getElementById('w-counter');
        textareaElement.innerText = `Con lai ${x}/200`
    }

    const question = document.querySelector('.question');
    question.addEventListener('input',Word_counter);
}