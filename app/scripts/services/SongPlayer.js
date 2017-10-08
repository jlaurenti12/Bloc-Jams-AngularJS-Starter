(function() {
    function SongPlayer(Fixtures) {
         var SongPlayer = {};

         /**
         * @desc Access the album data by referencing Fixtures file
         * @type {Object}
         */
         var currentAlbum = Fixtures.getAlbum();

         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
           if (currentBuzzObject) {
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
           }

           currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
           });

           SongPlayer.currentSong = song;

         };

         /**
         * @function playSong
         * @desc Plays new audio file as currentBuzzObject and sets the playing property of the song to true
         * @param {Object} song
         */
         var playSong = function(song) {
           currentBuzzObject.play();
           song.playing = true;

         };

         /**
         * @function getSongIndex
         * @desc The index of the selected song from the songs array in the current album
         * @param {Object} song
         */
         var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
         };

         /**
         * @desc Active song object from list of songs
         * @type {Variable}
         */
         SongPlayer.currentSong = null;


         /**
         * @function play
         * @desc Play current or new song
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
           song = song || SongPlayer.currentSong;
           if (SongPlayer.currentSong !== song) {
             setSong(song);
             playSong(song);


           } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                playSong(song);
                }
           }

         };


       /**
       * @function pause
       * @desc Pause current song
       * @param {Object} song
       */
        SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
          currentBuzzObject.pause();
          song.playing = false;

        };

        /**
        * @function previous
        * @desc Access the song index of the current song and decrease it by 1 to get the index of the previous song and set the current song to the previous one. If the index is less than 0, stop playing the current song and set the current song to the first song in the album.
        * @param {Object} song
        */
        SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

          if (currentSongIndex < 0) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
          } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
          }

        };


         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
