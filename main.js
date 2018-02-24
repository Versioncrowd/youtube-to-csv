
document.querySelector('#urlform').addEventListener('submit', ((event) => {
  var url = document.getElementById('videourl').value;
  event.preventDefault();
  console.log(url);
  
  // Function that returns a Youtube ID from a URL of a video
  function getYoutubeID(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
      if (match && match[2].length == 11) {
        console.log(match[2]);
        return match[2];
      } else {
        //error
        console.log('error with url')
      }
  }

  function appendResult(video) {
    // Clear results
    var p = document.getElementById('resultEl');
    var videoInfo = 'This video\'s ID is ' + video.id + '. ' +
                    'Its title is \'' + video.snippet.localized.title + ', ' +
                    'and it has ' + video.statistics.viewCount + ' views ' + 
                    'and ' + video.statistics.likeCount + ' likes';
    p.innerHTML = '';
    p.innerHTML = videoInfo;
  }

  function getVideo(youtubeID) {
    // the call to the Youtube API
    gapi.client.youtube.videos.list({
      'part': 'snippet, contentDetails, statistics',
      'id': youtubeID,
    }).then(function(data) {
      var result = data.result.items[0];
      appendResult(result);
    }); 
  } // End Get Video

  var youtubeID = getYoutubeID(url);
  getVideo(youtubeID);

})) // End Submit

