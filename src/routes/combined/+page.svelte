<!-- YRS: LET OP DIT IS EEN COMBINED FILE -->

<script lang="ts">
    import type { PageData } from "./$types";
    import CombinedForm from "./combined-form.svelte";
    export let data: PageData;
  </script>
   
  <CombinedForm data={data.form} />

