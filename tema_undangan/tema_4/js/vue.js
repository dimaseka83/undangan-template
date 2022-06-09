new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            dataApi: [],
            loading: true,
            value: 'home',
            ucapan: [],
            form: [{
              nama: '',
              ucapan: '',
              kehadiran: '',
            }],
            kehadiran: ['Hadir', 'Tidak Hadir'],
        }
    },

    methods: {
        kirimUcapan() {
            this.ucapan.push({
              nama: this.form.nama,
              ucapan: this.form.ucapan,
              kehadiran: this.form.kehadiran,
              // reply: []
            });
            // axios.post('https://merestui.com/api/'+this.dataApi.order.url+'/comment/store',{
            //   ref_no: "1",
            //   name: this.form.nama,
            //   write_as: this.form.nama,
            //   sosmed: this.form.nama,
            //   comment: this.form.ucapan,
            // })
            this.form = [{
              nama: '',
              ucapan: '',
              kehadiran: '',
              // reply: []
            }];
          },
        background() {
            document.getElementsByClassName('bg-page1')[0].style.backgroundImage = "url('./img/black_image.png'), url('https://digition.id/wp-content/uploads/2022/02/55-1.jpg')";
        }
    },

    mounted() {
        this.background();
    },

    computed: {
        totalUcapan() {
            return this.ucapan.length;
          },
    }
});