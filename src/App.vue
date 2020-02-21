<template>
  <div id="app">
    <DayHabit />
  </div>
</template>

<script>
import DayHabit from './pages/DayHabit'

export default {
  name: 'App',
  components: {
    DayHabit
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
