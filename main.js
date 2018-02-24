
document.querySelector('#urlform').addEventListener('submit', ((event) => {
  var url = document.getElementById('videourl').value;
  event.preventDefault();
  
  // Function that returns a Youtube ID from a URL of a video
  function getYoutubeID(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
      if (match && match[2].length == 11) {
        return match[2];
      } else {
        //error
        console.log('error with url')
      }
  }

  function appendResult(video) {
    // Clear results
    var p = document.getElementById('resultEl');
    /* var videoInfo = 'This video\'s ID is ' + video.id + '. ' +
                    'Its title is \'' + video.snippet.localized.title + ', ' +
                    'and it has ' + video.statistics.viewCount + ' views ' + 
                    'and ' + video.statistics.likeCount + ' likes'; */
    var videoInfo = JSON.stringify(video);
    p.innerHTML = '';
    p.innerHTML = videoInfo;
  }

  function ConvertToCSV(video) {
    let strKeys = 'title, id, publishedAt, channelId, ';
    let strValues = video.snippet.title + ', ' + video.id + ', ' + video.snippet.publishedAt + ', ' + video.snippet.channelId + ', ';

    function loopObj(obj) {
      Object.entries(obj).forEach(([key, val]) => {
          strKeys += key + ', ';
          strValues += val + ', ';
        })
      }; 
      
    loopObj(video.statistics);
    loopObj(video.contentDetails)
    var strAll = strKeys + '\r\n' + strValues;
    console.log(strAll)

    var csvFile = strAll;

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    var filename = video.snippet.title;
    var link = document.createElement("a");
    var url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  function getVideo(youtubeID) {
    // the call to the Youtube API
    gapi.client.youtube.videos.list({
      'part': 'snippet, contentDetails, statistics',
      'id': youtubeID,
    }).then(function(data) {
      var result = data.result.items[0];
      ConvertToCSV(result);
    }); 
  } // End Get Video

  var youtubeID = getYoutubeID(url);
  getVideo(youtubeID);

})) // End URL Submit




