let FRIENDS_ARRAY = [];
const USERS_AMOUNT = 50,
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
			console.log(responseBody);
			FRIENDS_ARRAY = flattenFriendProperties(responseBody.results);
			appendFriendsCards(FRIENDS_ARRAY);
			document.querySelector('.amount').innerHTML = `${FRIENDS_ARRAY.length} Totals`;
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
			image: friend.picture.large,
			registeredAge: friend.registered.age,
			registeredDate: friend.registered.date
		};
	});
}

function appendFriendsCards(friendsArray){
	const fragment = document.createDocumentFragment();
	friendsArray.forEach(friend => {
		const template = document.createElement('template');
		template.innerHTML = getFriendCardTemplate(friend);
		fragment.appendChild(template.content);
	});
	document.querySelector('.cards__container').appendChild(fragment);
}

function getFriendCardTemplate(friend){
	return `<div class="card__container shadow">
				<div class="card__row around">
					<a href='mailto:${friend.email}' class="email__button button"></a>
					<img src="${friend.image}" class="card__image">
					<a href='tel:${friend.phone}' class="phone__button button"></a>
				</div>
				<div class="card__row column">
					<h3 class="card__name">${friend.firstName} ${friend.lastName}</h3>
					<h5 class="card__username">@${friend.username}</h5>
				</div>
				<div class="card__row gender__container">
					<h6 class="card__gender">${getGenderIcon(friend.gender)}</h6>
					<h6 class="card__age">${friend.age}</h6>
				</div>

				<div class="card__row registered__container">
					<p class="registered__message">Friends since <br> ${getDate(friend.registeredDate)}</p>
					<div style="width:${friend.registredAge}%"></div>
				</div>
				<div class="card__row country__row">
					<h6 class="card__country">${friend.country}</h6>
				</div>
			</div>`;
}

function getDate(date){
	return (new Date(date)).toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric'} );
	
}

function getGenderIcon(gender){
	return gender === 'female' ?  '<span class="female">♀</span>' : '<span class="male">♂</span>';
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

document.querySelector('#filtersButton').addEventListener('click', (e)=>{
	document.querySelector('.filters__container').classList.toggle('height');
});