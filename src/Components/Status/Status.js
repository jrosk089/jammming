import React from 'react';
import './Status.css';

export class Status extends React.Component {
    render(){
        return (
            <div className="status">
                {this.props.playlistSaved ? 
                <p>Playlist created! Make another?</p>
                :
                <p>Something went wrong :( Try again?</p>}
                <button className="status-button" onClick={this.props.reset}>START OVER</button>
            </div>
        )
    }
}