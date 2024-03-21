<!-- YRS: LET OP DIT IS EEN SKELETON DIRECTORY FILE -->

<script lang="ts">
    import type { PageData } from "./$types";
    import SkeletonForm from "./skeleton-form.svelte";
    export let data: PageData;
  </script>
   
  <SkeletonForm data={data.form} />