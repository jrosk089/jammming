let accessToken;
const clientID = '91e533c2c20d4256bdace4065cce4716';
const redirectURI = 'http://localhost:3000/'; //Change this back to https://jammming089.surge.sh after messing around

const Spotify = {
    getAccessToken(){
        if (accessToken){
            return accessToken;
        };

        const accessInURL = window.location.href.match(/access_token=([^&]*)/);
        const expirationTime = window.location.href.match(/expires_in=([^&]*)/);

        if (accessInURL && expirationTime){
            accessToken = accessInURL[1];
            const expires = Number(expirationTime[1]);
            window.setTimeout(() => accessToken = '', expires * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
        window.location = 
        `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },

    async search(searchTerm) {
        const accessToken = Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,  {
            headers: {Authorization: `Bearer ${accessToken}`}
        });
        const jsonresponse = await response.json();
        console.log(jsonresponse);
        if (!jsonresponse.tracks){
            return [];
        };
        return jsonresponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        })
        );
    },

   savePlaylist(name, uriArray) {
        if (!name || !uriArray){
            return;
        };
        
        const accessToken = Spotify.getAccessToken();
        const headers = { headers: {Authorization: `Bearer ${accessToken}`} };
        let userID;

        return fetch(`https://api.spotify.com/v1/me`, headers)
                .then(response => response.json())
                .then(jsonResponse => {
                     userID = jsonResponse.id;
                     return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                        method: 'POST',
                        headers: {Authorization: `Bearer ${accessToken}`},
                        body: JSON.stringify( {name: name} )
                    })
                .then(response => response.json())
                .then(jsonResponse => {
                    const playlistID = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                        method: 'POST',
                        headers: { Authorization: `Bearer ${accessToken}` },
                        body: JSON.stringify( {uris: uriArray} ),
                    })
                })
                });
    } 
};

export default Spotify;