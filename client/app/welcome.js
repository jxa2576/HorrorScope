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
        <input type="hidden" name="_csrf" value={props.csrf} />
    </div>
    );
};

const Compendium = (props) => {
    return(
    <div>
        <h3>Compendium</h3>
        <input type="hidden" name="_csrf" value={props.csrf} />
    </div>
    );
};

const Profile = (props) => {
    return(
    <div>
        <h3>Profile</h3>
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