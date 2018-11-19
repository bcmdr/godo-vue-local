<template>
  <div class="task-list">
    <section class="task-items">
      <TaskItem
        v-for="(task, id) in tasks"
        :key="id"
        :task="task"
      />
    </section>
  </div>
</template>

<script>
import TaskItem from "@/components/TaskItem.vue";

export default {
  name: "TaskList",
  components: {
    TaskItem
  },
  computed: {
    tasks() {
      // return shallow copy of state tasks
      return this.$store.state.tasks.slice();
    }
  },
  created() {
    const storedTasks = this.$store.state.tasks.slice();

    if (storedTasks.length === 0) {
      this.$store.dispatch("addTask", "Add a Task to Focus On");
    }
  }
};
</script>

<style scoped>
section {
  margin: 20px 0;
}

.task-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
