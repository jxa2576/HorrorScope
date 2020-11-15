//Mock Data for horrorscope poem -TEMP will be moved to the DB
const data = {
    "horrors": [
        {"name":"Gremlin", "poem":["Gremlin 0", "Gremlin 1", "Gremlin 2"]},
        {"name":"Spectre", "poem":["Spectre 0", "Spectre 1", "Spectre 2"]},
        {"name":"Thing", "poem":["Thing 0", "Thing 1", "Thing 2"]}
    ]
};
let poem = "";

//Get random number taken
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (max) =>{
    return Math.floor(Math.random() * Math.floor(max));
};

//Given the JSON data, generates a random poen for the user
const randomHorrorPoem = () => {
    const randomHorrors = [];
    let rand = getRandomInt(3);
    let rand1 = getRandomInt(3);
    let rand2 = getRandomInt(3);

    while(rand === rand1 || rand1 === rand2 || rand2 === rand){
        rand1 = getRandomInt(3);
        rand2 = getRandomInt(3);
    };

    randomHorrors.push(data.horrors[rand].poem[0]);
    randomHorrors.push(data.horrors[rand1].poem[1]);
    randomHorrors.push(data.horrors[rand2].poem[2]);

    poem = randomHorrors;
};

const Welcome = (props) => {
    return(
    <div>
        <h3>Welcome</h3>
        <input type="hidden" name="_csrf" value={props.csrf} />
    </div>
    );
};

const HorrorScope = (props) => {
    return(
    <div>
        <h3>Horror Scope</h3>
        <p>{poem[0]}</p>
        <p>{poem[1]}</p>
        <p>{poem[2]}</p>
        <input type="hidden" name="_csrf" value={props.csrf} />
    </div>
    );
};

const Compendium = (props) => {
    return(
    <div>
        <h3>Compendium</h3>
        <p>{data.horrors[0].name}</p>
        <p>{data.horrors[1].name}</p>
        <p>{data.horrors[2].name}</p>
        <input type="hidden" name="_csrf" value={props.csrf} />
    </div>
    );
};

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
        <label htmlFor="username">Username: </label>
        <input id="user" type="text" name="username" placeholder="username"/>
        <label htmlFor="pass">Current Password: </label>
        <input id="pass" type="password" name="pass" placeholder="password"/>
        <label htmlFor="pass2">Current Password: </label>
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

const createCompendium = (csrf) => {
    ReactDOM.render(
       <Compendium csrf={csrf}/>,
       document.getElementById('content')
   );
};

const createProfile = (csrf) => {
    ReactDOM.render(
       <Profile csrf={csrf}/>,
       document.getElementById('content')
   );
};

const setup = (csrf) => {
    const welcomeButton = document.getElementById('welcomeButton');
    const horrorScopeButton = document.getElementById('horrorScopeButton');
    const compendiumButton = document.getElementById('compendiumButton');
    const profileButton = document.getElementById('profileButton');

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

    compendiumButton.addEventListener("click", (e) => {
        e.preventDefault();
        createCompendium(csrf);
        return false;
    });

    profileButton.addEventListener("click", (e) => {
        e.preventDefault();
        createProfile(csrf);
        return false;
    });

    createWelcome(csrf);
};

window.onload = randomHorrorPoem;