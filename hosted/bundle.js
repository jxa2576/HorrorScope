"use strict";

var Welcome = function Welcome(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Welcome"), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }));
};

var HorrorScope = function HorrorScope(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Horror Scope"), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }));
};

var Compendium = function Compendium(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Compendium"), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }));
};

var Profile = function Profile(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Profile"), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }));
};

var createWelcome = function createWelcome(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(Welcome, {
    csrf: csrf
  }), document.getElementById('content'));
};

var createHorrorScope = function createHorrorScope(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(HorrorScope, {
    csrf: csrf
  }), document.getElementById('content'));
};

var createCompendium = function createCompendium(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(Compendium, {
    csrf: csrf
  }), document.getElementById('content'));
};

var createProfile = function createProfile(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(Profile, {
    csrf: csrf
  }), document.getElementById('content'));
};

var setup = function setup(csrf) {
  var welcomeButton = document.getElementById('welcomeButton');
  var horrorScopeButton = document.getElementById('horrorScopeButton');
  var compendiumButton = document.getElementById('compendiumButton');
  var profileButton = document.getElementById('profileButton');
  welcomeButton.addEventListener("click", function (e) {
    e.preventDefault();
    createWelcome(csrf);
    return false;
  });
  horrorScopeButton.addEventListener("click", function (e) {
    e.preventDefault();
    createHorrorScope(csrf);
    return false;
  });
  compendiumButton.addEventListener("click", function (e) {
    e.preventDefault();
    createCompendium(csrf);
    return false;
  });
  profileButton.addEventListener("click", function (e) {
    e.preventDefault();
    createProfile(csrf);
    return false;
  });
  createWelcome(csrf);
};
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#animatedErrorMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#animatedErrorMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
