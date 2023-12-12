<script>
  import Container from '@/components/container.svelte';
  import { ArrowLeft } from 'lucide-svelte';
</script>

<Container>
  <a href="/">
    <div
      class="flex items-center space-x-2 duration-100 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-white"
    >
      <ArrowLeft size={20} />
      <span>View all</span>
    </div>
  </a>
</Container>
<slot />
