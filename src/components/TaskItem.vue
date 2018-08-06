<template>
  <article :class="{ active: task.isActive, completed: task.stoppedAt }" class="v-stretch">
    <section class="content grow top-edge flex-row">
      <h1 class="title">{{task.title}}</h1>
    </section>
    <section class="controls flex-row bottom-edge">
      <button @click="deleteTask()">&times;</button>
      <div class="flex-row">
        <p v-if="completionTime" class="completion-time">
          {{completionTime}}<span class="unit">min</span>
        </p>
        <button 
          class="button--done"
          v-if="task.isActive"
          @click="stopTask()">
          Done
        </button>
        <button 
          class="button--start"
          v-if="!task.isActive"
          @click="startTask()">
          Start
        </button>
      </div>
    </section>
  </article>
</template>

<script>
import { format, differenceInMinutes } from "date-fns";
// import { db } from "@/database";

export default {
  name: "TaskItem",
  props: {
    task: Object
  },
  data() {
    return {
      completionTime: null
    };
  },
  computed: {
    createdAt() {
      return this.task.createdAt.toDate();
    },
    startedAt() {
      return this.task.startedAt;
      //  && new Date(this.task.startedAt);
    },
    stoppedAt() {
      return this.task.stoppedAt;
      // && new Date(this.task.stoppedAt);
    },
    activeTime() {
      return differenceInMinutes(new Date(), this.startedAt);
    }
  },
  methods: {
    formatDate(date, formatString) {
      return format(date, formatString);
    },
    startTask() {
      this.$store.dispatch("startTask", this.task);
    },
    stopTask() {
      this.$store.dispatch("stopTask", this.task);

      // update completion time
      let difference = differenceInMinutes(new Date(), this.startedAt);
      difference = difference ? difference : 1; // minimum 1 minute
      this.completionTime = difference;
    },
    deleteTask() {
      this.$store.dispatch("removeTask", this.task);
    }
  }
};
</script>

<style scoped>
.grow {
  flex-grow: 1;
}
.v-stretch {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.top-edge {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.bottom-edge {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
article {
  flex-grow: 1;
  margin: 10px;
  min-width: 240px;
  max-width: 360px;
  background: transparent;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
}
article > section {
  padding: 15px;
}
.flex-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h1 {
  margin: 0;
  font-weight: normal;
  font-size: 1.5em;
}
.completed {
  background: #53ad5c;
}
.active h1 {
  font-weight: 900;
}
p {
  margin: 0;
}
.completion-time {
  margin-right: 15px;
  font-size: 1.5em;
  text-align: right;
}
.unit {
  margin-left: 2px;
  font-size: 0.5em;
}
.status {
  font-size: 0.8em;
  margin-right: 15px;
}
.date-label {
  font-size: 0.8em;
}
.content {
  padding: 30px;
  background: white;
}
.controls {
  background: rgba(255, 255, 255, 0.8);
}
.button--start {
  color: #111;
  background: white;
}
.button--done {
  color: white;
  background: #53ad5c;
}
</style>
