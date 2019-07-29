function Word_counter()
{
    const wordElement = document.getElementById('question');
    const word = wordElement.value;
    let x = 200 - word.length;
    const textareaElement = document.getElementById('w-counter');
    textareaElement.innerText = `Con lai ${x}/200`
}

const question = document.querySelector('#question');
question.addEventListener('input',Word_counter);
