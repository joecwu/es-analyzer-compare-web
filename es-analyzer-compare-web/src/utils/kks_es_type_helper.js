const es_type_helper = {
    extractPlaylistItem: function(hitItem) {
        var songArtistNamesArr = [];
        if(typeof hitItem._source.songs != 'undefined') {
          hitItem._source.songs.forEach(function (song){
              songArtistNamesArr = songArtistNamesArr.concat(song.artist_name)
          });
        }
        var songArtistNamesMap = songArtistNamesArr.reduce(function (acc, curr) {
          if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
          } else {
            acc[curr] += 1;
          }
          return acc;
        }, {});
        var songArtistNames = '';
        Object.keys(songArtistNamesMap).forEach(function (key){
          songArtistNames = songArtistNames + key + '('+ songArtistNamesMap[key] + ')\n';
        });
  
        return {
          _id: hitItem._id,
          _type: hitItem._type,
          score: hitItem._score,
          title: hitItem._source.title,
          content: hitItem._source.content,
          tooltip: songArtistNames,
          popularity: 0,
          createdAt: typeof hitItem._source.created_at === 'undefined' ? undefined : new Date(hitItem._source.created_at),
          updatedAt: typeof hitItem._source.updated_at === 'undefined' ? undefined : new Date(hitItem._source.updated_at),
          // createdAt: typeof hitItem._source.created_at === 'undefined' ? undefined : new Date(hitItem._source.created_at),
          // updatedAt: typeof hitItem._source.updated_at === 'undefined' ? undefined : new Date(hitItem._source.updated_at),
          // startedAt: typeof hitItem._source.started_at === 'undefined' ? undefined : new Date(hitItem._source.started_at),
        };
    },
    extractSongItem: function(hitItem) {
      var artistNames = '';
      if(typeof hitItem._source.artist.names != 'undefined') {
        artistNames = hitItem._source.artist.names.join('\n')
      }
      var artistAltNames = '';
      if(typeof hitItem._source.alternative_names.names != 'undefined') {
        artistAltNames = hitItem._source.alternative_names.names.join('\n')
      }
        return {
          _id: hitItem._id,
          _type: hitItem._type,
          score: hitItem._score,
          title: hitItem._source.names.join(' / '),
          content: hitItem._source.alternative_names.join('\n'),
          tooltip: 'Artist Names:\n' + artistNames + '\n\nArtist Alias:\n' + artistAltNames,
          popularity: hitItem._source.popularity.lastweek,
          createdAt: typeof hitItem._source.album.release_date === 'undefined' ? undefined : new Date(hitItem._source.album.release_date),
          updatedAt: typeof hitItem._source.album.updated_at === 'undefined' ? undefined : new Date(hitItem._source.album.updated_at),
        };
    },
  };
  export default es_type_helper;
  