import json
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(_name_)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/codingthunder'
db = SQLAlchemy(app) 

class Playlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    song_name = db.Column(db.String(255), nullable=False)
    duration = db.Column(db.String(10), nullable=False)
    song_id = db.Column(db.Integer, nullable=False)

@app.route('/playlist', methods=['GET'])
def playlist():
    playlist = json.loads(localStorage.getItem('playlist'))
    for song in playlist:
        playlist_item = Playlist(song_name=song['name'], duration=song['duration'], song_id=song['id'])
        db.session.add(playlist_item)
        db.session.commit()

    playlist_items = Playlist.query.all()
    return render_template('playlist.html', playlist_items=playlist_items)