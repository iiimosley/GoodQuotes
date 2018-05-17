<template>
<div class="mainWrap">
  <h2>Accessing the API</h2>
  <div v-for="(pre, i) in preface" :key="`preface${i}`">
    <p v-html="pre.statement"></p>
    <p>Example: <span class="query">{{pre.example}}</span></p>
  </div>
  <div v-for="(query, i) in queries" :key="`query${i}`">
    <h3>{{query.brief}}</h3>
    <p>Query <span class="query">{{query.url}}</span></p>
    <p>Example: <span class="query">{{query.egs}}</span></p>
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
          brief: 'Search by Tag',
          url: '/tag/...',
          egs: '/tag/wisdom'
        },
        {
          brief: 'Search by Author',
          url: '/author/...',
          egs: '/author/tom+robbins'
        },
        {
          brief: 'Search by Title',
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

h2 {
  padding-left: 1.3em;
}

h3 {
  font-style: italic;
  text-align: left;
  letter-spacing: .2em;
  margin: 2em 0 1.4em 1.2em;
}

.query{
  background: blanchedalmond;
  font-family: 'Courier New', Courier, monospace;
}

.mainWrap {
  padding: 1em;
  max-width: 400px;
}

</style>