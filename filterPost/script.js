/*function onSingleImageHoverIn() {
  // getPosts()
  console.log('IN')
}

function onSingleImageHoverOut() {
  // when out
  console.log('OUT')
}*/

/*$(document).ready(function() {
  getPosts()
})*/
var organs = []
var diseases = []
var medi_posts = []
var selectedOrgan = '-'
var selectedDisease = '-'

var ajaxCount = (ajaxCount == null ? 0 : ajaxCount);  // Make limit globally accessible.
var ajaxKue = (ajaxKue == null ? [] : ajaxKue);  // Make queue globally accessible.


$(document).ready(function(){
  preloadData()

})
const organs_url = 'https://demo.theviable.co/praram9/wp-json/wp/v2/organ'
const posts_url = 'https://demo.theviable.co/praram9/wp-json/wp/v2/posts?_embed=1'
const diseases_url = ' https://demo.theviable.co/praram9/wp-json/wp/v2/diseases?_embed=1'

function preloadData() {
  getMedicalPosts()
  getOrgans()
  getDiseases()
}

var api_load_count = 0

// Call Medical Center Posts on slider
function getMedicalPosts() {
  $.ajax(posts_url)
    .done(function(data) {
      medi_posts = data
      renderMedi()
    })
  api_load_count++
}

// Get organ on mouseHover
function getOrgans() {
  $.ajax(organs_url)
    .done(function(data) {
      organs = data
      renderOrgans()
    })
  api_load_count++
}

// Get diseases after selected organs
function getDiseases() {
  $.ajax(diseases_url)
    .done(function(data) {
      diseases = data
    })
  api_load_count++
}

function isDone() {
  if (api_load_count >= 3) {
    $('#title').text('')
  }
}


// Render functions
function renderDiseases(organ_id) {
  let diseases_html = ''

  diseases.forEach(function (post) {
    // if (post._embedded !== undefined && post._embedded['wp:featuredmedia'] !== undefined && post._embedded['wp:featuredmedia'].length > 0) {
    //   $('.content').append('<img src="' + post._embedded['wp:featuredmedia'][0].source_url + '" />')
    // }
    // $('.content').append('<div class = "disease">' +  post.title.rendered + '</div>')
    if ('' + post.organ[0] === '' + organ_id) {
      diseases_html += '<div class = "disease">' + post.title.rendered + '</div>'
    }
  })
  $('.content').html(diseases_html)
}

let organs_html = ''
function renderOrgans() {
  organs.forEach(function (post) {
    if (post._embedded !== undefined && post._embedded['wp:featuredmedia'] !== undefined && post._embedded['wp:featuredmedia'].length > 0) {
      organs_html += '<img src="' + post._embedded['wp:featuredmedia'][0].source_url + '" />'
    }
    organs_html += '<button class="organ-btn" value="' + post.id + '">' + post.name + '</button>'
  })
  $('.organs').html(organs_html)

  installOnClick('organ-btn', (e) => {
    //id e.target.value
    renderDiseases(e.target.value)
  })
  isDone()
}

function installOnClick(className, callback) {
  $('.' + className).on('click', callback)
}

// let medi_html = ''

// function renderMedi() {
//   medi_posts.forEach(function (post) {
//     if (post._embedded !== undefined && post._embedded['wp:featuredmedia'] !== undefined && post._embedded['wp:featuredmedia'].length > 0) {
//       medi_html += '<img src="' + post._embedded['wp:featuredmedia'][0].source_url + '" />'
//     }
//     medi_html += '<div id = "title"><a href="' + post.link + '">' + post.title.rendered + '</a></div>'
//   })
//   $('.medi').html(medi_html)
//   isDone()
// }
