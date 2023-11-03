<template>
  <div
    ref="iconContainer"
    class="rounded-full text-white font-bold flex justify-center items-center"
    :style="iconStyle"
  >
    <div
      class="flex justify-center items-center w-full h-full"
      :class="sizeClass"
    >
      {{ formattedCharacter }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { picasso } from '../libs/picasso';

interface IconStyle {
  overflow: string;
  background: string;
  backgroundSize: string;
  width?: string;
  height?: string;
}

export default defineComponent({
  props: {
    text: {
      type: String,
      default: '',
    },
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
      default: 'md', // Default size
      validator: (value: string) =>
        ['xs', 'sm', 'md', 'lg', 'xl', ''].includes(value),
    },
  },
  setup(props) {
    const iconStyle = ref<IconStyle>({
      overflow: 'hidden',
      background: '',
      backgroundSize: 'cover',
    });

    const formattedCharacter = computed(() => {
      return props.text.charAt(0).toUpperCase();
    });

    const sizeClass = computed(() => {
      // Map the size prop to the corresponding Tailwind text size class
      const sizeMap: { [key: string]: string } = {
        xs: 'text-xs',
        sm: 'text-lg',
        md: 'text-3xl',
        lg: 'text-4xl',
        xl: 'text-6xl',
      };
      return sizeMap[props.size] || '';
    });

    onMounted(() => {
      const svg = picasso(props.address);
      iconStyle.value.background = `no-repeat url('data:image/svg+xml;utf8,${svg}')`;

      // Set the width and height based on the size prop
      const sizeToDimensionMap: { [key: string]: string } = {
        xs: '24px',
        sm: '32px',
        md: '48px',
        lg: '64px',
        xl: '96px',
      };
      iconStyle.value.width = sizeToDimensionMap[props.size] || props.width;
      iconStyle.value.height = sizeToDimensionMap[props.size] || props.height;
    });

    return { iconStyle, formattedCharacter, sizeClass };
  },
});
</script>

<style scoped>
</style>
