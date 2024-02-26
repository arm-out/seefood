<script lang="ts">
	import { apiKey } from '$lib/stores';

	export let showModal: boolean; // boolean

	let dialog: HTMLDialogElement; // HTMLDialogElement
	let key = $apiKey || '';

	$: if (dialog && showModal) dialog.showModal();

	function submit() {
		apiKey.set(key);
		dialog.close();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<p class="pb-5">
			Enter your Open AI API key which can be found <a
				target="_blank"
				rel="noopener noreferrer"
				class="underline underline-offset-4"
				href="https://platform.openai.com/account/api-keys">here</a
			>
		</p>

		<input
			bind:value={key}
			class="mb-5 w-full border-b"
			type="text"
			placeholder="xx-xxxxxxxxxxxxxxxxx"
		/>

		<!-- svelte-ignore a11y-autofocus -->
		<button
			autofocus
			on:click={submit}
			class="text-white bg-black px-2 py-1 rounded-md cursor-pointer text-nowrap">save</button
		>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		width: 70vw;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
