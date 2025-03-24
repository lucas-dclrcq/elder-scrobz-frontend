<template>
  <div class="home">
    <h1>Welcome to Elder Scrobz</h1>
    <p>Your personal music listening statistics dashboard</p>
    <div class="features">
      <div class="feature">
        <h2>Track Your Music</h2>
        <p>Keep track of all your music listening habits</p>
      </div>
      <div class="feature">
        <h2>View Statistics</h2>
        <p>Analyze your listening patterns and preferences</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic will go here
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.feature {
  padding: 20px;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.feature h2 {
  color: #42b983;
  margin-bottom: 10px;
}
</style> 