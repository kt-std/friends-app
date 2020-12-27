const USERS_AMOUNT = 5000,
	API_URL = `https://randomuser.me/api/?results=${USERS_AMOUNT}`;

fetch(API_URL)
	.then((response) => {
		if (checkResponseStatus(response.status)) {
			return response.json();
		} else {
			console.log(response);
			appendErrorMessage(getResponseErrorMessage(response.status, response.statusText));
			return response.json();
		}
	})
	.then((responseBody) => console.log(responseBody))
	.catch((error) => console.log(typeof error));

function checkResponseStatus(status) {
	if (status >= 200 && status < 300) {
		return true;
	} else {
		return false;
	}
}

function getResponseErrorMessage(status, statusText) {
	return `<h1 class='error_heading'>Sorry, an error occured!</h1>
			<h2 class='erro-code__heading'>${status}: ${statusText}</h2>`;
}

function appendErrorMessage(errorText){
	const div = document.createElement('div');
	div.innerHTML = errorText;
	div.classList.add('error__block');
	document.body.append(div);
}