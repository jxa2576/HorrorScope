"use strict";

//Mock Data for horrorscope poem -TEMP will be moved to the DB
var data = {
  "horrors": [{
    "name": "Gremlin",
    "poem": ["dancing,", "they steal from you", "a chaotic jubilation"]
  }, {
    "name": "Spectre",
    "poem": ["screaming, ", "they posses you", "a soulful mourning"]
  }, {
    "name": "Thing",
    "poem": ["morphing, ", "they mimic you", "a mutated limb"]
  }]
};
var poem = ""; //Get random number taken
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

var getRandomInt = function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}; //Given the JSON data, generates a random poen for the user


var randomHorrorPoem = function randomHorrorPoem() {
  var randomHorrors = [];
  var rand = getRandomInt(3);
  var rand1 = getRandomInt(3);
  var rand2 = getRandomInt(3);

  while (rand === rand1 || rand1 === rand2 || rand2 === rand) {
    rand1 = getRandomInt(3);
    rand2 = getRandomInt(3);
  }

  ;
  randomHorrors.push(data.horrors[rand].poem[0]);
  randomHorrors.push(data.horrors[rand1].poem[1]);
  randomHorrors.push(data.horrors[rand2].poem[2]);
  poem = randomHorrors;
};

var name = document.getElementById('username').innerHTML;

var Welcome = function Welcome(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Welcome ", name), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }));
};

var HorrorScope = function HorrorScope(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Horror Scope"), /*#__PURE__*/React.createElement("p", null, poem[0]), /*#__PURE__*/React.createElement("p", null, poem[1]), /*#__PURE__*/React.createElement("p", null, poem[2]), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }));
};

var Compendium = function Compendium(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Compendium"), /*#__PURE__*/React.createElement("p", null, data.horrors[0].name), /*#__PURE__*/React.createElement("p", null, data.horrors[1].name), /*#__PURE__*/React.createElement("p", null, data.horrors[2].name), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }));
};

var handleChangePassword = function handleChangePassword(e) {
  e.preventDefault();
  $("#animatedErrorMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '' || $("#pass3").val() == '') {
    handleError("All fields required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match");
    return false;
  }

  if ($("#pass").val() === $("#pass3").val()) {
    handleError("Can't set the same password");
    return false;
  }

  sendAjax('POST', $("#changePasswordForm").attr("action"), $("#changePasswordForm").serialize(), redirect);
  return false;
};

var Profile = function Profile(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Profile"), /*#__PURE__*/React.createElement("form", {
    id: "changePasswordForm",
    name: "changePasswordForm",
    onSubmit: handleChangePassword,
    action: "/changePassword",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "hidden",
    name: "username",
    value: name,
    readOnly: true
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Current Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass2"
  }, "Current Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass2",
    type: "password",
    name: "pass2",
    placeholder: "retype password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass3"
  }, "New Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass3",
    type: "password",
    name: "pass3",
    placeholder: "new password"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Change Password"
  })), /*#__PURE__*/React.createElement("input", {
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

window.onload = randomHorrorPoem;
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
