import Vue from 'vue'
import Vuex from 'vuex'
import { intersection } from 'lodash'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    acl: {
      roles: [],
      permissions: [],
    }
  },
  getters: {
    /**
     * Getter untuk user info.
     */
    userInfo: state => state.user,

    /**
     * Getter untuk user role.
     */
    getUserRoles: state => state.acl.roles,

    /**
     * Getter untuk user role. Hanya return elemen pertama.
     */
    getUserRole: state => state.acl.roles[0],

    /**
     * Getter untuk melihat user memiliki role yang dibutuhkan.
     */
    userHasRole: state => (askedRole, strict = false) => {
      // Pastikan askedRole berupa array. Jika berupa string,
      // split string berdasar pipe
      if (typeof askedRole === 'string')
        askedRole = askedRole.split('|')

      // Jika strict, pastikan hasil irisan sesuai dengan askedRole
      if (strict)
        return intersection(state.acl.roles, askedRole) === askedRole

      // Jika tidak, pastikan hasil irisan bukan array kosong
      return intersection(state.acl.roles, askedRole).length > 0
    },

    /**
     * Getter untuk melihat user memiliki permission yang dibutuhkan.
     */
    userHasPermission: state => (askedPermission, strict = false) => {
      // Pastikan askedPermission berupa array. Jika berupa string,
      // split string berdasar pipe
      if (typeof askedPermission === 'string')
        askedPermission = askedPermission.split('|')

      // Jika strict, pastikan hasil irisan sesuai dengan askedPermission
      if (strict)
        return intersection(state.acl.permissions, askedPermission) === askedPermission

      // Jika tidak, pastikan hasil irisan bukan array kosong
      return intersection(state.acl.permissions, askedPermission).length > 0
    },

    /**
     * Getter untuk melihat user memiliki ability (role dan/atau permission) yang dibutuhkan.
     *
     * Pada dasarnya ini hanya shortcut untuk getter userHasRole dan userHasPermission.
     */
    userHasAbility: (state, getters) => (askedRole, askedPermission, strict = false) => {
      // Jika strict, pastikan hasil kedua getter sama-sama true
      if (strict)
        return getters.userHasRole(askedRole, true) && getters.userHasPermission(askedPermission, true)

      // Jika tidak, pastikan salah satu getter menghasilkan true
      return getters.userHasRole(askedRole) || getters.userHasPermission(askedPermission)
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setUserRoles (state, roles) {
      state.acl.roles = roles
    },
    setUserPermissions(state, permissions) {
      state.acl.permissions = permissions
    },
    setUserAbility(state, acl) {
      state.acl = acl
    },
  }
})

export default store
