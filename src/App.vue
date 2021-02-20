<template>
  <div id="app">
    <el-container>
      <el-aside class="nav-side">
        <div class="nav-header">
          <div class="nav-header-logo">
            <i class="el-icon-picture-outline"/>
          </div>
          <div class="nav-header-title">区域“AI+”产业发展认知决策系统</div>
        </div>
        <el-menu
          v-if="nav && nav.length"
          :default-active="defaultActiveNav"
          :default-openeds="defaultOpenedsNav"
          class="el-menu-vertical-nav"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
        >
          <div v-for="item in nav" :key="item.text">
            <template v-if="item.children && item.children.length">
              <el-submenu :index="item.url">
                <template slot="title">
                  <i v-if="item.icon" :class="item.icon" />
                  <span>{{ item.text }}</span>
                </template>
                <el-menu-item
                  v-for="child in item.children"
                  :key="child.text"
                  :index="child.url"
                >{{ child.text }}</el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="item.url">
                <i v-if="item.icon" :class="item.icon" />
                <span slot="title">{{ item.text }}</span>
              </el-menu-item>
            </template>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="head">
          <div class="header-user">
            <i class="el-icon-user" />
            <span>用户名</span>
          </div>
        </el-header>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import nav from './config/nav';

export default {
    name: 'app',
    computed: {
        nav() {
            return nav.nav;
        },
        defaultActiveNav() {
            let path = this.$route.path;
            for (let i = 0; i < this.nav.length; i++) {
                let children = this.nav[i].children;
                if (children && children.length) {
                    for (let j = 0; j < children.length; j++) {
                        if (children[j].url === path) {
                            return path;
                        }
                    }
                } else if (this.nav[i].url === path) {
                    return path;
                }
            }
            // console.log(this.$router, this.$route);
            return '';
        },
        defaultOpenedsNav() {
            return this.nav.map(item => item.url);
        }
    },
    methods: {
    }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  cursor: default;
  min-height: 100vh;
  .el-container {
    min-height: 100vh;
  }
  .nav-side {
    width: 250px!important;
    // height: 100vh;
    background: #545c64;
    color: #fff;
    // height: 100%;
    .nav-header {
      display: flex;
      height: 50px;
      margin-top: 20px;
      .nav-header-logo {
        flex:  0 0 50px;
        i {
          display: block;
          font-size: 26px;
          margin-top: 12px;
        }
      }
      .nav-header-title {
        flex: 1 1 0px;
        font-size: 14px;
        margin: 5px 30px 5px 10px;
        text-align: left;
      }
    }
    .el-menu-vertical-nav {
      border-right: none;
      margin-top: 50px;
    }
  }
  .head {
    box-shadow: 0 2px 30px #ccc;
    .header-user {
      float: right;
      margin: 18px 20px 0 0;
      i {
        font-size: 20px;
      }
      span {
        margin-left: 10px;
        font-size: 14px;
      }
    }
    ::after {
      display: block;
      content: '';
      clear: both;
    }
  }
  .el-main {
    background: #EEE;
    min-width: 1000px;
    min-height: 690px;
  }
}
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
p {
  margin-block: 0;
}
ul, li {
  list-style: none;
}
</style>
