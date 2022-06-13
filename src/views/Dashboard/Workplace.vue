<template>
  <div>
    <a-card :bordered="false">
      <div class="search-bar">
        <a-auto-complete
          v-model="searchText"
          class="global-search"
          size="large"
          style="width: 100%"
          :data-source="dataSource"
          @select="onSelect"
          @search="onSearch"
          @change="onChange"
          placeholder='大家最近都在搜"微信风控通知及解决方式"'
        >
          <a-input>
            <a-button
              slot="suffix"
              style="margin-right: -12px"
              class="search-btn"
              size="large"
              type="primary"
            >
              <a-icon type="search" />
            </a-button>
          </a-input>
        </a-auto-complete>
        <div class="hotwords-list">
          <router-link to="/story?q=微信风控" class="hotword">
            <span>微信风控</span>
          </router-link>
          <router-link to="/story?q=公众号" class="hotword">
            公众号
          </router-link>
          <router-link to="/story?q=优惠券" class="hotword">
            优惠券
          </router-link>
          <router-link to="/story?q=套票" class="hotword"> 套票 </router-link>
        </div>
      </div>
    </a-card>
    <a-card :bordered="false">
      <a-page-header title="概况" />
      <a-row type="flex" justify="space-around" class="data-overview">
        <a-col :span="8">
          <a-statistic
            :value="1128"
            valueStyle="
                  fontSize: '42px',
                  color: '#353535'"
          >
            <div class="overview-title" slot="title">
              <a-icon type="book" class="overview-icon" />
              故事
            </div>
          </a-statistic>
        </a-col>
        <a-col :span="8">
          <a-statistic :value="1128">
            <div slot="title" class="overview-title">
              <a-icon type="appstore" class="overview-icon" />
              分类
            </div>
          </a-statistic>
        </a-col>
        <a-col :span="8">
          <a-statistic :value="1128">
            <div slot="title" class="overview-title">
              <a-icon type="bar-chart" class="overview-icon" />
              访问量
            </div>
          </a-statistic>
        </a-col>
      </a-row>
    </a-card>

    <a-card :bordered="false">
      <a-page-header title="近期发表" />
      <a-list item-layout="horizontal" :data-source="list">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta>
            <router-link slot="title" to="/"> {{ item.title }}</router-link>
          </a-list-item-meta>
          <div>{{ item.datetime }}</div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { PageView } from "@/layouts";

export default {
  name: "Workplace",
  components: {
    PageView,
  },
  data() {
    return {
      loading: true,
      searchText: "",
      dataSource: [],
      list: [
        {
          title: "甜蜜暴击",
          datetime: "2020-01-01",
        },
        {
          title: "甜蜜暴击",
          datetime: "2020-01-01",
        },
        {
          title: "甜蜜暴击",
          datetime: "2020-01-01",
        },
      ],
    };
  },
  watch: {
    searchText(val) {
      console.log("value", val);
    },
  },
  // computed: {
  //     userInfo() {
  //         return this.$store.getters.userInfo
  //     }
  // },
  created() {},
  mounted() {},
  methods: {
    onSearch(searchText) {
      this.dataSource = !searchText
        ? []
        : [searchText, searchText.repeat(2), searchText.repeat(3)];
    },
    onSelect(value) {
      console.log("onSelect", value);
    },
    onChange(value) {
      console.log("onChange", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.data-overview {
  padding: 24px 0 32px;
  text-align: center;
}
.overview-title {
  vertical-align: middle;
  color: #353535;
}
.overview-icon {
  margin-right: 5px;
  font-size: 20px;
  vertical-align: middle;
  color: #9a9a9a;
}
.global-search-wrapper {
  padding-right: 50px;
}

.global-search {
  width: 100%;
}

.global-search.ant-select-auto-complete {
  .ant-select-selection--single {
    margin-right: -46px;
  }
  .ant-input-affix-wrapper {
    .ant-input:not(:last-child) {
      padding-right: 62px;
    }
    .ant-input-suffix {
      button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
}

.global-search-item {
  display: flex;
}

.global-search-item-desc {
  flex: auto;
  text-overflow: ellipsis;
  overflow: hidden;
}

.global-search-item-count {
  flex: none;
}
.search-bar {
  width: 600px;
  margin: auto;
}
.hotwords-list {
  overflow: hidden;
}
.hotword {
  color: #999;
  font-size: 12px;
  line-height: 1;
  display: inline-block;
  margin: 10px 20px 0 0;
}
</style>
