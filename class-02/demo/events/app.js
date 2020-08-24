'use strict';

// $(document).ready(function(){
//     console.log('hello from jQuery');
//     // $('button').click(function(){
//     $('button').on('click',function(){
//         console.log('heyy..you clicked me!!');
//         $('ul').toggleClass('on');
//     })

//     $('ul').on('click','li',function(){
//         console.log($(this).text());
//     })

// })

$.ajax('./people.json')
.then(data =>{
    // console.log(data);
    data.forEach((val,idx)=>{
        // console.log(val);
        let newPerson = new Person(val);
        allPerson.push(newPerson);
        console.log(newPerson);
        newPerson.render();
    })
    $('li').first().remove();
})

var allPerson=[];
function Person(data2) {
    this.name = data2.name;
}

Person.prototype.render = function () {
    // $('ul').append(`<li>${this.name}</li>`);

    let personClone = $('.person-template').clone();
    personClone.removeClass('person-template');
    console.log(personClone);
    personClone.find('span').text(this.name);
    $('ul').append(personClone);

}






