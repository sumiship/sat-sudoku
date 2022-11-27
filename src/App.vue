<template>
  <div class="container">
    <div class="field">
      <div class="row" v-for="row of 9" :key="`row${row}`">
        <div
          class="col"
          v-for="col of 9"
          :key="`row${row}col${col}`"
          @click="phase === 0 && (dialogNum = row * 9 + col)"
        >
          <teleport to="body">
            <div
              class="dialog"
              v-show="dialogNum === row * 9 + col"
              @click.self="dialogNum = 0"
            >
              <div class="contents">
                <div class="numbers">
                  <div
                    class="number-select"
                    v-for="num of 9"
                    :key="`select-row${row}col${col}num${num}`"
                    @click="setNumber((row - 1) * 9 + (col - 1), num)"
                  >
                    {{ num }}
                  </div>
                </div>
                <div
                  @click="setNumber((row - 1) * 9 + (col - 1), 0)"
                  class="erase"
                >
                  消す
                </div>
              </div>
            </div>
          </teleport>
          {{
            field[(row - 1) * 9 + (col - 1)] === 0
              ? ""
              : field[(row - 1) * 9 + (col - 1)]
          }}
        </div>
      </div>
    </div>
    <div class="control">
      <div class="control-button" v-show="phase === 0" @click="search">
        search
      </div>
      <div class="control-button" v-show="phase === 1" @click="set">set</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import text from "raw-loader!./cnfFiles/cnf1.cnf";
import solver from "@/utils/Solver";
import sudoku2cnf from "@/utils/Sudoku2Cnf";
import { reactive, ref } from "vue";
const test = () => {
  const ans = solver(text);
  console.log(ans);
  console.log(text);
};
const phase = ref<number>(0);
const dialogNum = ref<number>(0);
const field = reactive<number[]>([...Array(81)].fill(0));
const setNumber = (index: number, num: number) => {
  field[index] = num;
  dialogNum.value = 0;
};
const memory: number[] = [];
const search = () => {
  memory.length = 0;
  memory.push(...field);
  const cnf = sudoku2cnf(field);
  const ans = solver(cnf);
  phase.value = 1;
  console.log(ans);
};
const set = () => {
  field.length = 0;
  field.push(...memory);
  phase.value = 0;
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  position: relative;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.container {
  width: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.control {
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(129, 236, 236);
  margin-top: 100px;
  cursor: pointer;
  font-size: 30px;
}
.field {
  height: 600px;
  border: solid 3px black;
}
.row {
  display: flex;
  height: calc(600px / 9);
}
.row:not(:last-child) {
  border-bottom: solid 1px black;
}
.row:nth-child(3n) {
  border-width: 3px;
}
.col {
  width: calc(600px / 9);
  text-align: center;
  line-height: calc(600px / 9);
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
}
.col:not(:last-child) {
  border-right: solid 1px black;
}
.col:nth-child(3n) {
  border-width: 3px;
}
.dialog {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #2c3e5076;
}
.contents {
  cursor: default;
  position: absolute;
  width: 400px;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.numbers {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3px;
}
.number-select {
  width: calc(380px / 3 - 10px);
  height: calc(380px / 3 - 10px);
  line-height: calc(380px / 3 - 10px);
  font-size: 20px;
  text-align: center;
  background-color: azure;
  border: 3px solid rgb(196, 248, 248);
  cursor: pointer;
}
.number-select:hover {
  background-color: rgb(196, 248, 248);
}
.erase {
  cursor: pointer;
  background-color: rgb(247, 128, 98);
  margin: 8px auto 0;
  width: 100px;
  text-align: center;
}
</style>
