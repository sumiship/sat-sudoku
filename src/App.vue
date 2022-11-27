<template>
  <div>
    <button @click="test">aaa</button>
  </div>
</template>

<script lang="ts" setup>
// import { solve } from "sat-solver";

import solver from "@/utils/Solver";
const test = () => {
  const ans = solver();
  console.log(ans);
};
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
