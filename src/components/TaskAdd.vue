<template>
<div class="task-add">
  <form @submit.prevent="addTask()">
    <input type="text" v-model="title" placeholder="Get Started" class="go-input">
    <button @click.prevent="handleSubmitClick" type="submit" :class="{ active: title }">Add</button>
  </form>
</div>
</template>

<script>
export default {
  name: "TaskAdd",
  data() {
    return {
      title: ""
    };
  },
  methods: {
    handleSubmitClick() {
      if (this.title) {
        this.addTask();
      } else {
        document.querySelector(".go-input").focus();
      }
    },
    addTask() {
      // Trim Whitespace and cancel if empty
      let formattedTitle = this.title.trim();
      if (!formattedTitle) return;

      this.$store.dispatch("addTask", formattedTitle);

      this.title = "";
    }
  }
};
</script>

<style scoped>
.task-add {
  display: flex;
  justify-content: center;
}

form {
  display: flex;
  padding: 8px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

input[type="text"] {
  min-width: 80px;
  padding: 10px;
  border: none;
  margin-right: 10px;
  font-size: 1rem;
  background: transparent;
}

button.active {
  color: white;
  background: rgba(0, 0, 0, 0.8);
}
</style>
