<!-- YRS: LET OP DIT IS EEN DAKOPPERVLAK DIRECTORY FILE -->

<script lang="ts">
	import type { PageData } from './$types';
	import DakoppervlakForm from './dakoppervlak-form.svelte';
	export let data: PageData;
</script>



<DakoppervlakForm data={data.form} />
