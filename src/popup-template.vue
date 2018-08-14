<template>
  <div class="m-popup">
    <transition name="popup-fade">
    <div class="m-popup-wrapper" v-if="show"></div>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false
    }
  }
}
</script>
