"use strict";

(function() {
	const url = "http://api.openweathermap.org/data/2.5/weather?q=";
	const apiKey = "ed77c9da65098468569cdc788d5e39d1"; 
	const activities = {
		teamIn: ['basketball','hockey','volleyball'],
		teamOutWarm: ['softball/baseball','football/soccer','American football','rowing','tennis','volleyball','ultimate frisbee','rugby'],
		teamOutCold: ['hockey'],
		soloIn: ['rock climbing','swimming','ice skating'],
		soloOutWarm: ['rowing','running','hiking','cycling','rock climbing'],
		soloOutCold: ['snowshoeing','downhill skiing','cross-country skiing','ice skating']
	}

	let state = {};
	let category = 'all';

	// get weather data when user clicks Forecast button, then add temp & conditions to view
	document.querySelector('.forecast-button').addEventListener('click', function(e){
		e.preventDefault();
		const location = document.querySelector('#location').value;
		document.querySelector("#location").value = '';

		 fetch(url + location + '&appid=' + apiKey).then(function(response){
		 	return (response.json());
		 }).then(function(response) {
		 	updateUISuccess(response);
		 }).catch(function(error) {
			 console.log(error)
		 	updateUIFailure();
		 });
	}, false)
	

	document.querySelectorAll('.option div').forEach(function(element){
		element.addEventListener('click', updateActivityList, false);
	});

	// handle ajax success
	function updateUISuccess(response) {
		const degC = response.main.temp - 273.15;
		const degCInt = Math.floor(degC);
		const degF = degC * 1.8 + 32;
		const degFInt = Math.floor(degF);
		state = {
			condition: response.weather[0].main,
			icon: "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png",
			degCInt: Math.floor(degCInt),
			degFInt: Math.floor(degFInt),
			city: response.name
		};

		const into = document.querySelector('.conditions');

		let container = document.createElement('div');
		let cityPara = document.createElement('p');
		cityPara.setAttribute('class','city');
		cityPara.textContent = state.city;

		
		let conditionsPara = document.createElement('p');
		conditionsPara.textContent = `${state.degCInt} \u00B0 C /  ${state.degFInt} F`;
		let iconImage = document.createElement('img');
		iconImage.setAttribute('src',state.icon);
		iconImage.setAttribute('alt',state.condition);
		
		conditionsPara.appendChild(iconImage);
		container.appendChild(cityPara);
		container.appendChild(conditionsPara);

		if(document.querySelector('.conditions dic')){
			into.replaceChild(container, document.querySelector('.conditions div'));
		} else {
			into.appendChild(container);
		}

		updateActivityList();
	}

	// handle selection of a new category (team/solo/all) 
	function updateActivityList(event) {
		if (event !== undefined && event.target.classList.contains('selected')) {
			// if the 'event' parameter is defined, then a tab has been clicked; if not, then this is the
			//   default case and the view simply needs to be updated
			// if the clicked tab has the class 'selected', then no need to change location of 'selected' class
			//   or change the DOM
			return true;
		} else if (event !== undefined && ! event.target.classList.contains('selected')) {
			// if the 'event' parameter is defined, then a tab has been clicked
			// if the clicked tab does not have the class 'selected', then location of 'selected' class must be added
			//   to the clicked element and removed from its siblings
			category = event.target.id;
			
			document.querySelectorAll('.options div').forEach(function(el){
				el.classList.remove('selected');
			})

			event.target.classList.add('selected')
		} 

		state.activities = [];
		if (state.condition === "Rain") {
			updateState('In');
		} else if (state.condition === "Snow" || state.degFInt < 50) {
			updateState('OutCold');
		} else {
			updateState('OutWarm');
		}

		function updateState(type) {
			if (category === "solo") {
				state.activities.push(...activities['solo' + type]);
			} else if (category === "team") {
				state.activities.push(...activities['team' + type]);
			} else {
				state.activities.push(...activities['solo' + type]);
				state.activities.push(...activities['team' + type]);
			}
		}

		const into = document.querySelector('.activities');

		let container = document.createElement('div');
		let list = document.createElement('ul');
		state.activities.forEach(function(activity, index){
			let listItem = document.createElement('li');
			listItem.setAttribute('key', index);
			listItem.textContent = activity;
			list.appendChild(listItem);
		})

		container.appendChild(list);

		if(document.querySelector('.into div')){ 
			into.replaceChild(container, document.querySelector('.into div'));
		} else {
			into.appendChild(container);
		}
		
		document.querySelector('.results').classList.add('open');
	}

	// handle ajax failure
	function updateUIFailure() {
		document.querySelector('.conditions').textContent = 'Weather information unavailable';
	}
})();