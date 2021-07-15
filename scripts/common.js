let disableLoader = () => {
    document.getElementById("loader").style.visibility = "hidden";
    document.getElementsByTagName("body")[0].style.visibility = "visible";
}

let displayLoader = () => {
    document.getElementsByTagName("body")[0].style.visibility = "hidden";
    document.getElementById("loader").style.visibility  = "visible";
}

let displayHeaderTemplate = () => {
let headerTemplate = `<a href="index.html" class="logo">
<img src="assests/images/logo.png" id="logo-image" alt="logo"/>
</a>
<button type="button" id="login" class="btn btn-light btn-sm" data-bs-toggle="modal" data-backdrop="false" data-bs-target="#login-modal" onclick="mainLogin(event)">LOGIN</button>
<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="login-modal-label" aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="login-modal-label">Please Login</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            </button>
        </div>
        <div class="modal-body">
            <form id="login-form" action="index.html" method="GET" target="_self">
                <div class="login-field">
                    <label for="username">Username: </label>
                    <input type="text" id="username" name="username" placeholder="Enter Username" required />
                </div>
                <div class="login-field">
                    <label for="password">Password: </label>
                    <input type="password" id="password" name="password" placeholder="Enter Password" required />
                </div>
                <div class="modal-footer" style = "margin-top: 12px;">
            <button id="login-button" class="btn btn-primary" onclick="login(event)">Login</button>
        </div>
            </form>
        </div>
        
    </div>
</div>
</div>`;

document.getElementById('header').innerHTML = headerTemplate;
};

let displayFooterTemplate = () => {
let footerTemplate = `<div id="contact">
<button type="button" class="btn btn-info btn-sm" id="btn1" data-bs-toggle="modal" data-backdrop="false" data-bs-target="#contact-modal">Contact Us</button>
<div class="modal fade" id="contact-modal" tabindex="-1" role="dialog" aria-labelledby="contact-modal-label" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="contact-modal-label">Get in touch</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    
                </button>
            </div>
            <div class="modal-body">
                <form action="index.html" method="GET" target="_self">
                    <p>
                        Thank you for reaching out!!! <br>
                        Please enter you email and we will get back to you.
                    </p>
                    <label for="email">Email: </label>
                    <input type="text" id="email" name="email" placeholder="Enter your email id" required>
                    <div class="modal-footer" style = "margin-top: 20px;">
                <button class="btn btn-primary">Sumbit</button>
            </div>
                </form>
            </div>
            
        </div>
    </div>
</div>
</div>
<div id="copyright-text">
© 2020 ROOM SEARCH PVT. LTD.
</div>
<div id="social-media-images">
<a href="https://www.facebook.com" target="_blank" style="text-decoration: none !important;">
    <img src="assests/images/facebook.png" class="social-media-image">
</a>
<a href="https://www.instagram.com" target="_blank" style="text-decoration: none !important;">
    <img src="assests/images/instagram.png" class="social-media-image">
</a>
<a href="https://twitter.com" target="_blank" style="text-decoration: none !important;">
    <img src="assests/images/twitter.png" class="social-media-image"  >
</a>
</div>`;

document.getElementById('footer').innerHTML = footerTemplate;
};


displayLoader();
displayHeaderTemplate();
displayFooterTemplate();

let mainLogin = e => {
    if (localStorage.getItem('isLogin') === 'true') {
        localStorage.setItem('isLogin', 'false');
        location.reload();
    }
};


let login = e => {
   
    localStorage.setItem('username', 'admin');
    localStorage.setItem('password', 'admin');
    
    localStorage.setItem('isLogin', 'false');

    e.preventDefault();
    let userElement = document.getElementById('username');
    let passwordElement = document.getElementById('password');

    if (
        userElement.value === localStorage.getItem('username') &&
        passwordElement.value === localStorage.getItem('password')
    ) {
        localStorage.setItem('isLogin', 'true');
        alert('Successfully logged in!');
        let loginElement = document.getElementById('login')
        loginElement.dataset.target = '';
        loginElement.innerText = 'LOGOUT';
        location.reload();
    } else {
        alert('Incorrect credentials! Login failed!');
        
        userElement.value = '';
        passwordElement.value = '';
    }
};

let isLogin = localStorage.getItem('isLogin');
let loginElement = document.getElementById('login');


let checkLogin = () => {
    if (!isLogin || isLogin === 'false') {
        localStorage.clear();
        loginElement.dataset.target = '#login-modal';
        loginElement.innerText = 'LOGIN';
    } else if (isLogin === 'true') {
        loginElement.dataset.target = '';
        loginElement.innerText = 'LOGOUT';
    }
}

checkLogin();