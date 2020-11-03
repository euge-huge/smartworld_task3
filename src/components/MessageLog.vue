<template>
  <div class="alert alert-info text-center" role="alert">
    <h4>{{msg}}</h4>
    <hr />
    <p>{{sub}}</p>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
    sub: String,
  }
}
</script>

<style scoped>
  .alert {
    width: 50%;
    margin: 0 auto;
  }
</style>