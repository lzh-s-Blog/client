<template>
  <div>
    <h1>App组件</h1>
    <Pager
      :total="total"
      :current="current"
      @pageChange ="handlePageChange($event)"
    />
  </div>
</template>

<script>
import Pager from "./";
export default {
  components: {
    Pager,
  },
  data() {
    return {
      total: 301,
      current: 20,
    };
  },

  methods: {
    handlePageChange(newPage) {
      this.current = newPage;
    },
  },
};
</script>

