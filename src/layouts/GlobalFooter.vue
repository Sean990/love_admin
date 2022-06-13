<template>
  <Footer class="ant-pro-global-footer">
    <div class="ant-pro-global-footer-copyright">
      Copyright <a-icon type="copyright" />
      2020 小张（Sean）出品
    </div>
  </Footer>
</template>

<script>
export default {
  name: "GlobalFooter",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.main {
  color: #ddd;
}

.ant-pro-global-footer {
  margin: 48px 0 24px 0;
  padding: 0 16px;
  text-align: center;

  &-copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
