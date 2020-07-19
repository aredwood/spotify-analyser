import rp from "request-promise";
const playlists = (options) => {

    const store = options.store;
    return {
        list: async () => {
    
            const getItems = async (exisitngPlaylists) => {
                const res = await rp({
                    uri: `https://api.spotify.com/v1/me/playlists?offset=${exisitngPlaylists.length}`,
                    headers: {
                        Authorization: `Bearer ${store.state.auth.accessToken}`
                    },
                    json: true
                });
    
                const items = res.items;
    
                if (items.length < 20) {
                    return exisitngPlaylists.concat(items);
                }
                else {
                    return await getItems(exisitngPlaylists.concat(items));
                }
            }
    
            const allItems = await getItems([]);
            store.commit("setPlaylists", allItems);
            return allItems
        },
        getTracks: async (playlistId) => {
    
            const getTracks = async (existingTracks) => {
                const res = await rp({
                    uri: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${existingTracks.length}`,
                    headers: {
                        Authorization: `Bearer ${store.state.auth.accessToken}`
                    },
                    json: true
                });
    
                const tracks = res.items;
    
                if (tracks.length < 20) {
                    return existingTracks.concat(tracks)
                }
                else {
                    return await getTracks(existingTracks.concat(tracks))
                }
            }
    
    
            const allTracks = await getTracks([]);
    
            return allTracks;
        },
        getMostPopularArtist(playlist){
            var artists = {};

            playlist.forEach(trackInPlaylist => {
              const { track } = trackInPlaylist;
      
              const artistsInTrack = track.artists;
      
              artistsInTrack.forEach(artist => {
                const artistId = artist.id;
      
                if (typeof artists[artistId] === "undefined") {
                  artists[artistId] = 1;
                } else {
                  artists[artistId] = artists[artistId] + 1;
                }
              });
            });
      
            // sort
            const sortedArtists = Object.keys(artists).sort((a, b) => {
              return artists[b] - artists[a];
            });
      
            return sortedArtists[0];
        },
        getTotalDurationsSeconds(playlist){
            let duration = 0;

            if (playlist.length === 0) {
              return 0;
            }
            for (let i = 0; i < playlist.length; i++) {
              const { track } = playlist[i];
              duration += track.duration_ms;
            }
            return Math.floor(duration / 1000);
        }
        
    }

}

export default playlists;