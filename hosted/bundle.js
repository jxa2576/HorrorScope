"use strict";

//Holds values for the welcome page, allows for data to be load on login
var name = document.getElementById('username').innerHTML;
var poem0 = document.getElementById('poem0').innerHTML;
var poem1 = document.getElementById('poem1').innerHTML;
var poem2 = document.getElementById('poem2').innerHTML; //Welcome element

var Welcome = function Welcome(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Welcome ", name), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }));
}; //The random poem provided to the user


var HorrorScope = function HorrorScope(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Horror Scope"), /*#__PURE__*/React.createElement("p", null, poem0), /*#__PURE__*/React.createElement("p", null, poem1), /*#__PURE__*/React.createElement("p", null, poem2), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }));
}; //Changes the users password


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
}; //Builds password change element, could add other user profile settings


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
  }, "Retype Current Password: "), /*#__PURE__*/React.createElement("input", {
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
}; //Connects the 'pages'


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

var createProfile = function createProfile(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(Profile, {
    csrf: csrf
  }), document.getElementById('content'));
}; //Sets up navigation


var setup = function setup(csrf) {
  var welcomeButton = document.getElementById('welcomeButton');
  var horrorScopeButton = document.getElementById('horrorScopeButton');
  var profileButton = document.getElementById('profileButton');

  if (welcomeButton || horrorScopeButton || profileButton) {
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
    profileButton.addEventListener("click", function (e) {
      e.preventDefault();
      createProfile(csrf);
      return false;
    });
    createWelcome(csrf);
  }
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
