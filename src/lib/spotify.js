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

        console.log(res);
    }

    const getAuthorisation = () => {
        return `Bearer ${store.state.auth.accessToken}`   
    }

    return {
        me
    }
}

export default plugin;