<template>
  <div>
    <Button
      v-for="link in links"
      :key="link.path"
      variant="link"
      size="lg"
      class="px-0"
      asChild
    >
      <router-link
        :to="link.path + '/' + params.feature"
        :class="link.path === `/browse/${params.platform}` ? 'text-primary' : 'text-muted-foreground hover:text-primary'"
      >
        {{ link.name }}
      </router-link>
    </Button>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { Button } from './ui/button';

export default {
  components: {
    Button,
  },
  data() {
    return {
      links: [
        { name: 'iOS', path: '/browse/ios' },
        { name: 'Android', path: '/browse/android' },
        { name: 'Web', path: '/browse/web' },
      ],
      params: useRoute().params,
    };
  },
};
</script>

<style scoped>
.text-primary {
  /* Add your styles here */
}

.text-muted-foreground {
  /* Add your styles here */
}

.hover\:text-primary:hover {
  /* Add your styles here */
}
</style>