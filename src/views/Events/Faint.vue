<script setup lang="ts">
import ApiTable from "@/components/ApiTable/ApiTable.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
  <ApiTable name="act.faint" />
  <router-link to="/event/faint/add">
    <button class="add-btn btn btn-secondary">
      <font-awesome-icon icon="plus" />
    </button>
  </router-link>
</template>

<style scoped lang="scss">
.add-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 60px;
  height: 60px;
  border-radius: 10em;
  font-size: 20px;
  color: #fff;
}
</style>