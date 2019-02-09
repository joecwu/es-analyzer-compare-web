const es_type_helper = {
    extractPlaylistItem: function(hitItem) {
        var songNamesArr = [];
        var songArtistNamesArr = [];
        if(typeof hitItem._source.songs != 'undefined') {
          hitItem._source.songs.forEach(function (song){
            console.log(song);
              songArtistNamesArr = songArtistNamesArr.concat(song.artist_name);
              songNamesArr.push(song.name);
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
        var songArtistNameCount = 0;
        Object.keys(songArtistNamesMap).forEach(function (key){
          songArtistNames = songArtistNames + key + '('+ songArtistNamesMap[key] + ')\n';
          songArtistNameCount += 1;
        });
        var songNames = '';
        var songNameCount = 0;
        songNamesArr.forEach(function (song){
          songNames = songNames + song + '\n';
          songNameCount += 1;
        });
  
        return {
          _id: hitItem._id,
          _type: hitItem._type,
          score: hitItem._score,
          title: hitItem._source.title,
          content: hitItem._source.content,
          popover1: {'title': "Song Artist Names", 'content': songArtistNames, 'count': songArtistNameCount},
          popover2: {'title': "Song Names", 'content': songNames, 'count': songNameCount},
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
      var artistNameCount = 0;
      if(typeof hitItem._source.artist.names != 'undefined') {
        artistNames = hitItem._source.artist.names.join('\n')
        artistNameCount = hitItem._source.artist.names.length;
      }
      var artistAltNames = '';
      var artistAltNameCount = 0;
      if(typeof hitItem._source.artist.alternative_names != 'undefined') {
        artistAltNames = hitItem._source.artist.alternative_names.join('\n')
        artistAltNameCount = hitItem._source.artist.alternative_names.length;
      }
        return {
          _id: hitItem._id,
          _type: hitItem._type,
          score: hitItem._score,
          title: hitItem._source.names.join(' / '),
          content: hitItem._source.alternative_names.join('\n'),
          popover1: {'title': "Artist Names", 'content': artistNames, 'count': artistNameCount},
          popover2: {'title': "Artist Alias", 'content': artistAltNames, 'count': artistAltNameCount},
          tooltip: 'Artist Names:\n' + artistNames + '\n\nArtist Alias:\n' + artistAltNames,
          popularity: hitItem._source.popularity.lastweek,
          createdAt: typeof hitItem._source.album.release_date === 'undefined' ? undefined : new Date(hitItem._source.album.release_date),
          updatedAt: typeof hitItem._source.album.updated_at === 'undefined' ? undefined : new Date(hitItem._source.album.updated_at),
        };
    },
    extractArtistItem: function(hitItem) {
        return {
          _id: hitItem._id,
          _type: hitItem._type,
          score: hitItem._score,
          title: hitItem._source.names.join(' / '),
          content: hitItem._source.alternative_names.join('\n'),
          popover1: undefined,
          popover2: undefined,
          popularity: hitItem._source.popularity.lastweek,
          createdAt: undefined,
          updatedAt: typeof hitItem._source.updated_at === 'undefined' ? undefined : new Date(hitItem._source.updated_at),
        };
    },
  };
  export default es_type_helper;
  