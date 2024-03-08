<!-- In deze file ga ik proberen een hover card te maken voor Protium zoals deze ook
in de Shadcn-Svelte docs wordt gemaakt -->

<script lang="ts">
    import Calendar from "svelte-radix/Calendar.svelte";
    // import { MouseEvent } from 'svelte';
    import * as Avatar from "$lib/components/ui/avatar";
    import { writable } from "svelte/store";
    import * as HoverCard from "$lib/components/ui/hover-card";
    import Modal from "./Modal.svelte"; // Assuming you have a Modal component

      // Store for modal visibility
  let showModal = writable(false);

// Function to toggle modal visibility
function toggleModal(event: MouseEvent) {
  event.preventDefault();
  showModal.update(v => !v);
}

  </script>
   
  <HoverCard.Root>
    <HoverCard.Trigger
    class="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
    on:click={toggleModal}
  >
    Afspraak maken? Klik hier!
  </HoverCard.Trigger>
    <HoverCard.Content class="w-80">
      <div class="flex justify-between space-x-4">
        <Avatar.Root>
          <Avatar.Image src="/Protium_logo.png" />
          <Avatar.Fallback>SK</Avatar.Fallback>
        </Avatar.Root>
        <div class="space-y-1">
          <h4 class="text-sm font-semibold">@protium.nl</h4>
          <p class="text-sm">Cybernetically enhanced web apps.</p>
          <div class="flex items-center pt-2">
            <Calendar class="mr-2 h-4 w-4 opacity-70" />{" "}
            <span class="text-xs text-muted-foreground">
              Joined September 2022
            </span>
          </div>
        </div>
      </div>
    </HoverCard.Content>
  </HoverCard.Root>
  
  <Modal bind:visible={$showModal}>
    <iframe title="Protium adviesgesprek" src="https://calendly.com/solarbotproject/solar-advisory-call" width="100%" height="100%"></iframe>
  </Modal>
  
<!-- YRS HOVERCARD FOR SVELTE FROM SHADCN-DOCS
    
    <script lang="ts">
    import Calendar from "svelte-radix/Calendar.svelte";
    import * as Avatar from "$lib/components/ui/avatar";
    import * as HoverCard from "$lib/components/ui/hover-card";
  </script>
   
  <HoverCard.Root>
    <HoverCard.Trigger
      href="https://github.com/sveltejs"
      target="_blank"
      rel="noreferrer noopener"
      class="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
    >
      @sveltejs
    </HoverCard.Trigger>
    <HoverCard.Content class="w-80">
      <div class="flex justify-between space-x-4">
        <Avatar.Root>
          <Avatar.Image src="https://github.com/sveltejs.png" />
          <Avatar.Fallback>SK</Avatar.Fallback>
        </Avatar.Root>
        <div class="space-y-1">
          <h4 class="text-sm font-semibold">@sveltejs</h4>
          <p class="text-sm">Cybernetically enhanced web apps.</p>
          <div class="flex items-center pt-2">
            <Calendar class="mr-2 h-4 w-4 opacity-70" />{" "}
            <span class="text-xs text-muted-foreground">
              Joined September 2022
            </span>
          </div>
        </div>
      </div>
    </HoverCard.Content>
  </HoverCard.Root>

   -->
