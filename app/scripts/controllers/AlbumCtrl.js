(function() {
    function AlbumCtrl(Fixtures) {
      this.albumData = Fixtures.getAlbum();
      this.albumSongs = [];
      for (var i=0; i < albumPicasso.songs.length; i++) {
        this.albumSongs.push(albumPicasso.songs[i]);
}
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl',['Fixtures', AlbumCtrl]);
})();
