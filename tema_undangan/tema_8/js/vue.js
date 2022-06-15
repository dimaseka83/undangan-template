new Vue({
    el: '#app',
    vuetify: new Vuetify(),

    computed: {
        displayDesktop() {
            return this.$vuetify.breakpoint.width >= 500
        },
    }
});