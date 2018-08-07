<template>
  <div id="app">
    <TaskAdd />
    <TaskList />
  </div>
</template>

<script>
import TaskList from "./components/TaskList.vue";
import TaskAdd from "@/components/TaskAdd.vue";

export default {
  name: "app",
  components: {
    TaskAdd,
    TaskList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #111;
}

html {
  min-height: 100vh;
  background: #00b4db; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    -45deg,
    #0083b0,
    #00b4db
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    -45deg,
    #0083b0,
    #00b4db
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

body {
  margin-top: 30px;
  min-height: 100vh;
}

button {
  cursor: pointer;
  border-radius: 3px;
  padding: 10px 15px;
  font-size: 0.8em;
  border: none;
  background: transparent;
}
button:active {
  box-shadow: inset 0 0 5px rgb(0, 0, 0);
}
</style>
