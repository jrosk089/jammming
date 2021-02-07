# Jammming
## A Codecademy Project - Spotify Playlist-Creating SPA

### Introduction

This was a project set as part of the *Full-Stack Engineer* program from Codecademy. The brief was to make an SPA that is able to search for tracks and create and save Spotify playlists to users' accounts directly from the page. The project includes HTML, CSS and JS documents, but only the JS (mainly React-based) was edited; all other documents are used as provided by Codecademy.

### Using the SPA

You can find the live version of this project at https://jammming089.surge.sh. A Spotify account is required to use the service. After pressing 'Search', you will be redirected and logged in; after that, you will be able to search for tracks and add them to a playlist (which you can rename), and then save the playlist to your Spotify account. Very cool.

### Expanding on the Basic Version

The basic version in the Codecademy project simply allowed you to search for tracks, add them to a playlist and save the playlist. However, if no tracks were returned from a search or something went wrong while saving a playlist (a network error, connection timeout, etc.), there was no output from the site; furthermore, if the playlist *was* saved correctly, it would simply reset the Playlist part of the page and give no further information, meaning that, to make sure the playlist had saved, it was necessary to open the Spotify app and check.

Thus, features have been added that inform the user of the following:

- If no tracks are found in the search;
- If a playlist has been saved correctly (status 201 returned from Spotify);
- If something has gone wrong and the playlist has not been saved correctly.