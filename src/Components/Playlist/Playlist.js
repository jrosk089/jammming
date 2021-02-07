import React from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';
import { Status } from '../Status/Status';

export class Playlist extends React.Component {
    constructor(props){
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e){
        const name = e.target.value;
        this.props.onNameChange(name);
    }

    render(){
        return (
            <div className="Playlist">
            <input id="playlist-name" defaultValue={'New Playlist'} onChange={this.handleNameChange} />
            {this.props.requestSent ? 
            <Status reset={this.props.reset} 
                    playlistSaved={this.props.playlistSaved} />
            :
            (<div>
                <TrackList tracks={this.props.playlistTracks}
                        onRemove={this.props.onRemove}
                        isRemoval={true}/>
            <button className="Playlist-button" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>)
            }
            </div>
        )
    }
}