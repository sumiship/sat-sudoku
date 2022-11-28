<template>
  <div class="container">
    <div class="field" :class="{ error: phase === 2 }">
      <div class="row" v-for="row of 4" :key="`row${row}`">
        <div
          class="col"
          v-for="col of 4"
          :key="`row${row}col${col}`"
          @click="phase === 0 && (dialogNum = row * 4 + col)"
          :class="{ setted: memory[(row - 1) * 4 + (col - 1)] !== 0 }"
        >
          <teleport to="body">
            <div
              class="dialog"
              v-show="dialogNum === row * 4 + col"
              @click.self="dialogNum = 0"
            >
              <div class="contents">
                <div class="numbers">
                  <div
                    class="number-select"
                    v-for="num of 4"
                    :key="`select-row${row}col${col}num${num}`"
                    @click="setNumber((row - 1) * 4 + (col - 1), num)"
                  >
                    {{ num }}
                  </div>
                </div>
                <div
                  @click="setNumber((row - 1) * 4 + (col - 1), 0)"
                  class="erase"
                >
                  未選択
                </div>
              </div>
            </div>
          </teleport>
          {{
            field[(row - 1) * 4 + (col - 1)] === 0
              ? ""
              : field[(row - 1) * 4 + (col - 1)]
          }}
        </div>
      </div>
    </div>
    <div class="control">
      <div class="control-button" v-show="phase === 0" @click="search">
        search
      </div>
      <div class="control-button" v-show="phase >= 1" @click="set">set</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import text from "raw-loader!./cnfFiles/cnf1.cnf";
import solver from "@/utils/Solver";
import sudoku2cnf from "@/utils/Sudoku2Cnf";
import { reactive, ref } from "vue";
const phase = ref<number>(0);
const dialogNum = ref<number>(0);
const field = reactive<number[]>([...Array(16)].fill(0));
const setNumber = (index: number, num: number) => {
  field[index] = num;
  memory[index] = num;
  dialogNum.value = 0;
};
const memory: number[] = [...Array(16)].fill(0);
const search = () => {
  const cnf = sudoku2cnf(field);
  let ans: number[] = [];
  try {
    ans = solver(cnf);
    phase.value = 1;
  } catch (e) {
    phase.value = 2;
  }
  ans.forEach((number) => {
    const num = ((number - 1) % 4) + 1;
    const index = Math.floor((number - 1) / 4);
    field[index] = num;
  });
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
  background-color: rgb(129, 236, 236);
  margin-top: 100px;
  cursor: pointer;
  font-size: 30px;
}
.control-button {
  height: 100%;
  line-height: 100px;
}
.field {
  border-color: #2c3e50;
  border: solid 3px;
}
.field.error {
  border-color: red;
}
.row {
  display: flex;
  height: calc(600px / 4);
}
.row:not(:last-child) {
  border-bottom: solid 1px;
}
.row:nth-child(2n) {
  border-width: 3px;
}
.field.error .row {
  border-color: red;
}
.col {
  width: calc(600px / 4);
  text-align: center;
  line-height: calc(600px / 4);
  cursor: pointer;
  font-size: 40px;
  font-weight: bold;
  color: blue;
}
.col.setted {
  color: #2c3e50;
}
.col:not(:last-child) {
  border-right: solid 1px #2c3e50;
}
.col:nth-child(2n) {
  border-width: 3px;
}
.field.error .col {
  border-color: red;
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
  width: calc(380px / 2 - 10px);
  height: calc(380px / 2 - 10px);
  line-height: calc(380px / 2 - 10px);
  font-size: 40px;
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
  background-color: rgb(251, 195, 181);
  border: 3px solid rgb(247, 128, 98);
  border-radius: 10px;
  margin: 8px auto 0;
  padding: 10px 0;
  width: 130px;
  text-align: center;
  font-size: 30px;
}
.erase:hover {
  background-color: rgb(247, 128, 98);
}

@media screen and (max-width: 480px) {
  .container {
    width: 320px;
  }
  .control {
    height: 50px;
    margin-top: 50px;
    font-size: 20px;
  }
  .control-button {
    line-height: 50px;
  }
  .row {
    display: flex;
    height: calc(320px / 4);
  }
  .col {
    width: calc(320px / 4);
    line-height: calc(320px / 4);
    font-size: 30px;
  }
  .contents {
    width: 300px;
  }
  .number-select {
    width: calc(280px / 2 - 10px);
    height: calc(280px / 2 - 10px);
    line-height: calc(280px / 2 - 10px);
    font-size: 30px;
  }
  .erase {
    margin: 6px auto 0;
    padding: 6px 0;
    width: 1000px;
    text-align: center;
    font-size: 20px;
    width: 70px;
  }
}
</style>
