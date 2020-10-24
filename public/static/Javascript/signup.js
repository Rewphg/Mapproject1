const signupName =document.getElementById('signup-name');
const pw = document.getElementById('pw');
const email = document.getElementById('email');

//stored data from register form
function store() {
    console.log(signupName.value, pw.value, email.value)
    localStorage.setItem('name',signupName.value);
    localStorage.setItem('pw',pw.value);
    localStorage.setItem('email',email.value);
    alert('Your account has been created')
    
}

//check if login data = registered data
function check() {
    
    const storedname = localStorage.getItem('name');
    const storedpw = localStorage.getItem('pw');

    const regname = document.getElementById('username');
    const regpw = document.getElementById('password');

    console.log(regname.value, regpw.value)
    
    if(regname.value == storedname && regpw.value == storedpw) {
        alert('successful')
        window.location.href="/TestMap.html"
    }else{
        alert("Error")
    }
}



