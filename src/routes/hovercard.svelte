<!-- In deze file ga ik proberen een hover card te maken voor Protium zoals deze ook
in de Shadcn-Svelte docs wordt gemaakt, uiteindelijk Calendly NIET als Modal toegevoegd -->
    

<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar";
    import * as HoverCard from "$lib/components/ui/hover-card";
  </script>
  
  <HoverCard.Root>
    <HoverCard.Trigger
      href="https://protium.nl/contact/"
      target="_blank"
      rel="noreferrer noopener"
      class="rounded-sm text-blue-600 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
    >
      @protium.nl
    </HoverCard.Trigger>
    <HoverCard.Content class="w-auto">
      <div class="flex justify-between space-x-4">
        <Avatar.Root>
          <Avatar.Image src="/Protium Favicon Blue.png" />
          <Avatar.Fallback>SK</Avatar.Fallback>
        </Avatar.Root>
        <div class="space-y-1">
          <h4 class="text-sm font-semibold">@protium.nl</h4>
          <p class="text-sm italic">Je bent een bron van energie.</p>
          <div class="space-y-1 pt-2">
            <a href="https://maps.google.com/?q=Schweitzerlaan+12,+9728NP+Groningen" target="_blank" class="block hover:underline text-xs">
              <span class="material-symbols-outlined hovercard-icon">place</span>
              Schweitzerlaan 12, 9728NP Groningen
            </a>
            <a href="tel:050-5535052" class="block hover:underline text-xs">
              <span class="material-symbols-outlined hovercard-icon">phone</span>
              050 - 553 50 52
            </a>
            <a href="mailto:hallo@protium.nl" target="_blank" class="block hover:underline text-xs">
              <span class="material-symbols-outlined hovercard-icon">email</span>
              hallo@protium.nl
            </a>
            <a href="https://calendly.com/solarbotproject/solar-advisory-call" target="_blank" class="block hover:underline text-xs">
              <span class="material-symbols-outlined hovercard-icon">calendar_month</span>
              Afspraak maken? Klik hier!
            </a>
          </div>
        </div>
      </div>
    </HoverCard.Content>
  </HoverCard.Root>
  

