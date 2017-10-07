(function() {
    function AlbumCtrl() {
      this.albumData = [];
      this.albumData.push(angular.copy(albumPicasso));
      this.albumSongs = [];
      for (var i=0; i < albumPicasso.songs.length; i++) {
        this.albumSongs.push(albumPicasso.songs[i]);
}
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();
