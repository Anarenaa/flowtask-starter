/* FlowTask — trial form validation */

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("trial-form");
  if (!form) return; // pages without the form (about.html)

  var rules = {
    name: "Enter your name.",
    email: "Enter your work email.",
    company: "Enter your company name.",
  };

  function setError(input, message) {
    var box = document.getElementById("err-" + input.name);
    box.textContent = message;
    box.hidden = !message;
    if (message) {
      input.setAttribute("aria-invalid", "true");
    } else {
      input.removeAttribute("aria-invalid");
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var firstInvalid = null;

    Object.keys(rules).forEach(function (name) {
      var input = form.elements[name];
      var value = input.value.trim();
      var message = "";

      if (!value) {
        message = rules[name];
      } else if (
        name === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        message = "Enter an email in the format name@company.com.";
      }

      setError(input, message);
      if (message && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    var status = document.getElementById("trial-status");
    form.hidden = true;
    status.hidden = false;
    status.focus();
  });
});