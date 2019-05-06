//== Axios
window.axios = require('axios')
// Set semua request dari Axios sebagai XHR
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Ambil url() dari Laravel
window.baseUrl = document.head.querySelector('meta[name="base-url"]').content


//== Lodash
window.omit = require('lodash/omit')
window.flatMap = require('lodash/flatMap')
window.debounce = require('lodash/debounce')
window.endsWith = require('lodash/endsWith')
window.flattenDepth = require('lodash/flattenDepth')


//== date-fns
window.format = require('date-fns/format')
window.diffForHuman = require('date-fns/distance_in_words_to_now')
window.dateFnsBahasa = {
  locale: require('date-fns/locale/id')
}

//== TODO: Laravel Echo
// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key',
//     cluster: 'mt1',
//     encrypted: true
// });


// axios.interceptors.response.use((response) => {
//   return response
// }, (error) => {
//   if(error.response){
//     if(error.response.status == 401) {
//       $route.push('login')
//     }
//   }
//   return error
// })
