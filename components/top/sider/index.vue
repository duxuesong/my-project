<template>
  <div class="sider-wrap">
    <div
      class="sider"
      v-for="(item, index) in menu"
      :key="index"
    >
      <div class="sider-menu">
        <template>
          <nuxt-link :to="item.path?item.path:''">
            <p
              class="menu-wrap"
              :class="{'selected-menu':isMenu===item.label&&item.path}"
              @click="selectedMenu(item)"
            >
              <span>
                <a-icon
                  :type="item.icon"
                  class="icon"
                />{{item.label}}
              </span>
              <span v-if="item.children">
                <a-icon
                  v-if="isMenu===item.label"
                  type="up"
                  style="fontSize:8px"
                />
                <a-icon
                  v-else
                  type="down"
                  style="fontSize:8px"
                />
              </span>
            </p>
          </nuxt-link>
        </template>
        <!-- <collapse-transition> -->
        <template v-if="item.children&&isMenu===item.label">
          <!-- <collapse-transition> -->
          <ul
            v-for="child in item.children"
            :key="child.id"
            class="menu-child-wrap"
          >
            <nuxt-link :to="child.path">
              <li
                class="menu-child"
                :class="{'selected-child':isSelected===child.label}"
                @click="selectedHandle(child)"
              >
                {{child.label}}
              </li>
            </nuxt-link>
          </ul>
          <!-- </collapse-transition> -->
        </template>
        <!-- </collapse-transition> -->
      </div>
    </div>
  </div>
</template>
<script>
import collapseTransition from '@/utils/trasition/collapseTransition'
export default {
  name: 'index',
  components: {
    collapseTransition
  },
  data () {
    return {
      isMenu: '',
      isSelected: '',
      menu: [
        {
          id: 0, label: '首页', path: '/', icon: 'bank'
        },
        {
          id: 1, label: '表单', icon: 'form', children: [
            { id: '1 - 1', label: '表单设计1', path: '/form' }
          ]
        },
        {
          id: 2, label: '测试', icon: 'bug', children: [
            { id: '2 - 1', label: '测试数据', path: '/form' }
          ]
        },
        {
          id: 3, label: '三维', icon: 'bug', children: [
            { id: '3 - 1', label: '日照分析', path: '/form' }
          ]
        }
      ]
    };
  },
  methods: {
    selectedMenu (item) {
      console.log(item, this._data.isMenu, '测试选中菜单项')
      this._data.isMenu = this._data.isMenu === item.label ? '' : item.label
      this._data.isSelected = ''
    },
    selectedHandle (child) {
      this._data.isSelected = this._data.isSelected === child.label ? '' : child.label
    }
  },
};
</script>
<style scoped>
.sider-wrap {
  height: 100%;
  padding-top: 10px;
  border-right: 1px solid #e8e8e8;
}
.menu-wrap {
  display: flex;
  height: 40px;
  max-height: 1000px;
  line-height: 40px;
  justify-content: space-between;
  padding: 0 20px 0 25px;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
}
.menu-wrap:hover {
  color: #1890ff;
}
.icon {
  margin-right: 8px;
}
.menu-child-wrap {
  max-height: 1000px;
}
.menu-child {
  padding-left: 45px;
  height: 40px;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
}
.menu-child:hover {
  color: #1890ff;
}
.selected-menu,
.selected-child {
  color: #1890ff;
  border-right: 3px solid #1890ff;
}
.selected-child {
  background-color: #e6f7ff;
}
</style>