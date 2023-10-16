<template>
  <!-- footer -->
  <footer
    class="flex items-center h-12 mt-5 text-sm bg-gray-100 dark:bg-[#17191c] py-2 z-10 w-full"
  >
    <div class="flex flex-1 opacity-50">
      &copy;&nbsp;
      {{ new Date().getFullYear() }}&nbsp;
      Made With&nbsp;
      <a
        class="link no-underline"
        href="https://github.com/ping-pub/explorer/blob/master/LICENSE"
        target="_blank"
        rel="noopener noreferrer"
        >Ping.pub</a
      >
    </div>
    <div
      class="hidden md:!block"
    >

    </div>
  </footer>
</template>