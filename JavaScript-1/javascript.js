console.log('Hello world !!!');

// get button element
const registerButton = document.querySelector('.register-button');
console.log(registerButton);

function check_resigter()
{
    const usernameElement = document.getElementsByName('username');
    const username = usernameElement[0].value;
    let errormess;
    if(!username)
    {
        errormess = document.getElementById("username-error");
        errormess.innerText = 'You forget to fill the input above';
    }
    const emailElement = document.getElementsByName('email');
    const email = emailElement[0].value;
    if(!email)
    {
        errormess = document.getElementById("email-error");
        errormess.innerText = 'You forget to fill the input above';
    }
    const passwordElement = document.getElementsByName('password');
    const password = passwordElement[0].value;
    if(!password)
    {
        errormess = document.getElementById("password-error");
        errormess.innerText = 'You forget to fill the input above';
    }
    const r_passwordElement = document.getElementsByName('r-password');
    const r_password = r_passwordElement[0].value;
    if(!password)
    {
        errormess = document.getElementById("r-password-error");
        errormess.innerText = 'You forget to fill the input above';
    }
    if(password!== r_password&&!!password&&!!r_password)
    {
        errormess = document.getElementById("r-password-error");
        errormess.innerText = 'Nhap password lai cung sai!!!';
    }
}

// add event listener
registerButton.addEventListener('click', check_resigter);