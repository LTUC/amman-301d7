'use strict'
var allPictures = [];
var allKeywords = [];

const generatePictures = (page) => {
    allKeywords = [];
    allPictures = [];
    filteredKeywords = [];
    $("#sort").val('default');
    $('#container').empty();
    $('#filter').empty();
    $('#filter').append('<option value="default">Filter by Keyword</option>')
    $.ajax('./data/' + page + '.json')
        .then(data => {
            data.forEach(e => {
                new Picture(e.image_url, e.title, e.description, e.keyword, e.horns)
            });
            sortFunction('alpha');
            allPictures.forEach(e => {
                e.render();
            });
            populateKeyword();
            populateOptions();

        })

};

function Picture(url, title, desc, keyword, horns) {
    this.url = url;
    this.title = title;
    this.desc = desc;
    this.keyword = keyword;
    this.horns = horns;
    allPictures.push(this)
    allKeywords.push(this.keyword)
};

let mustacheTemplate = $('#mustache-template').html();

Picture.prototype.render = function () {
    let html = Mustache.render(mustacheTemplate, this);
    $('#container').append(html);
}

var filteredKeywords = [];

const populateKeyword = () => {
    allKeywords.forEach(e => {
        if (($.inArray(e, filteredKeywords)) == -1) {
            filteredKeywords.push(e);
        }
    });
};

const populateOptions = () => {
    filteredKeywords.forEach(e => {
        let optionClone = $('<option></option>');
        optionClone.text(e)
        $('#filter').append(optionClone);
    });
};

$(document).ready(function () {
    generatePictures('page-1');
    $('#filter').change(function () {
        $("#sort").val('default');
        let currentKeyword = $(this).val();
        console.log(currentKeyword);
        filterFunctoin(currentKeyword)

        // console.log(section)
        // if ($('section').attr('id') == 'rhino'){
        //     section.hide();}


    }
    );
    $('#sort').change(function () {
        let selectedFilter = $("#filter").val();
        let currentOption = $(this).val();
        sortFunction(currentOption)
        $('#container').empty();
        allPictures.forEach(e => {
            e.render();
        });
        filterFunctoin(selectedFilter)
    })
    // console.log($('section').find('keyword'));
});

const sortFunction = (type) => {
    if (type == 'alpha') {
        allPictures.sort((a, b) => (a.title > b.title) ? 1 : -1);

    }
    else if (type == 'horns') {
        allPictures.sort((a, b) => a.horns - b.horns);
    }

}


const filterFunctoin = (currentKeyword) => {
    let section = $('section');
    if (currentKeyword == 'default') {
        $('section').show();
    }
    else {

        section.hide();
        $('.' + currentKeyword).show()
    }
}

var container = document.getElementById('container');
var modal = document.getElementById('modal');

container.addEventListener('click', function () {
    let parent = $(event.target).parent();
    let image = parent.find('img').attr('src');
    let title = parent.find('h2').text();
    let desc = parent.find('p').text();

    // console.log(title);

    // var chosenModal = {
    //     keyword:'modal',
    //     url:image,
    //     title:title,
    //     desc:desc
    // };
    // let html = Mustache.render(mustacheTemplate, chosenModal);
    // modal.innerHTML = html;
    // image.toggleClass('big',true)

    modal.setAttribute('style', 'display:block;');
    modal.innerHTML =
        `<div id='modal-content'>
                <h2> ${title}</h2>
                <img src="${image}"></img>
                <p id="desc">${desc}</p>
                </div>`

})


modal.addEventListener('click', function () {
    if (event.target.nodeName !== 'IMG') {
        modal.setAttribute("style", "display:none;")
    }
    console.log(event.target.nodeName)

})