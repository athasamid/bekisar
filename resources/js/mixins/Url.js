export default {
  methods: {
    // Base URL, ga perlu dijelaskan kan? 😁
    baseUrl(path = '') {
      if (path.charAt(0) !== '/')
        path = '/' + path

      return window.baseUrl + path
    },
    // Resource URL, untuk keluar-masuk data
    resourceUrl(path = '') {
      if (path.charAt(0) !== '/')
        path = '/' + path

      return window.baseUrl + '/resource' + path
    },
    // Form URL, untuk inject pilihan form (MultiSelect contohnya)
    formUrl(path = '') {
      if (path.charAt(0) !== '/')
        path = '/' + path

      return window.baseUrl + '/resource/form' + path
    }
  }
}
