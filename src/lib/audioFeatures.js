import rp from "request-promise";
const audioFeatures = (options) => {
    const store = options.store;
    return {
        get: async (tracks) => {
            const res = await rp({
                uri: "https://api.spotify.com/v1/audio-features?ids=" + tracks.join(","),
                headers: {
                    Authorization: `Bearer ${store.state.auth.accessToken}`
                }
            });
            return JSON.parse(res);
        }
    }
}

export default audioFeatures;