<!-- YRS: LET OP DIT IS EEN FORMATTER DIRECTORY FILE -->

<script lang="ts">
    import type { PageData } from "./$types";
    import FormattingForm from "./formatting-form.svelte";
    export let data: PageData;
  </script>
   
  <FormattingForm data={data.form} />


