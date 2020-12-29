let FRIENDS_ARRAY = [];
const USERS_AMOUNT = 100,
	API_URL = `https://randomuser.me/api/?results=${USERS_AMOUNT}`;

fetch(API_URL)
	.then((response) => {
		if (checkResponseStatus(response.status)) {
			return response.json();
		} else {
			appendErrorMessage(
				getResponseErrorMessage(response.status, response.statusText)
			);
		}
	})
	.then((responseBody) => {
		if (responseBody !== undefined) {
			FRIENDS_ARRAY = flattenFriendProperties(responseBody.results);
			console.log(FRIENDS_ARRAY);
		}
	})
	.catch((error) =>
		appendErrorMessage(`Please, check your network connection! ${error}`)
	);

function checkResponseStatus(status) {
	if (status >= 200 && status < 300) {
		return true;
	} else {
		return false;
	}
}

function flattenFriendProperties(friendsArray) {
	return friendsArray.map((friend) => {
		return {
			firstName: friend.name.first,
			lastName: friend.name.last,
			email: friend.email,
			gender: friend.gender,
			country: friend.location.country,
			username: friend.login.username,
			phone: friend.phone,
			age: friend.dob.age,
			image: friend.picture.thumbnail,
		};
	});
}

function getResponseErrorMessage(status, statusText) {
	return `<h1 class='error__message'>Sorry, an error occured!</h1>
			<h2 class='error__code'>${status}: ${statusText}</h2>`;
}

function appendErrorMessage(errorText) {
	const div = document.createElement("div"),
		img = document.createElement("img");
	div.innerHTML = errorText;
	div.classList.add("error__container");
	img.classList.add("error__image");
	div.appendChild(img);
	document.body.append(div);
}
