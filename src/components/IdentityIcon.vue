<template>
  <div ref="iconContainer" class="rounded-full" :style="iconStyle"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { picasso } from '@vechain/picasso';

interface IconStyle {
  overflow: string;
  background: string;
  backgroundSize: string;
  width?: string;
  height?: string;
}

export default defineComponent({
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
      validator: (value: string) => ['small', 'medium', 'large', ''].includes(value),
    },
  },
  setup(props) {
    const iconStyle = ref<IconStyle>({
      overflow: 'hidden',
      background: '',
      backgroundSize: 'cover',
    });

    onMounted(() => {
      const svg = picasso(props.address);
      iconStyle.value.background = `no-repeat url('data:image/svg+xml;utf8,${svg}')`;

      switch (props.size) {
        case 'small':
          iconStyle.value.width = '24px';
          iconStyle.value.height = '24px';
          break;
        case 'medium':
          iconStyle.value.width = '50px';
          iconStyle.value.height = '50px';
          break;
        case 'large':
          iconStyle.value.width = '80px';
          iconStyle.value.height = '80px';
          break;
        default:
          iconStyle.value.width = props.width;
          iconStyle.value.height = props.height;
          break;
      }
    });

    return { iconStyle };
  },
});
</script>

<style scoped>
</style>
