<template>
  <button class='styleBtn' >{{title}}</button>
</template>

<script>
export default {
  name: 'Btn',
  props: ['title','onClick']
}
</script>

<style scoped>

.styleBtn {
    display: block;
    border: none;
    margin: 1em auto;
    padding: .3em 1.2em;
    font: inherit;
    font-size: 1.2em;
    text-align: center;
    letter-spacing: .2em;
    cursor: pointer;
    outline: none;
    border: 1px solid black;
    border-radius: .3em;
    box-shadow: 0 0.3em;
    transform: translateY(-0.3em);
    transition: all .2s;
}
.styleBtn:hover {
    box-shadow: 0 0.2em black;
    transform: translateY(-0.2em);
}
.styleBtn:active{
    box-shadow: 0 .1em .2em black;
    transform: translateY(-0.03em);
}
</style>