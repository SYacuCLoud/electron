<template>
  <div>
    <p>
      <b-button @click="selectAllRows">Select all</b-button>
      <b-button @click="clearSelected">Clear selected</b-button>
      <b-button variant="primary" @click="activeSelected"
        >Active selected</b-button
      >
      <b-button variant="danger" @click="deleteSelected"
        >Delete selected</b-button
      >
    </p>
    <b-table
      ref="myTable"
      hover
      selectable
      :select-mode="selectMode"
      @row-selected="onRowSelected"
      :items="items"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
    >
      <!-- Example scoped slot for select state illustrative purposes -->
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
      <template #cell(status)="row">
        <template v-if="row.item.status">
          <span class="text-success"> {{ row.value }} </span>
        </template>
        <template v-else>
          <span class="text-warning"> {{ row.value }} </span>
        </template>
      </template>
      <template #cell(actions)="row">
        <template v-if="row.item.status">
          <b-button @click="activeItem(row.index)">
            비활성화
          </b-button>
        </template>
        <template v-else
          ><b-button variant="primary" @click="activeItem(row.index)">
            활성화
          </b-button></template
        >
        <b-button variant="danger" @click="deleteItem(row.index)">
          삭제
        </b-button>
      </template>
    </b-table>
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col sm="3" md="3" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import MyItem from "../model/MyItem";
import Chance from "chance";
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

const chance = new Chance(Math.random);

@Component
export default class MyTable extends Vue {
  totalRows = 30;
  perPage = 10;
  currentPage = 1;
  items: Array<MyItem> = [];
  selected: Array<MyItem> = [];
  fields = [
    { key: "selected", label: "선택" },
    { key: "id", label: "아이디", sortable: true },
    { key: "content", label: "이름", sortable: true },
    {
      key: "status",
      label: "상태",
      sortable: true,
      formatter: (value, key, item) => {
        return value ? "활성" : "비활성";
      },
    },
    { key: "actions", label: "활성" },
  ];

  constructor() {
    super();
    for (let i = 0; i < this.totalRows; i++) {
      this.items.push({
        id: chance.integer({ min: 0, max: 1000000 }),
        content: chance.name(),
        status: Math.random() > 0.5 ? true : false,
      });
    }
  }

  rowClass(item, type) {
    if (!item || type !== "row") return;
    if (item.status == false) return "table-danger";
  }
  activeItem(rowIndex) {
    this.items[rowIndex].status = !this.items[rowIndex].status;
  }
  activeSelected() {
    this.selected.forEach((x) => (x.status = true));
  }
  deleteItem(rowIndex) {
    this.items.splice(rowIndex, 1);
  }
  deleteSelected() {
    this.selected.forEach((x) => {
      const index = this.items.indexOf(x, 0);
      if (index > -1) {
        this.items.splice(index, 1);
      }
    });
  }
  onRowSelected(items) {
    this.selected = items;
  }
  selectAllRows() {
    (this.$refs.myTable as Vue & { selectAllRows: () => void }).selectAllRows();
  }
  clearSelected() {
    (this.$refs.myTable as Vue & { clearSelected: () => void }).clearSelected();
  }
}
</script>

<style scoped></style>
