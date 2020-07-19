import rp from "request-promise";
import playlists from "./playlists"
import audioFeatures from "./audioFeatures"
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
        checkValidity,
        audioFeatures:audioFeatures(options),
        playlists:playlists(options)
    }
}


export default plugin;