<script lang="ts">
  import { Switch } from "@/components/ui/switch";
  import { settingsStore } from "@/stores/settings.store";

  let optimize = $derived($settingsStore.optimizeSvgs);

  const handleOptimizeChange = (checked: boolean) => {
    settingsStore.setOptimizeSvgs(checked);
  };
</script>

<div class="flex items-center gap-3">
  <Switch
    id="optimize"
    checked={optimize}
    onCheckedChange={handleOptimizeChange}
  />
  <label for="optimize">Optimize SVGs</label>
</div>
