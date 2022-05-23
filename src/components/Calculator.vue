<template>
  <div class="page">
    <div class="triangle">
      <input type="text" style="border: none; outline:none; text-align: center; width: 100%; font-size: 20px" v-model="status.triangleStatus" readonly>
      <img class="image" src="../assets/Dreieck16_2.png" alt="lolz" />
    </div>
    <div class="calculator">
      <div class="inputSection">
        <div class="inputItem">
          <label for="SeiteA">Seite a <br /></label>
          <input v-model="calc.seiteA" name="SeiteA" type="number" />
        </div>
        <div class="inputItem">
          <label for="Winkela">Winkel α <br /></label>
          <input v-model="calc.winkelA" name="Winkela" type="number" />
        </div>
      </div>
      <div class="inputSection">
        <div class="inputItem">
          <label for="SeiteB">Seite b <br /></label>
          <input v-model="calc.seiteB" name="SeiteB" type="number" />
        </div>
        <div class="inputItem">
          <label for="Winkelb">Winkel β <br /></label>
          <input v-model="calc.winkelB" name="Winkelb" type="number" />
        </div>
      </div>
      <div class="inputSection">
        <div class="inputItem">
          <label for="SeiteC">Seite c <br /></label>
          <input v-model="calc.seiteC" name="SeiteC" type="number" />
        </div>
        <div class="inputItem">
          <label for="Winkelc">Winkel γ <br /></label>
          <input v-model="calc.winkelC" name="Winkelc" type="number" />
        </div>
      </div>
    </div>
    <button class="submit" id="submit" @click="getValues">Submit</button>&emsp;
    <button class="delete" id="submit" @click="clearValues">Clear</button>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  props: {},
  computed: {
    calc() {
      return this.$store.state.calcData;
    },
    status(){
      return this.$store.state;
    }
  },
  methods: {
    clearValues() {
      this.$store.commit("updateSeiteA", null);
      this.$store.commit("updateSeiteB", null);
      this.$store.commit("updateSeiteC", null);
      this.$store.commit("updateWinkelA", null);
      this.$store.commit("updateWinkelB", null);
      this.$store.commit("updateWinkelC", null);
      this.$store.commit("updateStatus", null);
    },
    getValues() {
      let data = this.$store.state.calcData;
      console.log(
        data.seiteA,
        data.seiteB,
        data.seiteC,
        data.winkelA,
        data.winkelB,
        data.winkelC
      );
      
      let pythagoras = false;
      let counter = 0;
      Object.values(data).forEach((element) => {
        if (element != null) {
          counter++;
          console.log(counter);
        }
      });

      if (counter != 3) {
        alert("Error processing Input. Bitte genau 3 Zahlen angeben");
        console.log("Error processing Input");
      } else if (
        data.seiteA != null &&
        data.seiteB != null &&
        data.seiteC != null
      ) {
        if (
          data.seiteA + data.seiteB <= data.seiteC ||
          data.seiteA + data.seiteC <= data.seiteB ||
          data.seiteb + data.seiteC <= data.seiteA
        ) {
          //Nicht möglich
          console.log("not possible");
        }
        let winkel1 =
          (180 / Math.PI) *
          Math.acos(
            (data.seiteB * data.seiteB -
              -data.seiteC * data.seiteC -
              data.seiteA * data.seiteA) /
              (2 * data.seiteB * data.seiteC)
          );
        let winkel2 =
          (180 / Math.PI) *
          Math.acos(
            (data.seiteA * data.seiteA -
              -data.seiteC * data.seiteC -
              data.seiteB * data.seiteB) /
              (2 * data.seiteA * data.seiteC)
          );
        let winkel3 =
          (180 / Math.PI) *
          Math.acos(
            (data.seiteA * data.seiteA -
              -data.seiteB * data.seiteB -
              data.seiteC * data.seiteC) /
              (2 * data.seiteA * data.seiteB)
          );

        this.$store.commit("updateWinkelA", winkel1);
        this.$store.commit("updateWinkelB", winkel2);
        this.$store.commit("updateWinkelC", winkel3);

      } else if (
        (data.seiteA != null && data.seiteB != null) ||
        (data.seiteA != null && data.seiteC) ||
        (data.seiteB != null && data.seiteC)
      ) {
        if (data.seiteA != null && data.seiteB != null) {
          if (data.winkelA == 90) {
            let hyp = data.seiteA * data.seiteA;
            let kat = data.seiteB * data.seiteB;
            let a = hyp - kat;
            let sum = Math.sqrt(a);
            if(hyp < kat){alert("Dreieck ist nicht möglich: Seite a muss grösser sein als Seite b");}
            this.$store.commit("updateSeiteC", sum);
            pythagoras = true;

          } else if (data.winkelB == 90) {
            let hyp = data.seiteB * data.seiteB;
            let kat = data.seiteA * data.seiteA;
            let a = hyp - kat;
            let sum = Math.sqrt(a);
            if(hyp < kat){alert("Dreieck ist nicht möglich: Seite b muss grösser sein als Seite a");}
            this.$store.commit("updateSeiteC", sum);
            pythagoras = true;

          } else if (data.winkelC == 90) {
            let kat1 = data.seiteA * data.seiteA;
            let kat2 = data.seiteB * data.seiteB;
            let a = kat1 + kat2;
            let sum = Math.sqrt(a);
            this.$store.commit("updateSeiteC", sum);
            pythagoras = true;

          } else if(data.winkelA != null){
            if(Math.abs(Math.sin(data.winkelA * Math.PI / 180)* data.seiteB/data.seiteA) >1){
              alert("Berechung ist nicht möglich");
              console.log("berechnung nicht Möglich");
            }else{
              let winkelB = Math.asin(Math.sin(data.winkelA * Math.PI / 180)* data.seiteB/data.seiteA);
              this.$store.commit("updateWinkelB", 180 / Math.PI * winkelB);
              let winkelC = Math.PI-winkelB-(data.winkelA * Math.PI / 180);
              this.$store.commit("updateWinkelC", 180 / Math.PI * winkelC);
              let seiteC = data.seiteB*Math.sin(winkelC)/Math.sin(winkelB);
              this.$store.commit("updateSeiteC", seiteC);
            }
          }else if(data.winkelB != null){
            if(Math.abs(Math.sin(data.winkelB * Math.PI / 180)* data.seiteA/data.seiteB) >1){
              alert("Berechung ist nicht möglich");
              console.log("berechnung nicht Möglich");
            }else{
              let winkelA = Math.asin(Math.sin(data.winkelB * Math.PI / 180)* data.seiteA/data.seiteB);
              this.$store.commit("updateWinkelA", 180 / Math.PI * winkelA);
              let winkelC = Math.PI-(data.winkelB * Math.PI / 180)-(winkelA);
              this.$store.commit("updateWinkelC", 180 / Math.PI * winkelC);
              let seiteC = data.seiteB*Math.sin(winkelC)/Math.sin(data.winkelB * Math.PI / 180);
              this.$store.commit("updateSeiteC", seiteC);
            }
          }
          else if(data.winkelC != null){
            let seiteC=Math.sqrt(data.seiteA*data.seiteA-(-data.seiteB*data.seiteB)-2*data.seiteA*data.seiteB*Math.cos(data.winkelC * Math.PI / 180));
            this.$store.commit("updateSeiteC", seiteC);
            let winkelA =(180 / Math.PI) * Math.acos((data.seiteB * data.seiteB - (-data.seiteC * data.seiteC) - data.seiteA * data.seiteA) /(2 * data.seiteB * data.seiteC));
            let winkelB =(180 / Math.PI) * Math.acos((data.seiteA * data.seiteA - (-data.seiteC * data.seiteC) - data.seiteB * data.seiteB) /(2 * data.seiteA * data.seiteC));
            this.$store.commit("updateWinkelA", winkelA);
            this.$store.commit("updateWinkelB", winkelB);
          }
        } else if (data.seiteA != null && data.seiteC != null) {
          if (data.winkelA == 90) {
            let hyp = data.seiteA * data.seiteA;
            let kat = data.seiteC * data.seite;
            let a = hyp - kat;
            let sum = Math.sqrt(a);
            if(hyp < kat){alert("Dreieck ist nicht möglich: Seite a muss grösser sein als Seite c");}
            this.$store.commit("updateSeiteB", sum);
            pythagoras = true;

          } else if (data.winkelB == 90) {
            let kat1 = data.seiteA * data.seiteA;
            let kat2 = data.seiteC * data.seiteC;
            let a = kat1 + kat2;
            let sum = Math.sqrt(a);
            this.$store.commit("updateSeiteB", sum);
            pythagoras = true;

          } else if (data.winkelC == 90) {
            let hyp = data.seiteC * data.seiteC;
            let kat = data.seiteA * data.seiteA;
            let a = hyp - kat;
            let sum = Math.sqrt(a);
            if(hyp < kat){alert("Dreieck ist nicht möglich: Seite c muss grösser sein als Seite a");}
            this.$store.commit("updateSeiteB", sum);
            pythagoras = true;

          }else if(data.winkelA != null){
            if(Math.abs(Math.sin(data.winkelA * Math.PI / 180)* data.seiteC/data.seiteA) >1){
              alert("Berechung ist nicht möglich");
              console.log("berechnung nicht Möglich");
            }else{
              let winkelC = Math.asin(Math.sin(data.winkelA * Math.PI / 180)* data.seiteC/data.seiteA);
              this.$store.commit("updateWinkelC", 180 / Math.PI * winkelC);
              let winkelB = Math.PI-(winkelC)-(data.winkelA * Math.PI / 180);
              this.$store.commit("updateWinkelB", 180 / Math.PI * winkelB);
              let seiteB = data.seiteC*Math.sin(winkelB)/Math.sin(winkelC);
              this.$store.commit("updateSeiteB", seiteB);
            }

          }else if(data.winkelB != null){
            let seiteB = Math.sqrt(data.seiteA * data.seiteA -(-data.seiteC * data.seiteC)-2 * data.seiteA * data.seiteC * Math.cos(data.winkelB * Math.PI / 180));
            this.$store.commit("updateSeiteB", seiteB);
            let winkelA =(180 / Math.PI) * Math.acos((data.seiteB * data.seiteB - (-data.seiteC * data.seiteC) - data.seiteA * data.seiteA) /(2 * data.seiteB * data.seiteC));
            let winkelC =(180 / Math.PI) * Math.acos((data.seiteA * data.seiteA - (-data.seiteB * data.seiteB) - data.seiteC * data.seiteC) /(2 * data.seiteA * data.seiteB));
            this.$store.commit("updateWinkelA", winkelA);
            this.$store.commit("updateWinkelC", winkelC);

          }else if(data.winkelC != null){
            if(Math.abs(Math.sin(data.winkelC * Math.PI / 180)* data.seiteA/data.seiteC) >1){
              alert("Berechung ist nicht möglich");
              console.log("berechnung nicht Möglich");
            }else{
              let winkelA = Math.asin(Math.sin(data.winkelC * Math.PI / 180)* data.seiteA/data.seiteC);
              this.$store.commit("updateWinkelA", 180 / Math.PI * winkelA);
              let winkelB = Math.PI-(winkelA)-(data.winkelC * Math.PI / 180);
              this.$store.commit("updateWinkelB", 180 / Math.PI * winkelB);
              let seiteB = data.seiteC*Math.sin(winkelB)/Math.sin(data.winkelC * Math.PI / 180);
              this.$store.commit("updateSeiteB", seiteB);
            }
          }
        } else if (data.seiteB != null && data.seiteC != null) {
          if (data.winkelA == 90) {
            let kat1 = data.seiteB * data.seiteB;
            let kat2 = data.seiteC * data.seiteC;
            let a = kat1 + kat2;
            let sum = Math.sqrt(a);
            this.$store.commit("updateSeiteA", sum);
            pythagoras = true;

          } else if (data.winkelB == 90) {
            let hyp = data.seiteB * data.seiteB;
            let kat = data.seiteC * data.seiteC;
            let a = hyp - kat;
            let sum = Math.sqrt(a);
            if(hyp < kat){alert("Dreieck ist nicht möglich: Seite b muss grösser sein als Seite c");}
            this.$store.commit("updateSeiteA", sum);
            pythagoras = true;

          } else if (data.winkelC == 90) {
            let hyp = data.seiteC * data.seiteC;
            let kat = data.seiteB * data.seiteB;
            let a = hyp - kat;
            let sum = Math.sqrt(a);
            if(hyp < kat){alert("Dreieck ist nicht möglich: Seite c muss grösser sein als Seite b");}
            this.$store.commit("updateSeiteA", sum);
            pythagoras = true;

          }else if(data.winkelA != null){
            let seiteA=Math.sqrt(data.seiteB*data.seiteB-(-data.seiteC*data.seiteC)-2*data.seiteB*data.seiteC*Math.cos(data.winkelA * Math.PI / 180));
            this.$store.commit("updateSeiteA", seiteA);
            let winkelB =(180 / Math.PI) * Math.acos((data.seiteA * data.seiteA - (-data.seiteC * data.seiteC) - data.seiteB * data.seiteB) /(2 * data.seiteA * data.seiteC));
            let winkelC =(180 / Math.PI) * Math.acos((data.seiteA * data.seiteA - (-data.seiteB * data.seiteB) - data.seiteC * data.seiteC) /(2 * data.seiteA * data.seiteB));
            this.$store.commit("updateWinkelB", winkelB);
            this.$store.commit("updateWinkelC", winkelC);

          }else if(data.winkelB != null){
            if(Math.abs(Math.sin(data.winkelB * Math.PI / 180)* data.seiteC/data.seiteB) >1){
              alert("Berechung ist nicht möglich");
              console.log("berechnung nicht Möglich");
            }else{
              let winkelC = Math.asin(Math.sin(data.winkelB * Math.PI / 180)* data.seiteC/data.seiteB);
              this.$store.commit("updateWinkelC", 180 / Math.PI * winkelC);
              let winkelA = Math.PI-(winkelC)-(data.winkelB * Math.PI / 180);
              this.$store.commit("updateWinkelA", 180 / Math.PI * winkelA);
              let seiteA = data.seiteC*Math.sin(winkelA)/Math.sin(winkelC);
              this.$store.commit("updateSeiteA", seiteA);
            }

          }else if(data.winkelC != null){
            if(Math.abs(Math.sin(data.winkelC * Math.PI / 180)* data.seiteB/data.seiteC) >1){
              alert("Berechung ist nicht möglich");
              console.log("berechnung nicht Möglich");
            }else{
              let winkelB = Math.asin(Math.sin(data.winkelC * Math.PI / 180)* data.seiteB/data.seiteC);
              this.$store.commit("updateWinkelB", 180 / Math.PI * winkelB);
              let winkelA = Math.PI-(winkelB)-(data.winkelC * Math.PI / 180);
              this.$store.commit("updateWinkelA", 180 / Math.PI * winkelA);
              let seiteA = data.seiteC*Math.sin(winkelA)/Math.sin(data.winkelC * Math.PI / 180);
              this.$store.commit("updateSeiteA", seiteA);
            }
          }
        }
        // Jetzte wo mer 3 Site hend wieder mit cosinus de rest usrechne
        // NUR WENN PYTHAGORAS 
        if (pythagoras == true && data.seiteA != null && data.seiteB != null && data.seiteC != null) {
          if (
            data.seiteA + data.seiteB <= data.seiteC ||
            data.seiteA + data.seiteC <= data.seiteB ||
            data.seiteb + data.seiteC <= data.seiteA
          ) {
            //Nicht möglich
            alert("Berechung ist nicht möglich");
            console.log("not possible");
          }
          let winkel1 =
            (180 / Math.PI) *
            Math.acos(
              (data.seiteB * data.seiteB -
                -data.seiteC * data.seiteC -
                data.seiteA * data.seiteA) /
                (2 * data.seiteB * data.seiteC)
            );
          let winkel2 =
            (180 / Math.PI) *
            Math.acos(
              (data.seiteA * data.seiteA -
                -data.seiteC * data.seiteC -
                data.seiteB * data.seiteB) /
                (2 * data.seiteA * data.seiteC)
            );
          let winkel3 =
            (180 / Math.PI) *
            Math.acos(
              (data.seiteA * data.seiteA -
                -data.seiteB * data.seiteB -
                data.seiteC * data.seiteC) /
                (2 * data.seiteA * data.seiteB)
            );

          this.$store.commit("updateWinkelA", winkel1);
          this.$store.commit("updateWinkelB", winkel2);
          this.$store.commit("updateWinkelC", winkel3);
        }

        //Wenn bis da nüt usgführt worde isch hemmer 2 Site und 1 winkel wo nöd 90 isch
      } else if (
        (data.winkelA != null && data.winkelB != null) ||
        (data.winkelA != null && data.winkelC) ||
        (data.winkelB != null && data.winkelC)
      ) {
        if (data.winkelA != null && data.winkelB) {
          if (data.seiteA != null) {
            let winkelC = Math.PI-(data.winkelB* Math.PI / 180)-(data.winkelA* Math.PI / 180);
            this.$store.commit("updateWinkelC", 180 / Math.PI * winkelC);
            let seiteB = data.seiteA*Math.sin(data.winkelB * Math.PI / 180)/Math.sin(data.winkelA* Math.PI / 180);
            let seiteC = data.seiteA*Math.sin(winkelC)/Math.sin(data.winkelA* Math.PI / 180);
            this.$store.commit("updateSeiteB", seiteB);
            this.$store.commit("updateSeiteC", seiteC);

          } else if (data.seiteB != null) {
            let winkelC = Math.PI-(data.winkelB* Math.PI / 180)-(data.winkelA* Math.PI / 180);
            this.$store.commit("updateWinkelC", 180 / Math.PI * winkelC);
            let seiteA = data.seiteB*Math.sin(data.winkelA * Math.PI / 180)/Math.sin(data.winkelB* Math.PI / 180);
            let seiteC = data.seiteB*Math.sin(winkelC)/Math.sin(data.winkelB* Math.PI / 180);
            this.$store.commit("updateSeiteA", seiteA);
            this.$store.commit("updateSeiteC", seiteC);

          } else if (data.seiteC != null) {
            let winkelC = Math.PI-(data.winkelA* Math.PI / 180)-(data.winkelB* Math.PI / 180);
            this.$store.commit("updateWinkelC", 180 / Math.PI * winkelC);
            let seiteA = data.seiteC*Math.sin(data.winkelA * Math.PI / 180)/Math.sin(winkelC);
            let seiteB = data.seiteC*Math.sin(data.winkelB * Math.PI / 180)/Math.sin(winkelC);
            this.$store.commit("updateSeiteA", seiteA);
            this.$store.commit("updateSeiteB", seiteB);
          }
        }

        if (data.winkelA != null && data.winkelC) {
          if (data.seiteA != null) {
            let winkelB = Math.PI-(data.winkelC* Math.PI / 180)-(data.winkelA* Math.PI / 180);
            this.$store.commit("updateWinkelB", 180 / Math.PI * winkelB);
            let seiteB = data.seiteA*Math.sin(winkelB)/Math.sin(data.winkelA * Math.PI / 180);
            let seiteC = data.seiteA*Math.sin(data.winkelC * Math.PI / 180)/Math.sin(data.winkelA * Math.PI / 180);
            this.$store.commit("updateSeiteB", seiteB);
            this.$store.commit("updateSeiteC", seiteC);

          } else if (data.seiteB != null) {
            let winkelB = Math.PI-(data.winkelA* Math.PI / 180)-(data.winkelC* Math.PI / 180);
            this.$store.commit("updateWinkelB", 180 / Math.PI * winkelB);
            let seiteA = data.seiteB*Math.sin(data.winkelA * Math.PI / 180)/Math.sin(winkelB);
            let seiteC = data.seiteB*Math.sin(data.winkelC * Math.PI / 180)/Math.sin(winkelB);
            this.$store.commit("updateSeiteA", seiteA);
            this.$store.commit("updateSeiteC", seiteC);

          } else if (data.seiteC != null) {
            let winkelB = Math.PI-(data.winkelC* Math.PI / 180)-(data.winkelA* Math.PI / 180);
            this.$store.commit("updateWinkelB", 180 / Math.PI * winkelB);
            let seiteA = data.seiteC*Math.sin(data.winkelA * Math.PI / 180)/Math.sin(data.winkelC * Math.PI / 180);
            let seiteB = data.seiteC*Math.sin(winkelB)/Math.sin(data.winkelC * Math.PI / 180);
            this.$store.commit("updateSeiteA", seiteA);
            this.$store.commit("updateSeiteB", seiteB);
          }
        }

        if (data.winkelB != null && data.winkelC) {
          if (data.seiteA != null) {
            let winkelA = Math.PI-(data.winkelB* Math.PI / 180)-(data.winkelC* Math.PI / 180);
            this.$store.commit("updateWinkelA", 180 / Math.PI * winkelA);
            let seiteB = data.seiteA*Math.sin(data.winkelB * Math.PI / 180)/Math.sin(winkelA);
            let seiteC = data.seiteA*Math.sin(data.winkelC * Math.PI / 180)/Math.sin(winkelA);
            this.$store.commit("updateSeiteB", seiteB);
            this.$store.commit("updateSeiteC", seiteC);

          } else if (data.seiteB != null) {
            let winkelA = Math.PI-(data.winkelC* Math.PI / 180)-(data.winkelB* Math.PI / 180);
            this.$store.commit("updateWinkelA", 180 / Math.PI * winkelA);
            let seiteA = data.seiteB*Math.sin(winkelA)/Math.sin(data.winkelB * Math.PI / 180);
            let seiteC = data.seiteB*Math.sin(data.winkelC * Math.PI / 180)/Math.sin(data.winkelB * Math.PI / 180);
            this.$store.commit("updateSeiteA", seiteA);
            this.$store.commit("updateSeiteC", seiteC); 
            
          } else if (data.seiteC != null) {
            let winkelA = Math.PI-(data.winkelC* Math.PI / 180)-(data.winkelB* Math.PI / 180);
            this.$store.commit("updateWinkelA", 180 / Math.PI * winkelA);
            let seiteA = data.seiteC*Math.sin(winkelA)/Math.sin(data.winkelC * Math.PI / 180);
            let seiteB = data.seiteC*Math.sin(data.winkelB * Math.PI / 180)/Math.sin(data.winkelC * Math.PI / 180);
            this.$store.commit("updateSeiteA", seiteA);
            this.$store.commit("updateSeiteB", seiteB); 
          }
        }
      } else if (
        data.winkelA != null &&
        data.winkelB != null &&
        data.winkelC != null
      ) {
        // Gaht 
        alert("Berechung ist nicht möglich");
        console.log("Nicht möglich");
      }

      let counter2 = 0;
      Object.values(data).forEach((element) => {
        if (element != null) {
          counter2++;
          console.log(counter);
        }
      });
      if(counter2 == 6){
        if(data.winkelA < 90 && data.winkelB < 90 && data.winkelB < 90){
          this.$store.commit("updateStatus", " Spitzwinklig");
        }
        if(data.winkelA > 90 || data.winkelB > 90 || data.winkelB > 90){
          this.$store.commit("updateStatus", " Stumpfwinklig");
        }
        if(data.winkelA == 60.00 && data.winkelB == 60.00 && data.winkelB == 60.00){
          this.$store.commit("updateStatus", " Gleichseitig");
        }else if((data.seiteA == data.seiteB) ||(data.seiteA == data.seiteC) || (data.seiteB == data.seiteC)){
          this.$store.commit("updateStatus", " Gleichschenklig");
        }
        if(data.winkelA == 90.00 || data.winkelB == 90.00 || data.winkelB == 90.00){
          this.$store.commit("updateStatus", " Rechtwinklig");
        }

      

      }
      

    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.triangle{
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.page{
  width: 100%;
  overflow-x: hidden;
}

.calculator {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
}
.inputSection {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}

.inputItem {
  display: flex;
  flex-direction: column;
  width: 100%;
}

input {
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid black;

}
.submit {
  width: 8rem;
  height: 2rem;
  border-radius: 1rem;
  border-style: none;
  border: 1px solid black;
  background-color: #ffffff;
  transition: all 0.25s linear;
}

.delete{
  width: 8rem;
  height: 2rem;
  border-radius: 1rem;
  border-style: none;
  border: 1px solid black;
  background-color: #ffffff;
  transition: all 0.25s linear;
}


.submit:hover {
  background-color: rgb(37, 214, 105);
  color: #ffffff;
}

.delete:hover{
  background-color: rgb(194, 47, 47);
  color: #ffffff;
}

.image {
  width: 25rem;
  height: 16rem;
}

</style>
