<template>
<div class="mainWrap">
  <h3>{{welcome}}</h3>
  <div v-for="(pre, i) in preface" :key="i">
    <p v-html="pre.statement"></p>
    <p>Example: <span class="query">{{pre.example}}</span></p>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Developer',
  data() {
    return {
      welcome: 'All the GETs you\'ll ever need...' ,
      preface: [
        {
          statement: `<p>All initial queries need a <span class="query">+</span> separated between each word</p>`,
          example: "/author/george+r+r+martin"
        },
        {
          statement: `<p>Query for additional pages with <span class="query">?page=#</span></p>`,
          example: "/title/brave+new+world?page=3"
        },
        ],
      queries: [
        {
          brief: 'Search by tag',
          url: '/tag/...',
          egs: '/tag/wisdom'
        },
        {
          brief: 'Search by author',
          url: '/author/...',
          egs: '/author/tom+robbins'
        },
        {
          brief: 'Search by title',
          url: '/title/...',
          egs: '/title/crime+and+punishment'
        }
      ]
    };
  },
  created() {

  },
  methods: {

  },
};
</script>

<style scoped>

h3 {
  font-style: italic;
  letter-spacing: .2em;
  margin-bottom: 1.4em;
}

.query{
  background: blanchedalmond;
  font-family: 'Courier New', Courier, monospace;
}

.mainWrap {
  padding: 1em;
  max-width: 600px;
}

</style>