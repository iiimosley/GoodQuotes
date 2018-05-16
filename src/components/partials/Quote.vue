<template>
<div class='quote'>
  <p>{{quote}}</p>
  <p> -- <span class="author">{{author}}</span> <span id="quoteTitle" v-if="title">({{title}})</span><slot></slot></p>
</div>
</template>

<script> 

export default {
  name: 'Quote',
  props: ['quote', 'author', 'title']
}

</script>

<style scoped>

.quote{
  font-family: 'Merriweather', Helvetica, sans-serif;
  width: 50%;
  margin: 2em auto;
}

#quoteTitle {
  font-style: italic;
}

p:nth-child(2) {
  text-align: right;
}

</style>