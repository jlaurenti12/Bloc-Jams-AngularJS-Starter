(function() {
    function AlbumCtrl(Fixtures) {
      this.albumData = Fixtures.getAlbum();
      this.albumSongs = [];
      for (var i=0; i < this.albumData.songs.length; i++) {
        this.albumSongs.push(this.albumData.songs[i]);
}
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl',['Fixtures', AlbumCtrl]);
})();
