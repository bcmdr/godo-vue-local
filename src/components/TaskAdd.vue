<template>
<div class="task-add">
  <form @submit.prevent="addTask(title)">
    <input type="text" v-model="title" placeholder="Get Started">
    <button type="submit" :class="{ active: title }">Add</button>
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
    addTask(title) {
      // Trim Whitespace and cancel if empty
      const formattedTitle = title.trim();
      if (!formattedTitle) return;

      this.$store.dispatch("addTask", formattedTitle);

      // Create Task Fields
      // const createdAt = Date.now();
      // const startedAt = createdAt;
      // const stoppedAt = null;
      // const isStarted = true;
      // const _id = uuid();

      // const taskIds = localStorage.getObject("taskIds");
      // const newTaskIds = taskIds.concat(_id);
      // localStorage.setObject("taskIds", newTaskIds);

      // const task = {
      //   title: formattedTitle,
      //   createdAt,
      //   startedAt,
      //   stoppedAt,
      //   isStarted,
      //   _id
      // };

      // Save the Task
      // localStorage.setObject(_id, task);

      // Reset Fields
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
  background: #2c3e50;
}
</style>
