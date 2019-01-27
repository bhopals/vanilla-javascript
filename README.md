

## Vanilla JavaScript

Vanilla JS is the name to refer using plain/core JavaScript without any additional libraries like JQuery. 

The Demo site demonstrate how we can unplug library and framework code and replace that with Vanilla JS, which not only gives performace benefits but also a lot more cleaner code base.


### Learning App Building with Vanilla JavaScript

Library - Your code calls library
Framework - Framework calls your code


#### Replace Ajax

Fetch API which is built on the PROMISE API, mostly all modern browser support.

```

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

```

#### Select and Modify DOM Element

Instead of using CSS selector, we will use querySelector() / querySelectorAll().
Both are the methods of the document object. 

One praticular difference between JQUERY Selector and Vanilla Javascript Selectors in particulars is what's returned.
When you select a single element in JQUERY, you do not get an element reference back, instead you get a JQUERY Object with element reference packaged up with Jquery Methods and properties, and this allows you to chain JQUERY code to the element reference and use a single selector to perform a wide range of tasks.

However, when you use document.querySelector(), you get a reference back to the element itself, along with the only properties and methods that belong to that element such as attribute list and class list.

**Single Element Selection**
$('#ID/CLASS Selector').val() would be replaced with document.querySelector("#ID/Class Selector").value

**Multiple Element Selection**
$('.option div').removeClass('nameOFClass') - This selector remove passed class from all the selector, and the internal looping here is called **Implicit Iteration**

However, document.querySelectorAll('.option div') does not iterate implicitly but returns multiple elements in a(n) array-like object, hence we need to form a loop to perfrom required operaton on each selector.

```

document.querySelectorAll('.options div').forEach(function(el){
    el.classList.remove('selected');
})

```

#### Replace Event Listeners
    -   Select Element
    -   Sepcify Event
    -   Specify what should happen in response to the EVENT

**Jquery way**

```

$('.nav li').on('click', function(){
    //What shoud happen
})

```

**Vanilla JavaScript**

```

document.querySelector('li').addEventListener('click', function(e){
    //What should happen
}, false); //The third element is an optional element which specify whether the event uses event capturing 
(Which modern browser by default assume false if the event is not specified )

bubbling phase - starting with the target’s parent and ending with the Window. 
capturing phase - starting from the Window to the target’s parent.

false -> Register the event handler for the bubbling phase.
true -> Register the event handler for the capturing phase.

OR 

For event registration in vanilla javascript
document.querySelector('li').onclick = listHandler;

OR

You can register event by :
<li onclick="listHandler"></li> (although best practice is to separate javascript code from html code )

```


**Working with "THIS" object**
So instead of *$(this).hasClass('className')*, we can use *event.target.classList.contains('className')*.
*$(this).attr('id')* can be replaced with *event.target.id*;




#### Implementing Data Binding

 - DOM Manipulation  
    -   createElement() method
    -   setAttribute() method
    -   textContent property
    -   appendChild() method

```
<div>
    <p className="city">{props.city}</p>
    <p>{props.degCInt}&#176; C / {props.degFInt}&#176; F <img src={props.icon} alt={props.condition} /></p>
</div>


let container = document.createElement('div');
let cityPara = document.createElement('p');
cityPara.setAttribute('class','city');
cityPara.textContent = state.city;

let conditionsPara = document.createElement('p');
conditionsPara.textContent = state.degCInt+ '\u00B0 C / '+ state.degFInt+' F';
let iconImage = document.createElement('img');
iconImage.setAttribute('src',state.icon);
iconImage.setAttribute('alt',state.condition);


conditionsPara.appendChild(iconImage);
container.appendChild(cityPara);
container.appendChild(conditionsPara);

```



### Demo

[Demo Link](https://vanilla-javascript-app.herokuapp.com/)


