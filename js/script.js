const URL = 'https://randomuser.me/api/?results=100';

fetch(URL)
	.then(response => response.json())
	.then(responseBody => console.log(responseBody))
	.catch(error => console.log(error));
