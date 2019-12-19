
var surveyJSON = { surveyId: 'cbc3a260-bcc4-4798-840a-79f23b6a4b5b'}

function sendDataToServer(survey) {
    survey.sendResult('8275e515-8f69-4dda-8199-d96a6470cf67');
}

var survey = new Survey.Model(surveyJSON);
$("#surveyContainer").Survey({
    model: survey,
    onComplete: sendDataToServer
});
