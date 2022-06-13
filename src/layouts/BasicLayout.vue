<template>
  <a-layout class="layout" :class="device">
    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }"
    >
      <global-header />
      <!-- layout content -->
      <a-layout-content
        :style="{
          height: '100%',
          margin: '24px 24px 0',
          paddingTop: fixedHeader ? '64px' : '0',
        }"
      >
        <side-menu />
        <div class="layout-main">
          <div class="layout-area">
            <multi-tab v-if="multiTab"></multi-tab>
            <transition name="page-transition">
              <route-view />
            </transition>
          </div>
        </div>
        <!-- layout footer -->
      </a-layout-content>
      <global-footer />
    </a-layout>
  </a-layout>
</template>

<script>
import { triggerWindowResizeEvent } from "@/utils/util";
import { mapState, mapActions } from "vuex";
import { mixin, mixinDevice } from "@/utils/mixin";
import GlobalHeader from "./GlobalHeader";
import GlobalFooter from "./GlobalFooter";
import SideMenu from "./SideMenu";
import config from "@/config/defaultSettings";

import RouteView from "./RouteView";

export default {
  name: "BasicLayout",
  mixins: [mixin, mixinDevice],
  components: {
    GlobalHeader,
    GlobalFooter,
    SideMenu,
    RouteView,
  },
  data() {
    return {
      production: config.production,
      menus: [],
    };
  },
  watch: {
    collapsed(v) {
      document.body.className = v ? "desktop-layout-unfold" : "";
    },
  },
  computed: {
    contentPaddingLeft() {
      if (!this.fixSidebar || this.isMobile()) {
        return "0";
      }
      if (this.sidebarOpened) {
        return "256px";
      }
      return "80px";
    },
  },
  created() {},
  mounted() {},
  methods: {
    paddingCalc() {
      let left = "";
      if (this.sidebarOpened) {
        left = this.isDesktop() ? "256px" : "80px";
      } else {
        left = (this.isMobile() && "0") || (this.fixSidebar && "80px") || "0";
      }
      return left;
    },
    menuSelect() {},
  },
};
</script>

<style lang="scss">
.layout {
  background-size: 100%;
}
.layout-container {
  .layout-header {
    height: 40px;
  }
}
.layout-content {
  flex: 1;
  padding: 40px 0 80px;
}
.layout-main {
  margin-left: 230px;
  .layout-area {
    width: 90%;
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
  }
}
@media (max-width: 1366px) {
  .layout-main {
    margin-left: 200px;
  }
}
@media (max-width: 1151px) {
  .layout-main {
    margin-left: 0;
  }
}

/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
