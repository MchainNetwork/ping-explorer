<template>
  <div ref="iconContainer" class="rounded-full" :style="iconStyle"></div>
</template>

<script>
import { picasso } from '@vechain/picasso';

export default {
  data() {
    return {
      iconStyle: {
        overflow: 'hidden',
        background: '',
        backgroundSize: 'cover',
      },
    };
  },
  props: {
    address: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '200px',
    },
    height: {
      type: String,
      default: '200px',
    },
    size: {
      type: String,
      default: '',
      validator: (value) => ['small', 'medium', 'large', ''].includes(value),
    },
  },
  mounted() {
    const svg = picasso(this.address);
    this.iconStyle.background = `no-repeat url('data:image/svg+xml;utf8,${svg}')`;

    switch (this.size) {
      case 'small':
        this.iconStyle.width = '24px';
        this.iconStyle.height = '24px';
        break;
      case 'medium':
        this.iconStyle.width = '50px';
        this.iconStyle.height = '50px';
        break;
      case 'large':
        this.iconStyle.width = '80px';
        this.iconStyle.height = '80px';
        break;
      default:
        this.iconStyle.width = this.width;
        this.iconStyle.height = this.height;
        break;
    }
  },
};
</script>

<style scoped>
</style>
