      // Client ID and API key from the Developer Console
document.querySelector('#keyform').addEventListener('submit', (event) => {
  event.preventDefault();
  var CLIENT_ID = document.getElementById('key-input').value;

  // Array of API discovery doc URLs for APIs used by the quickstart
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];

  // Authorization scopes required by the API. If using multiple scopes,
  // separated them with spaces.
  var SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

  var authorizeButton = document.getElementById('authorize-button');
  var authorizeLegend = document.getElementById('authorize-legend');
  var signoutButton = document.getElementById('signout-button');
  var submitKeyButton = document.getElementById('submitkey-button');
  var keyInput = document.getElementById('key-input');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }


  /**
    *  Initializes the API client library and sets up sign-in state
    *  listeners.
  */
  function initClient() {
    gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
      }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        });
      }

    /**
      *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          submitKeyButton.style.display = 'none';
          keyInput.style.display = 'none';
          authorizeLegend.style.display = 'none';
        } else {
          authorizeButton.style.display = 'block';
          authorizeLegend.style.display = 'block';
          signoutButton.style.display = 'none';
          submitKeyButton.style.display = 'block';
          keyInput.style.display = 'block';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      handleClientLoad();
});
      

      