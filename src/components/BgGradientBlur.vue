<template>
  <div
    class="bg-gradient-blur-wrapper"
    :class="variant"
    style="
      transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg)
        rotateY(0deg) rotateZ(132.97deg) skew(0deg, 0deg);
      transform-style: preserve-3d;
      will-change: transform;
    "
  >
    <div
      v-for="(circle, index) in circles"
      :key="index"
      :class="['bg-gradient-blur-circle', circle.size, circle.color]"
      :style="circle.style"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    variant: String,
    circles: {
      type: Array,
      default: () => [
        { color: 'bg-primary', size: 'circle-1', style: {} },
        { color: 'bg-success', size: 'circle-2', style: {} },
        { color: 'bg-info', size: 'circle-3', style: {} },
      ],
    },
  },
};
</script>
