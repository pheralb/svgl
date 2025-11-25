<script lang="ts">
  import { cn } from "@/utils/cn";
  import { toast } from "svelte-sonner";

  import { settingsStore } from "@/stores/settings.store";
  import SettingsCard from "@/components/settings/settingsCard.svelte";
  import SettingsIcon from "@lucide/svelte/icons/settings";

  import * as Dialog from "@/components/ui/dialog";
  import { Button, buttonVariants } from "@/components/ui/button";
  import Separator from "@/components/ui/separator/separator.svelte";

  import OptimizeSvgs from "@/components/settings/options/optimizeSvgs.svelte";
  import SelectPkgManager from "@/components/settings/options/selectPkgManager.svelte";

  const handleResetSettings = () => {
    settingsStore.reset();
    toast.success("Settings have been reset to default");
  };
</script>

<Dialog.Root>
  <Dialog.Trigger
    title="Settings"
    class={cn(
      buttonVariants({ variant: "ghost", size: "icon" }),
      "hover:bg-neutral-200 dark:hover:bg-neutral-800",
    )}
  >
    <SettingsIcon size={20} strokeWidth={1.5} />
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Settings</Dialog.Title>
      <Dialog.Description>Customize your preferences.</Dialog.Description>
    </Dialog.Header>
    <Separator />
    <div class="my-3 flex flex-col space-y-8">
      <SettingsCard
        title="Package Manager"
        description="Select your preferred package manager for all installations commands"
      >
        <SelectPkgManager />
      </SettingsCard>
      <SettingsCard
        title="Copy SVGs"
        description="Use SVGO to optimize your SVGs when you copy source code (including all frameworks)"
      >
        <OptimizeSvgs />
      </SettingsCard>
    </div>
    <Dialog.Footer>
      <Button variant="outline" onclick={handleResetSettings}>
        <span>Reset</span>
      </Button>
      <Dialog.Close class={buttonVariants({ variant: "default" })}>
        <span>Save</span>
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
