const form = document.getElementById('the-form'),
    userName = document.getElementById('name'),
    email = document.getElementById('email'),
    pass1 = document.getElementById('password-1'),
    pass2 = document.getElementById('password-2'),
    subBtn = document.getElementById('sub'),
    resBtn = document.getElementById('res'),
    inputArr = [userName, email, pass1, pass2];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log('hell')
    inputArr.forEach((one) => {
        if (one.value === '') {
            showErr(one, `${getInpName(one)} is required!`)
        } else {
            showSucc(one)
        }
    })
    checkPass(pass1, pass2)
})

function getInpName(inp) {
    return inp.name.charAt(0).toUpperCase() + inp.name.slice(1)
}

function showErr(inp, theMessage) {
    inp.nextElementSibling.innerHTML = theMessage;
    inp.parentElement.className = 'input-field failed'
}

function showSucc(inp) {
    inp.parentElement.className = 'input-field success'
}

resBtn.addEventListener('click', (e) => {
    inputArr.forEach((one) => {
        one.parentElement.className = 'input-field'
    })
})

function checkPass(inp1, inp2) {
    if (inp1.value !== inp2.value) {
        showErr(inp2, 'Passwords must match!')
    }
}