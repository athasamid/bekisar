<template>
  <div class="sidebar">
    <SidebarForm/>
    <nav class="sidebar-nav">
      <div slot="header"></div>
      <ul class="nav">
        <template v-for="(item, index) in navItemsFiltered">
          <template v-if="item.title">
            <SidebarNavTitle :name="item.name" :url="item.url" :classes="item.class" :wrapper="item.wrapper" :key="index" :label="item.label" />
          </template>
          <template v-else-if="item.divider">
            <SidebarNavDivider :classes="item.class" :key="index" />
          </template>
          <template v-else>
            <template v-if="item.children">
              <!-- First level dropdown -->
              <SidebarNavDropdown :name="item.name" :url="item.url" :icon="item.icon" :key="index">
                <template v-for="(childL1, index) in item.children">
                  <template v-if="childL1.children">
                    <!-- Second level dropdown -->
                    <SidebarNavDropdown :name="childL1.name" :url="childL1.url" :icon="childL1.icon" :key="index">
                      <li class="nav-item" v-for="(childL2, index) in childL1.children" :key="index">
                        <SidebarNavLink :name="childL2.name" :url="childL2.url" :icon="childL2.icon" :badge="childL2.badge" :variant="item.variant"/>
                      </li>
                    </SidebarNavDropdown>
                  </template>
                  <template v-else>
                    <SidebarNavItem :classes="item.class" :key="index">
                      <SidebarNavLink :name="childL1.name" :url="childL1.url" :icon="childL1.icon" :badge="childL1.badge" :variant="item.variant"/>
                    </SidebarNavItem>
                  </template>
                </template>
              </SidebarNavDropdown>
            </template>
            <template v-else>
              <SidebarNavItem :classes="item.class" :key="index">
                <SidebarNavLink :name="item.name" :url="item.url" :icon="item.icon" :badge="item.badge" :variant="item.variant" :label="item.label" />
              </SidebarNavItem>
            </template>
          </template>
        </template>
        <SidebarNavTitle name="compose" @click.native="showModalCompose"  :label="labelCompose"></SidebarNavTitle>
      </ul>
      <slot></slot>
    </nav>
    <SidebarFooter/>
    <SidebarMinimizer/>
    <b-modal hide-header-close
             ref="modalCompose"
             title="Buat Pesan"
             title-tag="h3"
             ok-title="Ubah Password"
             cancel-title="Batal"
             @ok="handleCompose"
             @hidden="resetCompose">
      <b-form @submit="submitNewSms">
        <b-form-group id="labelRecipient"
                      label="Penerima"
                      label-for="inputRecipient">
          <b-form-input id="inputRecipient" type="number" v-model="payloadCompose.recipient" placeholder="0821xxxxxx,08112xxxxx..."></b-form-input>
        </b-form-group>
        <b-form-group id="labelMessage" label="Pesan" label-for="inputMessage">
          <b-form-textarea id="inputMessage" v-model="payloadCompose.message" rows="3"></b-form-textarea>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import SidebarFooter from './SidebarFooter'
import SidebarForm from './SidebarForm'
import SidebarHeader from './SidebarHeader'
import SidebarMinimizer from './SidebarMinimizer'
import SidebarNavDivider from './SidebarNavDivider'
import SidebarNavDropdown from './SidebarNavDropdown'
import SidebarNavLink from './SidebarNavLink'
import SidebarNavTitle from './SidebarNavTitle'
import SidebarNavItem from './SidebarNavItem'
export default {
  name: 'sidebar',
  props: {
    navItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: {
    SidebarFooter,
    SidebarForm,
    SidebarMinimizer,
    SidebarNavDivider,
    SidebarNavDropdown,
    SidebarNavLink,
    SidebarNavTitle,
    SidebarNavItem
  },
  data() {
      return {
        payloadCompose: {
            recipient: null,
            message: null
        },
        labelCompose : {label: "Buat pesan"}
      }
  },
  computed: {
    navItemsFiltered () {
      return this.navItems
    },
  },
  methods: {
      submitNewSms (){

      },
      showModalCompose (){
        this.$refs.modalCompose.show()
      },
      handleCompose (){

      },
      resetCompose (){
          this.payloadCompose.recipient = null
          this.payloadCompose.message = null
      },
    handleClick (e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    },
  }
}
</script>

<style lang="css">
  .nav-link {
    cursor:pointer;
  }
</style>
