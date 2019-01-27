

## Vanilla JavaScript

Vanilla JS is the name to refer using plain/core JavaScript without any additional libraries like JQuery. 


### Learning App Building with Vanilla JavaScript

Library - Your code calls library
Framework - Framework calls your code


#### Replace Ajax

Fetch API instead of AJAX 
``
fetch(url + location + '&appid=' + apiKey).then(function(response){
    //This step in must as in case of PROMISE API, it is handled by library
    //however, here we are using vanilla javascript code hence we need to handle it on our own
    // response.json() convert the response body into returned JSON format.
			return (response.json());
		}).then(function(response) {
			updateUISuccess(response);
		}).catch(function() {
			updateUIFailure();
		});

``



### Demo

[Demo Link](https://vanilla-javascript-app.herokuapp.com/)


