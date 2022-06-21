new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            openInvitation: true,
            items: [
                {
                  src: 'https://digition.id/wp-content/uploads/2022/01/107077483-305398767491171-1941002224051595105-n-054ec2eac32ec6ec0469281ae9d35311-1.jpg',
                },
                {
                  src: 'https://digition.id/wp-content/uploads/2022/01/107827249-446177529598899-739618938078378725-n-e154248ba002e139fef7d60d374e9d9d.jpg',
                },
                {
                  src: 'https://digition.id/wp-content/uploads/2022/01/107378535-390608995231751-2801653375802710009-n-1ec00e7d9d4aa7cf58dc825091bbeb33.jpg',
                },
              ],
              form: [{
                nama: '',
                write_as: '',
                sosmed: '',
                ucapan: '',
            }],
            dialog: false,
            dialog1: false,
        }
    },
});