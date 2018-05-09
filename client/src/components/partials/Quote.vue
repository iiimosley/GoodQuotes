<template>
<div class='quote'>
  <p>{{quote}}</p>
  <p> -- {{author}} <span v-if="title">({{title}})</span></p>
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
  width: 50%;
  margin: 2em auto;
}
p:nth-child(2) {
  text-align: right;
}

</style>