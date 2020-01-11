import rp from "request-promise";
const plugin = (options) => {
    const store = options.store;

    // clean this shit up
    const me = async () => {
        const res = await rp({
            uri: "https://api.spotify.com/v1/me",
            headers: {
                Authorization: getAuthorisation()
            }
        });
        store.commit("updateDisplayName", res.display_name);
        return JSON.parse(res);
    }

    const getAuthorisation = () => {
        return `Bearer ${store.state.auth.accessToken}`
    }

    // playlists
    const playlists = {
        list: async () => {

            const getItems = async (exisitngPlaylists) => {
                const res = await rp({
                    uri: `https://api.spotify.com/v1/me/playlists?offset=${exisitngPlaylists.length}`,
                    headers: {
                        Authorization: getAuthorisation()
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
                        Authorization: getAuthorisation()
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
        }
    }

    const artist = {
        get: async (artistId) => {
            const res = await rp({
                uri: "https://api.spotify.com/v1/artists/" + artistId,
                headers: {
                    Authorization: getAuthorisation()
                }
            });
            return JSON.parse(res);
        }
    }

    const checkValidity = async () => {
        try {
            await me();
            return true;
        }
        catch{
            return false;
        }
    }

    return {
        me,
        artist,
        playlists,
        checkValidity
    }
}

export default plugin;