<template>
  <div>
    <b-card
      style="max-width: 40rem; margin: auto; margin-top: 10vh;"
      border-variant="info"
    >
      <b-form @submit.prevent="addNew">
        <b-input-group prepend="Add a todo">
          <b-form-input
            v-model="currentContent"
            id="new-todo"
            placeholder="예) 밥 먹기"
          />
          <b-button type="submit" variant="outline-primary">Add</b-button>
        </b-input-group>
      </b-form>
      <transition-group name="list" tag="p">
        <b-list-group-item
          v-for="(myItem, index) in myList"
          :myItem="myItem"
          :index="index"
          :key="myItem.id"
          class="list-item"
        >
          <b-form-checkbox inline :checked="myItem.status == true">
            {{ myItem.content }}
            <b-button variant="danger" @click="myList.splice(index, 1)"
              >del</b-button
            >
          </b-form-checkbox>
        </b-list-group-item>
      </transition-group>
    </b-card>
  </div>
</template>

<script lang="ts">
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

@Component
export default class MyList extends Vue {
  myList = [
    { id: 1, content: "씻기", status: true },
    { id: 2, content: "준비하기", status: true },
    { id: 3, content: "학교가기", status: true },
    { id: 4, content: "게임하기", status: false },
  ];
  currentId = 5;
  currentContent = "";

  addNew() {
    if (this.currentContent) {
      this.myList.push({
        id: this.currentId,
        content: this.currentContent,
        status: false,
      });
      this.currentId++;
    }
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>
