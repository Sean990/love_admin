<template>
  <div class="desktop-head">
    <div class="desktop-head-inner">
      <div
        class="desktop-btn-menu desktop-unfold-menu"
        @click="handleMenuCollapse"
      >
        <a-icon type="menu" />
      </div>
      <div class="desktop-layout">
        <div class="desktop-layout-side">
          <router-link class="desktop-logo" to="/dashboard" title="I ❤️ U">
            <span class="desktop-title"> 管理系统 </span>
          </router-link>
        </div>
        <div class="desktop-layout-extra">
          <div class="desktop-account">
            <div class="desktop-operation desktop-account-opr">
              <a-dropdown>
                <template #overlay>
                  <a-menu @click="onMenuClick">
                    <a-menu-item class="desktop-account-fold-info">{{
                      currentUser.name
                    }}</a-menu-item>
                    <a-menu-item><a-icon type="home" />首页</a-menu-item>
                    <a-menu-item><a-icon type="logout" />退出登录</a-menu-item>
                  </a-menu>
                </template>
                <span class="desktop-operation-default">
                  <div class="desktop-account-info">
                    <router-link to="/">
                      <!-- <img
                        :src="currentUser.avatar"
                        class="desktop-account-thumb"
                      /> -->
                      <a-avatar
                        :src="currentUser.avatar"
                        icon="user"
                        class="desktop-account-thumb"
                      />
                    </router-link>
                  </div>
                </span>
              </a-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GlobalHeader",
  data() {
    return {
      currentUser: {
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        id: 1,
        name: "admin",
        phone: 0,
        status: 1,
      },
    };
  },
  methods: {
    onMenuClick(key) {
      if (key === "logout") {
        this.$store.dispatch({
          type: "login/logout",
        });
      } else if (key === "home") {
        this.$router.push("/");
      }
    },
    handleMenuCollapse() {
      this.$store.dispatch("ToggleCollapsed", !this.collapsed);
    },
  },
};
</script>

<style lang="scss" scoped>
.desktop-layout-side {
  float: left;
  &:after {
    content: " ";
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 100%;
    overflow: hidden;
  }
}

.desktop-layout-extra {
  float: right;
}
.desktop-account {
  &-fold-info {
    border-bottom: 1px solid #f1f1f2;
    margin-bottom: 5px;
  }
  &:after {
    content: " ";
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 100%;
    overflow: hidden;
  }
}
.desktop-head {
  background-color: #ffffff;
  box-shadow: 0 1px 4px 0 rgba(238, 238, 238, 0.5);
  .desktop-logo {
    margin: 0;
    display: flex;
    align-items: center;
    font-size: 2em;
    overflow: hidden;
    text-decoration: none;
    font-weight: 300;
    color: #4d4d4d;
    height: 100%;
    &:before {
      content: " ";
      // background: url(~@/assets/love.png) no-repeat center;
      background-size: 30px;
      width: 30px;
      height: 30px;
    }
  }
}
.desktop-head-inner {
  padding: 0 40px;
  height: 56px;
  .desktop-layout {
    height: 100%;
    position: relative;
    &:after {
      content: "\200B";
      display: block;
      height: 0;
      clear: both;
    }
    .desktop-layout-extra,
    .desktop-layout-side,
    .desktop-account {
      height: 100%;
    }
    .desktop-layout-extra {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}

.desktop-account-thumb {
  width: 32px;
  height: 32px;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 50%;
}

.desktop-operation-default {
  color: #9a9a9a;
  display: inline-block;
  vertical-align: middle;
  height: auto;
  padding-bottom: 0;
  margin-left: 15px;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  padding-right: 10px;
  &:hover {
    background: #f6f7f8;
  }
}

.desktop-account-info {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  padding-left: 38px;
  height: 32px;
  margin: 0;
}
.desktop-operation {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  text-align: left;
  &.desktop-account-opr {
    min-width: 24px;
    white-space: nowrap;
    .desktop-operation-default:after {
      content: " ";
      display: inline-block;
      vertical-align: middle;
      margin-top: -0.2em;
      border-width: 1px;
      border-style: solid;
      border-color: #1a1b1c #1a1b1c transparent transparent;
      transform-origin: 50% 50%;
      transform: rotate(135deg);
      width: 7px;
      height: 7px;
      margin-left: 2px;
    }
  }
}

@media screen and (max-width: 1366px) {
  .desktop-head-inner {
    padding: 0 40px;
  }
}

@media screen and (max-width: 1151px) {
  .desktop-head {
    .desktop-layout-side {
      float: none;
      display: inline-block;
    }
  }
  .desktop-head-inner {
    .desktop-layout {
      text-align: center;
      .desktop-layout-extra {
        text-align: left;
      }
    }
  }
}

@media screen and (max-width: 1023px) {
  .desktop-logo {
    .desktop-title {
      display: none;
    }
  }
}
</style>
