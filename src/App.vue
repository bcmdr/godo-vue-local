<template>
  <div id="app">
    <section class="top">
      <TaskAdd/>
      <TaskList/>
    </section>
    <section class="footer">
      GoDo © 2019
      <a href="https://twitter.com/bcmdr">Brett Commandeur</a> |
      <a href="https://github.com/bcmdr/godo-vue-local">Version 1.1.2</a>
    </section>
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
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  color: #111;
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

html {
  height: 100%;
  box-sizing: border-box;
}

body {
  position: relative;
  margin: 0;
  padding-bottom: 6rem;
  min-height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

a {
  color: inherit;
}

body {
  margin: 0;
  height: 100%;
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
.footer {
  color: white;
  background: #111;
  font-size: 0.8rem;
  width: 100%;
  bottom: 10px;
  text-align: center;
  padding: 15px;
}

.footer a {
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
