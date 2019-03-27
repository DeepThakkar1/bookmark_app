//listen on form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// we will save bookmark
function saveBookmark(e){
	//we will get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	if(!validateForm(siteName, siteUrl)){
    return false;
  }
	var bookmark = {
		name: siteName,
		url: siteUrl
	}
	/*
	//local storage test
	localStorage.setItem('test','helloworld');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	//prevent form from submitting*/
	e.preventDefault();
	

	//test is array is null
	if(localStorage.getItem('bookmarks')=== null){
		//initialize array called bookmarks
		var bookmarks = [];
		bookmarks.push(bookmark);

		//set to local storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	}
	else
	{
		// get bookmarks from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add bookmark to array 
		bookmarks.push(bookmark);
		//re-set back to local storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));


	}
	fetchBookmarks();
}

//delete bookmarks
function deleteBookmarks(url){
	//get bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//loop through bookmarks
	for(var i=0;i<bookmarks.length;i++)
	{
		if(bookmarks[i].url==url){
			// remove it from array
			bookmarks.splice(i,1);
		}

	}
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	//re-fetch bookmarks
	fetchBookmarks();
	
}

// fetch bookmarks
function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//get output id
	var bookmarkResults = document.getElementById('bookmarkResults');

	//build output
	bookmarkResults.innerHTML= '';
	for(var i = 0;i<bookmarks.length;i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		console.log(url);

		bookmarkResults.innerHTML += '<div class="card bg-light text-dark card-body mt-3">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-success" target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmarks(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
	}
}

// Validate Form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}

function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
  }
  return url;
}