const Hello = (props) => {
    return(
    <div>
        <h3>Hello </h3>
        <input type="hidden" name="_csrf" value={props.csrf} />
    </div>
    );
};

const setup = function(csrf){
    ReactDOM.render(
        <Hello csrf={csrf}/>,
        document.getElementById('hello')
    );
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});