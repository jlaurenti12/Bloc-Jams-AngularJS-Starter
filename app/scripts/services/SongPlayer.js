(function() {
    function SongPlayer($rootScope, Fixtures) {
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
             stopSong(song);
           }

           currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
           });

           currentBuzzObject.bind('timeupdate', function() {
             $rootScope.$apply(function() {
               SongPlayer.currentTime = currentBuzzObject.getTime();
             });
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
         * @function stopSong
         * @desc Pauses new audio file as currentBuzzObject and sets the playing property of the song to null
         * @param {Object} song
         */
         var stopSong = function(song) {
           currentBuzzObject.stop();
           SongPlayer.currentSong.playing = null;

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
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;

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
        */
        SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

          if (currentSongIndex < 0) {
            stopSong(song);
          } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
          }

        };

        /**
        * @function previous
        * @desc Access the song index of the current song and increas it by 1 to get the index of the next song and set the current song to the next one. If the index is greater than the number of songs, stop playing the current song and set the current song to the last song in the album.
        */
        SongPlayer.next = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

          if (currentSongIndex > currentAlbum.songs.length - 1) {
            stopSong(song);
          } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
          }

        };

        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
          if (currentBuzzObject) {
            currentBuzzObject.setTime(time);
          }
        };



         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
