

## Vanilla JavaScript

Vanilla JS is the name to refer using plain/core JavaScript without any additional libraries like JQuery. 


### Learning App Building with Vanilla JavaScript

Library - Your code calls library
Framework - Framework calls your code


#### Replace Ajax

Fetch API which is built on the PROMISE API, mostly all modern browser support.

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
``
document.querySelectorAll('.options div').forEach(function(el){
    el.classList.remove('selected');
})
``



### Demo

[Demo Link](https://vanilla-javascript-app.herokuapp.com/)


