const LOTTIE_FILE='https://assets2.lottiefiles.com/packages/lf20_pepbow9b.json'
const LOTTIE=`<lottie-player src="${LOTTIE_FILE}" background="transparent"  speed="1"  style="width: 300px; height: 300px;" autoplay></lottie-player>`;
(function() {
  // get all data in form and return object
  function getFormData(form) {
    var elements = form.elements;
    var honeypot;

    var fields = Object.keys(elements).filter(function(k) {
      if (elements[k].name === "honeypot") {
        honeypot = elements[k].value;
        return false;
      }
      return true;
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];
      
      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail
      = form.dataset.email || ""; // no email by default

    return {data: formData, honeypot: honeypot};
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    var form = event.target;
    var formData = getFormData(form);
    var data = formData.data;

    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) {
      return false;
    }

    disableAllButtons(form);
    var url = form.action;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Animation
    var container = document.querySelector('.rsvp-form-container');
    var oldContent = container.innerHTML;
    container.innerHTML = LOTTIE;
    const timeout = setTimeout(() => {
      container.innerHTML = oldContent;
    }, 10000);
    var start = new Date();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          clearTimeout(timeout);
          // let the animation play at least 3 seconds.
          var duration = new Date() - start.getTime();
          if (duration >= 3000) {
            console.log('more time than 3 seconds went by, hiding animation');
            container.innerHTML = oldContent;
            postFormSubmit();
          } else {
            console.log(`still waiting ${3000 - duration} for animation`);
            setTimeout(() => {
              container.innerHTML = oldContent;
              postFormSubmit();
            }, 3000 - duration);
          }

        }
    };
    // url encode form data for sending as post data
    var encoded = Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');
    xhr.send(encoded);

  }
  
  function postFormSubmit() { 
    var submitButton = document.querySelector("#rsvp-form");
    if (submitButton) {
      submitButton.style.display = "none";
    }
    var thankYouMessage = document.querySelector("#thank-you");
    if (thankYouMessage) {
      thankYouMessage.style.display = "block";
    }
  }

  function loaded() {
    // bind to the submit event of our form
    var forms = document.querySelectorAll(".rsvp-form");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
})();
