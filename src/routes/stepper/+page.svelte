<!-- YRS: LET OP DIT IS EEN STEPPER DIRECTORY FILE -->

<script lang="ts">
    import type { PageData } from "./$types";
    import StepperForm from "./stepper-form.svelte";
    export let data: PageData;
  </script>
   
  <StepperForm data={data.form} />


