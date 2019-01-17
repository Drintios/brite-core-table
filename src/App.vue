<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <PaymentData />
  </div>
</template>

<script>
import PaymentData from './components/PaymentData.vue';

export default {
  name: 'app',
  components: {
    PaymentData,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

* {
  box-sizing: border-box;
}
</style>
