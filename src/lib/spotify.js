import rp from "request-promise";
const plugin = (options) => {
    const store = options.store;

    // clean this shit up
    const me = async () => {
        const res = await rp({
            uri:"https://api.spotify.com/v1/me",
            headers:{
                Authorization:getAuthorisation()
            }
        });
        store.commit("updateDisplayName",res.display_name);
        return JSON.parse(res);
    }

    const getAuthorisation = () => {
        return `Bearer ${store.state.auth.accessToken}`   
    }

    // playlists
    const playlists = {
        list: async () => {
            //TODO add pagination
            const res = await rp({
                uri:"https://api.spotify.com/v1/me/playlists",
                headers:{
                    Authorization:getAuthorisation()
                },
                json:true
            });

            store.commit("setPlaylists",res.items);
            return res.items;
        }
    }

    const checkValidity = async () => {
        try{
            await me();
            return true;
        }
        catch{
            return false;
        }
    }

    return {
        me,
        playlists,
        checkValidity
    }
}

export default plugin;