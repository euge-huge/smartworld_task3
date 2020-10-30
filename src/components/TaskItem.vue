<template>
  <div class="task-item">
    <div>
      <input type="checkbox">
      <span>Купить молока</span> 
    </div>
    
    <div>
      <span>12.05.2018 12:00</span>
      <button class="btn btn-danger">&times;</button>
    </div>
  </div>
</template>

<style>
  .task-item {
    width: 80%;
    margin: 0 auto;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
</style>