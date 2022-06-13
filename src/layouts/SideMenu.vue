<template>
  <div>
    <div class="layout-side-mask" @click="handleMenuCollapse"></div>
    <div class="layout-side">
      <div
        class="desktop-btn-menu desktop-unfold-menu"
        @click="handleMenuCollapse"
      >
        <a-icon type="left" />
      </div>
      <ul class="layout-menu">
        <template v-for="route in menuRoutes">
          <template v-if="!route.hidden">
            <li
              :key="route.path"
              class="layout-menu-item"
              v-if="
                hasOneShowingChild(route.children, route) &&
                (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
                !route.alwaysShow
              "
            >
              <router-link
                v-if="onlyOneChild.meta"
                :title="onlyOneChild.meta.title"
                class="layout-menu-link"
                :class="{
                  'layout-menu-link-current':
                    currentRoute === onlyOneChild.path,
                }"
                :to="onlyOneChild.path"
              >
                <span class="layout-menu-link-inner">
                  <a-icon
                    :type="
                      onlyOneChild.meta.icon || (route.meta && route.meta.icon)
                    "
                    class="layout-menu-icon"
                    theme="outlined"
                  />
                  <span class="layout-menu-name">{{
                    onlyOneChild.meta.title
                  }}</span>
                </span>
                <i class="layout-icon-reddot"></i>
              </router-link>
            </li>
            <li
              class="layout-menu-item"
              :class="{ 'menu-folder-open': route.menuFolderOpen }"
              :key="route.path"
              v-else
            >
              <div
                :title="route.meta.title"
                class="layout-menu-link"
                :class="{
                  'layout-menu-link-current': route.menuFolderOpen,
                }"
                @click="route.menuFolderOpen = !route.menuFolderOpen"
              >
                <span class="layout-menu-link-inner">
                  <a-icon
                    :type="route.meta && route.meta.icon"
                    class="layout-menu-icon"
                  />
                  <span class="layout-menu-name">{{ route.meta.title }}</span>
                  <div class="menu-folder"></div>
                </span>
              </div>
              <ul
                class="layout-sub-menu"
                :style="subMenuStyle(route.childrenLen, route.menuFolderOpen)"
              >
                <template v-for="child in route.children">
                  <li
                    class="layout-sub-menu-item"
                    :class="{
                      'layout-sub-menu-item-current': currentRoute === child.path,
                    }"
                    :key="child.path"
                    v-if="!child.hidden"
                  >
                    <router-link
                      :title="child.meta && child.meta.title"
                      class="layout-menu-link"
                      :class="{
                        'layout-menu-link-current': currentRoute === child.path,
                      }"
                      :to="child.path"
                    >
                      <span class="layout-menu-link-inner">
                        <span class="layout-menu-name">{{
                          child.meta.title
                        }}</span>
                      </span>
                      <i class="layout-icon-reddot"></i>
                    </router-link>
                  </li>
                </template>
              </ul>
            </li>
          </template>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import RouteView from "./RouteView";
import { mixinDevice } from "@/utils/mixin";
import { constantRouterMap } from "@/config/router.config";

