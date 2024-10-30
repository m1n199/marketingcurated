<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        size="lg"
        class="w-11 px-0 cursor-pointer data-[state=open]:bg-background"
      >
        <Icons.menu class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-60">
      <DropdownMenuItem asChild>
        <a
          class="flex justify-start items-center gap-x-2"
          href="https://mickasmt.com/"
          target="_blank"
        >
          <Icons.bookmark class="size-5" />
          <span>Collections</span>
        </a>
      </DropdownMenuItem>
      <HeroCheckbox />
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <ThemeToggle />
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <a
          class="flex justify-between items-center"
          :href="siteConfig.links.github"
          target="_blank"
        >
          <span>Github</span>
          <Icons.arrowUpRight class="size-5" />
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <a
          class="flex justify-between items-center"
          :href="siteConfig.links.twitter"
          target="_blank"
        >
          <span>Twitter</span>
          <Icons.arrowUpRight class="size-5" />
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <a
          class="flex justify-between items-center"
          href="https://mickasmt.com/"
          target="_blank"
        >
          <span>Portfolio</span>
          <Icons.arrowUpRight class="size-5" />
        </a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script>
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { siteConfig } from "@/config/site";
import ThemeToggle from "./theme-toggle";
import { HeroCheckbox } from "./hero-switcher";

export default {
  components: {
    Icons,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    ThemeToggle,
    HeroCheckbox,
  },
  data() {
    return {
      siteConfig,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>