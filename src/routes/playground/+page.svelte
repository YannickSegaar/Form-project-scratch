<!-- YRS: LET OP DIT IS EEN PLAYGROUND DIRECTORY FILE -->

<script lang="ts">
  import type { PageData } from "./$types";
  import PlaygroundForm from "./playground-form.svelte";
  export let data: PageData;
</script>
 
<PlaygroundForm data={data.form} />


