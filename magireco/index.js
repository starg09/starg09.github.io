Survey.StylesManager.applyTheme("bootstrap");

var surveyJSON = { surveyId: 'cbc3a260-bcc4-4798-840a-79f23b6a4b5b'}

function sendDataToServer(survey) {

    var form_username = survey.data.username.replace(/^\s+|\s+$/g, "");
    var farmed_node = survey.data.farmed_stage;
    var farmed_times = survey.data.times_farmed;
    var farmed_drops = survey.data.drops.replace(/^\s+|\s+$/g, "");

    console.log("Username: " + form_username);
    console.log("Farmed Node: " + farmed_node);
    console.log("Farmed Times: " + farmed_times);
    console.log("Dropped Items: " + farmed_drops);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwFvU7Zu90dW_-sjFaQELAgFkXLP7iMy8Vj4OrVTZC84AmFFgA/exec';
    
    const form = document.createElement('form');
    const form_params = {
      'reportUser': form_username,
      'nodeFarmed': farmed_node,
      'timesFarmed': farmed_times,
      'droppedItems': farmed_drops
    };
    for (const key in form_params) {
      if (form_params.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = form_params[key];

        form.appendChild(hiddenField);
      }
    }
    
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
}

function addNameAttribute(sender, options) {
    if (!(options.question.name == "username")) return;
    var input = options.htmlElement.querySelector('input');
    input.setAttribute('name', 'username');
    input.setAttribute('autocomplete', 'username');
    input.insertAdjacentHTML("beforebegin", "<label for=\"" + input.id + "\"> </input>");
}

var survey = new Survey.Model(surveyJSON);
$("#surveyContainer").Survey({
    model: survey,
    onComplete: sendDataToServer,
    onAfterRenderQuestion: addNameAttribute
});
