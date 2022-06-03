new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
      arrow: false,
      openInvitation: false,
    },
    methods: {
      scrollPlay() {
        var audio = this.$refs.audioElm;
        audio.play();
        this.openInvitation = true;
      },
    },
  })