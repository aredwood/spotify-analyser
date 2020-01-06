<template>
    <div>
        {{this.$route.params}}
        {{this.playlistSummary}}
        test
    </div>
</template>
<script>
export default {
    name:"analysePlaylist",
    computed:{
        playlistId(){
            return this.$route.params.playlistId;
        },
        playlistSummary(){
            const matchingPlaylist = this.$store.state.playlists.list.filter(playlist => {
                return playlist.id === this.playlistId;
            });
            return matchingPlaylist[0];
        }
    }
}
</script>
<style scoped>

</style>