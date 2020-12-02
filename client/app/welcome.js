//Holds values for the welcome page, allows for data to be load on login
const name = document.getElementById('username').innerHTML;
const poem0 = document.getElementById('poem0').innerHTML;
const poem1 = document.getElementById('poem1').innerHTML;
const poem2 = document.getElementById('poem2').innerHTML;

//Welcome element
const Welcome = (props) => {
    return(
    <div>
        <h3>Welcome {name}</h3>
        <input type="hidden" name="_csrf" value={props.csrf} />
    </div>
    );
};

//The random poem provided to the user
const HorrorScope = (props) => {
    return(
    <div>
        <h3>Horror Scope</h3>
        <p>{poem0}</p>
        <p>{poem1}</p>
        <p>{poem2}</p>
        <input type="hidden" name="_csrf" value={props.csrf} />
    </div>
    );
};

//Changes the users password
const handleChangePassword = (e) => {
    e.preventDefault();

    $("#animatedErrorMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '' || $("#pass3").val() == ''){
        handleError("All fields required");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()){
        handleError("Passwords do not match");
        return false;
    }

    if($("#pass").val() === $("#pass3").val()){
        handleError("Can't set the same password");
        return false;
    }


    sendAjax('POST', $("#changePasswordForm").attr("action"), $("#changePasswordForm").serialize(), redirect);

    return false;
};

//Builds password change element, could add other user profile settings
const Profile = (props) => {
    return(
    <div>
        <h3>Profile</h3>
        <form id="changePasswordForm" name="changePasswordForm"
            onSubmit={handleChangePassword}
            action="/changePassword"
            method="POST"
            className="mainForm"
        >
        <input id="user" type="hidden" name="username" value={name} readOnly/>
        <label htmlFor="pass">Current Password: </label>
        <input id="pass" type="password" name="pass" placeholder="password"/>
        <label htmlFor="pass2">Retype Current Password: </label>
        <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
        <label htmlFor="pass3">New Password: </label>
        <input id="pass3" type="password" name="pass3" placeholder="new password"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Change Password"/>
    </form>
        <input type="hidden" name="_csrf" value={props.csrf} />
    </div>
    );
};

//Connects the 'pages'
const createWelcome = (csrf) => {
     ReactDOM.render(
        <Welcome csrf={csrf}/>,
        document.getElementById('content')
    );
};

const createHorrorScope = (csrf) => {
    ReactDOM.render(
       <HorrorScope csrf={csrf}/>,
       document.getElementById('content')
   );
};

const createProfile = (csrf) => {
    ReactDOM.render(
       <Profile csrf={csrf}/>,
       document.getElementById('content')
   );
};

//Sets up navigation
const setup = (csrf) => {
    const welcomeButton = document.getElementById('welcomeButton');
    const horrorScopeButton = document.getElementById('horrorScopeButton');
    const profileButton = document.getElementById('profileButton');
    
    if(welcomeButton || horrorScopeButton || profileButton){
        welcomeButton.addEventListener("click", (e) => {
            e.preventDefault();
            createWelcome(csrf);
            return false;
        });
    
        horrorScopeButton.addEventListener("click", (e) => {
            e.preventDefault();
            createHorrorScope(csrf);
            return false;
        });
    
        profileButton.addEventListener("click", (e) => {
            e.preventDefault();
            createProfile(csrf);
            return false;
        });
    
        createWelcome(csrf);
    }
};