export default {
  name: "SideMenu",
  components: { RouteView },
  mixins: [mixinDevice],
  data() {
    this.onlyOneChild = null;
    return {
      menuRoutes: constantRouterMap,
    };
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    },
    routeChildrenLength() {
      let len = 0;

      return len;
      // return 0
    },
  },
  mounted() {
    for (let i = 0; i < this.menuRoutes.length; i++) {
      let parent = this.menuRoutes[i];
      if (
        !parent.hidden &&
        parent.hasOwnProperty("children") &&
        parent.hasOwnProperty("menuFolderOpen")
      ) {
        for (let x = 0; x < parent.children.length; x++) {
          if (parent.children[x].path === this.currentRoute) {
            parent.menuFolderOpen = true;
          }
        }
      }
    }
  },
  methods: {
    subMenuStyle(length, menuFolderOpen) {
      if (menuFolderOpen) {
        return {
          height: `${length * 36}px`,
        };
      } else {
        return {
          height: 0,
        };
      }
    },
    handleMenuCollapse() {
      this.$store.dispatch("ToggleCollapsed", !this.$store.getters.collapsed);
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-menu {
  .layout-menu-link {
    color: #222222;
    border-left: 4px solid transparent;
    display: block;
    cursor: pointer;
    &-current {
      color: #3590ff;
      .layout-menu-icon {
        color: inherit;
      }
    }
    &-inner {
      display: inline-block;
      vertical-align: top;
      max-width: 100%;
      // color: #222222;
      .layout-menu-icon {
        font-size: 18px;
        vertical-align: middle;
      }
    }
    &:hover {
      text-decoration: none;
      background-color: rgba(0, 0, 0, 0.03);
    }
  }
  .layout-icon-reddot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #e64340;
    display: inline-block;
    margin-left: 5px;
  }
  .layout-menu-name {
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    padding-left: 14px;
    position: relative;
    color: inherit;
    vertical-align: middle;
  }
  .layout-icon-reddot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #e64340;
    display: inline-block;
  }
  .layout-menu-item {
    padding: 8px 0;
    line-height: 1.6;
    border-top: 1px solid #e3e4e5;
    &:first-child {
      padding-top: 0;
      border-top: none;
    }
    &:before {
      content: " ";
      position: absolute;
      bottom: 0;
      left: 85px;
      width: 43%;
      border-top: 1px solid #e4e8eb;
    }
    &:last-child:before {
      display: none;
    }
    & > .layout-menu-link {
      position: relative;
      min-height: 50px;
      line-height: 50px;
      padding-right: 15px;
      padding-left: 56px;
      font-size: 16px;
      font-weight: 500;
      display: flex;
      align-items: center;
      border-radius: 0;
    }
  }
  .layout-sub-menu {
    display: block;
    font-size: 14px;
    margin-left: 84px;
    transition: height 0.2s ease 0s;
    overflow: hidden;
    .layout-sub-menu-item {
      line-height: 36px;
      height: 36px;
      &-current {
        color: #3590ff;
      }
      .layout-menu-link {
        // padding-left: 84px;
      }
    }
  }
  .menu-folder {
    position: absolute;
    top: 50%;
    right: 12px;
    // height: 10px;
    // border-right: 2px solid #b1b2b3;
    // border-top: 2px solid #b1b2b3;
    // transform: rotate(-45deg);
    cursor: pointer;
    width: 10px;
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &::before,
    &::after {
      position: absolute;
      width: 8px;
      height: 1.5px;
      background: #fff;
      background: rgba(0, 0, 0, 0.65) \9;
      background-image: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.65),
        rgba(0, 0, 0, 0.65)
      );
      background-image: none\9;
      border-radius: 2px;
      transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      content: "";
    }
    &::before {
      transform: rotate(45deg) translateY(-2px);
      transform: rotate(-45deg) translateX(2px);
    }
    &::after {
      transform: rotate(-45deg) translateY(2px);
      transform: rotate(45deg) translateX(-2px);
    }
  }
  .menu-folder-open {
    .menu-folder {
      transform: translateY(-2px);
      // top: 28px;
      // transform: rotate(135deg);
      &:before {
        transform: rotate(45deg) translateX(2px);
      }
      &:after {
        transform: rotate(-45deg) translateX(-2px);
      }
    }
  }
}
@media (max-width: 1366px) {
  .layout-menu {
    .layout-menu-item {
      & > .layout-menu-link {
        // padding-left: 35px;
      }
    }
    .layout-sub-menu {
      display: block;
      font-size: 14px;
      margin-left: 74px;
      transition: height 0.2s ease 0s;
      overflow: hidden;
      .layout-sub-menu-item {
        .layout-menu-link {
          // padding-left: 60px;
        }
      }
    }
  }
}
</style>
