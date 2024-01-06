/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');

class NotesService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistSongs(playlistId) {
    const querySongs = {
      text: 'SELECT songs.id, songs.title, songs.performer FROM songs JOIN playlists_songs ON songs.id = playlists_songs.songid WHERE playlists_songs.playlistid = $1',
      values: [playlistId],
    };
    const queryPlaylist = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId],
    };

    const resultSongs = await this._pool.query(querySongs);
    const resultPlaylist = await this._pool.query(queryPlaylist);
    return {
      playlist:
      {
        ...resultPlaylist.rows[0],
        songs: resultSongs.rows,
      },
    };
  }
}

module.exports = NotesService;
