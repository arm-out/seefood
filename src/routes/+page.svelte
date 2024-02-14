<script lang="ts">
	import { apiKey } from '$lib/stores';
	import Modal from './Modal.svelte';

	let showModal = false;

	async function getCalories() {
		if ($apiKey === '') {
			alert('Please enter an API Key');
			return;
		}

		const res = await fetch('/api/see?api=' + $apiKey);
		const data = await res.json();

		if (!res.ok) {
			console.log('ERROR');
			if (data.error.status === 401) {
				alert('API Key is invalid');
			} else {
				alert('Something went wrong');
			}
			return;
		}

		console.log(data);
	}
</script>

<div>
	<header>
		<button
			on:click={() => {
				showModal = true;
			}}>API KEY</button
		>
	</header>
	<main>
		<h1>Seefood</h1>
		<button on:click={getCalories}>test</button>
	</main>
	<footer>
		<p>Made by <a href="https://github.com/arm-out">arm-out</a></p>
	</footer>
</div>

<Modal bind:showModal>
	<h2 slot="header">API Key</h2>
</Modal>
