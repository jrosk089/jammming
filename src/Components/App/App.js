import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify.js';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {  searchResults: [],

                    playlistName: 'My Playlist',

                    playlistTracks: [],

                    noTracksFound: false,

                    requestSent: false,

                    playlistSaved: false,
                  };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.resetPlaylist = this.resetPlaylist.bind(this);
  }


  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    this.setState({ playlistTracks: [...this.state.playlistTracks, track]});
  }

  removeTrack(track) {
    let currentTracks = this.state.playlistTracks;
    let newList = currentTracks.filter(choice => choice !== track);
    this.setState( { playlistTracks: newList });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

   savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then((response) => {
      if (response.status === 201){
        this.setState({ requestSent: true,
                        playlistSaved: true })
      } else {
        this.setState({ requestSent: true,
                        playlistSaved: false })
      }
    })
    .catch(error => console.log(error));
  }

  resetPlaylist() {
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: [],
      requestSent: false
    });
    document.getElementById('playlist-name').value='New Playlist';
  }

  search(searchTerm) {
  Spotify.search(searchTerm)
    .then(results => {
    this.setState({ searchResults: results })
    })
    .then(() => {
      (this.state.searchResults.length < 1) ? this.setState({ noTracksFound: true }) : this.setState({ noTracksFound: false })
    });
  }

  render(){
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults  searchResults={this.state.searchResults} 
                            onAdd={this.addTrack}
                            noTracksFound={this.state.noTracksFound}
                            />
            <Playlist playlistName={this.state.playlistName} 
                      playlistTracks={this.state.playlistTracks} 
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist}
                      requestSent={this.state.requestSent}
                      playlistSaved={this.state.playlistSaved}
                      reset={this.resetPlaylist}
                      />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
