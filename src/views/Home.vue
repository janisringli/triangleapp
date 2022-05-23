<template>
  <div>
    <article>
      <h1>Trigonometrischer Rechner</h1>
      <p>Dies ist ein Rechner für trigonometrische Berechnungen</p>
      <h2>Funktionsweise</h2>
      <p>Dieser Rechner berechnet alle Seiten und Winkel <br>mit Hilfe von Sinus, Cosinus Tangens und Pythagoras.</p>
      <p>Ebenfalls soll der Rechner im stande sein herauszufinden,<br> ob das Dreieck spitzwinklig oder stumpfwinklig ist</p>
      <h2>Programmiersprache</h2>
      <p>Wir haben uns für Vue.js entschieden. Grund dafür war, dass alle <br> Applikationsentwickler in der Gruppe bereits damit vertraut sind und der Input in Vue.js <br> einfach leserlich ist verglichen zu anderen JavaScript Frameworks</p>
      <p>Diese Applikation wurde vom Team Schucan, Ringli, Schmid, Karacan gemacht.</p>
      <br>
      <div class="images">
        <img src="../assets/logo.png" alt="Vue logo"/>
        <img src="../assets/htmlLogo.png" alt="Vue logo"/>
        <img src="../assets/cssLogo.png" style="width: 70px;!important" alt="Vue logo"/>&nbsp;&nbsp;
        <img src="../assets/javascriptLogo.png" style="width: 70px;!important" alt="Vue logo"/>
      </div>
    </article>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Calculator from "../components/Calculator.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Calculator,
  },
};
</script>

<style scoped>
 article {
	 max-width: 1000px;
	 margin: 0 auto;
	 padding: 10px;
}

img{
  height: 100px;
  width: 100px;
}
</style>