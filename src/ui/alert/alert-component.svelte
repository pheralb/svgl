<script lang="ts">
  import { cn } from '@/utils/cn';
  import { AlertTriangleIcon, CheckCircleIcon, InfoIcon, XCircleIcon } from 'lucide-svelte';

  type iAlertType = 'success' | 'error' | 'warning' | 'info';

  export let type: iAlertType = 'info';

  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: AlertTriangleIcon,
    info: InfoIcon
  };
</script>

<div
  class={cn(
    'flex items-center space-x-3 rounded-lg border px-3 py-2 text-sm dark:border-gray-700/20 dark:text-gray-200',
    type === 'success' &&
      'border-emerald-600/20 bg-emerald-100/50 text-emerald-900 selection:bg-emerald-500/20 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200 dark:selection:bg-emerald-500/30',
    type === 'error' &&
      'border-red-600/20 bg-red-100/50 text-red-900 selection:bg-red-500/20 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200 dark:selection:bg-red-500/30',
    type === 'warning' &&
      'border-yellow-600/20 bg-yellow-100/50 text-yellow-900 selection:bg-yellow-500/20 dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-200 dark:selection:bg-yellow-500/30',
    type === 'info' &&
      'border-blue-600/20 bg-blue-100/50 text-blue-900 selection:bg-blue-500/20 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200 dark:selection:bg-blue-500/30'
  )}
>
  {#if icons[type]}
    <svelte:component this={icons[type]} class="flex-shrink-0" size={16} />
  {/if}
  <div>
    <slot />
  </div>
</div>
