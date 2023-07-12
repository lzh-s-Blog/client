<template>
  <RightList :list="list" @select="handleSelect" />
</template>

<script>
import RightList from "./RightList";
export default {
  components: {
    RightList,
  },
  data() {
    return {
      list: [
        { name: "a", isSelect: false },
        { name: "b", isSelect: false },
        {
          name: "c",
          isSelect: true,
          children: [
            { name: "c-1", isSelect: false },
            {
              name: "c-2",
              isSelect: false,
              children: [
                { name: "c-2-1", isSlect: true },
                { name: "c-2-2", isSlect: true },
                { name: "c-2-3", isSlect: true },
              ],
            },
            {
              name: "c-3",
              isSelect: true,
              children: [
                { name: "c-3-1", isSlect: true },
                { name: "c-3-2", isSlect: true },
                { name: "c-3-3", isSlect: true },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>

<style>
</style>