<template>
  <article :class="{ active: task.isActive, completed: task.completed }">
    <section class="content grow top-edge flex-row">
      <h2 class="title">{{task.title}}</h2>
    </section>
    <section class="controls flex-row bottom-edge">
      <div class="flex-row">
        <button class="button--delete" @click="deleteTask()">Remove</button>
      </div>
      <div class="flex-row">
        <p v-if="task.stoppedAt" class="reward">
          <span class="value">👍</span>
          <span v-if="task.times > 1" class="reward-times">x{{task.times}}</span>
        </p>
        <p v-if="task.startedAt" class="completion-time">
          <span class="value">{{task.isActive ? activeTime : completionTime}}</span>
          <span class="unit">min</span>
        </p>
        <button class="button--done" v-if="task.isActive" @click="stopTask()">Done</button>
        <button
          class="button--start"
          v-if="!task.isActive && !task.completed"
          @click="startTask()"
        >Start</button>
        <button
          class="button--start"
          v-if="!task.isActive && task.completed"
          @click="startTask()"
        >Again</button>
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
      timer: null,
      currentDate: new Date()
    };
  },
  computed: {
    startedAt() {
      return new Date(this.task.startedAt);
    },
    completionTime() {
      // update completion time
      if (this.task.completed === false) return null;
      let difference = differenceInMinutes(
        this.task.stoppedAt,
        this.task.startedAt
      );
      difference = difference > 0 ? difference : 1; // minimum 1 minute
      difference = difference <= 60 ? difference : "60+"; // maximum 60 minutes
      return difference;
    },
    activeTime() {
      let difference = differenceInMinutes(
        this.currentDate,
        this.task.startedAt
      );
      difference = difference <= 60 ? difference : "60+"; // maximum 60 minutes
      return difference;
    }
  },
  methods: {
    formatDate(date, formatString) {
      return format(date, formatString);
    },
    startTask() {
      this.$store.dispatch("startTask", this.task);
      this.updateCurrentDate();
      this.updateDateEverySecond();
    },
    stopTask() {
      this.$store.dispatch("stopTask", this.task);
      clearInterval(this.timer);
    },
    deleteTask() {
      this.$store.dispatch("removeTask", this.task);
    },
    updateCurrentDate() {
      this.currentDate = new Date();
    },
    updateDateEverySecond() {
      this.timer = setInterval(this.updateCurrentDate, 1000);
    }
  },
  created() {
    if (this.task.isActive) {
      this.updateDateEverySecond();
    }
  }
};
</script>

<style scoped>
.invisible {
  visibility: hidden;
}
.grow {
  flex-grow: 1;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  max-width: 360px;
  margin: 10px;
  background: transparent;
  box-sizing: border-box;
  border-radius: 3px;
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
h2 {
  margin: 0;
  font-weight: normal;
  font-size: 1.5em;
}
.reward {
  font-size: 1.5em;
  margin-left: 30px;
  margin-right: 15px;
}
.active h2 {
  font-weight: 900;
}
p {
  margin: 0;
}
.active {
  font-weight: bold;
}
.completion-time {
  margin-right: 15px;
  font-size: 1.5em;
}
.reward-times {
  font-size: 0.5em;
}
.unit {
  font-size: 0.5em;
}
.value {
  margin-right: 0.2rem;
  letter-spacing: -0.1rem;
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
  background: rgb(255, 255, 255);
}
.controls {
  background: rgba(255, 255, 255, 0.8);
}
.button--start {
  color: white;
  background: rgba(0, 0, 0, 0.9);
}
.button--done {
  background: white;
}
.button--delete {
  background: white;
}
</style>
