'use strict'

const allPictures = [];
const allKeywords = [];

$.ajax('./data/page-1.json')
    .then(data => {
        data.forEach(e => {
            let newPicture = new Picture(e.image_url, e.title, e.description, e.keyword, e.horns)
            newPicture.render();
        });
        $('section').first().remove();
        populateKeyword();
        populateOptions();

    })

function Picture(url, title, desc, keyword, horns) {
    this.url = url;
    this.title = title;
    this.desc = desc;
    this.keyword = keyword;
    this.horns = horns;
    allPictures.push(this)
    allKeywords.push(this.keyword)
}

Picture.prototype.render = function () {
    let pictureClone = $("#photo-template").clone();
    pictureClone.removeAttr('id');
    $('#photo-template').attr('class',this.keyword);
    pictureClone.find('h2').text(this.title)
    pictureClone.find('img').attr('src', this.url)
    pictureClone.find('p').text(this.desc)
    $('#container').append(pictureClone);
}

const filteredKeywords = [];

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
        $('select').append(optionClone);
    });
};

$(document).ready(function () {
    $('select').change(function () {
        var currentOption = $(this).val();
        let section = $('section');
        section.hide();
        let wantedSection = $('#'+currentOption)
        $('.'+currentOption).show()

        // console.log(section)
        // if ($('section').attr('id') == 'rhino'){
        //     section.hide();}

        
    }
    );
    // console.log($('section').find('keyword'));
});