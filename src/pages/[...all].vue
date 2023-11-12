<template>
  <div>
    <bg-gradient-blur variant="big notfound"></bg-gradient-blur>
    <div class="relative pt-20">
      <div class="text-center md:pt-10 mb-8">
        <div class="text-8xl font-semibold text-main mb-8">
          {{ $t('pages.title_all') }}
        </div>
        <div class="text-2xl font-bold my-2">{{ $t('pages.tag_all') }}</div>
        <div class="text-base">
          {{ $t('pages.description_all') }}
        </div>
      </div>
      <div class="misc-avatar w-full text-center">
        <RouterLink to="/" class="btn btn-md btn-primary mt-4">
          {{ $t('pages.btn_index') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
</route>
