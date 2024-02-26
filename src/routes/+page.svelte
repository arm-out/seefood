<script lang="ts">
	import { apiKey } from '$lib/stores';
	import ImageBlobReduce from 'image-blob-reduce';
	import Modal from './Modal.svelte';

	let showModal = false;
	let input: HTMLInputElement;
	let preview: HTMLImageElement;
	let previewContainer: HTMLDivElement;
	let reducedBlob: Blob;

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

	function fileChange() {
		const file = input.files![0];

		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const dataURL = reader.result as string;
				preview.src = dataURL;

				// Convert the dataURL to a Blob object
				return fetch(dataURL)
					.then((res) => res.blob())
					.then((blob) => {
						// console.log('Blob:', blob);
						new ImageBlobReduce()
							.toBlob(blob, {
								max: 500
							})
							.then((blob) => {
								// console.log('Reduced Blob:', blob);
								reducedBlob = blob;
								previewContainer.style.display = 'block';
							});
					})
					.catch((err) => {
						alert('Error selecting Image');
					});
			};

			reader.readAsDataURL(file);
			return;
		} else {
			alert('Please submit a picture');
		}
	}

	async function onUpload() {
		console.log('upload');
	}
</script>

<div class="flex flex-col p-6 pt-6 min-h-[100dvh] max-w-7xl mx-auto">
	<header class="flex flex-row justify-between w-full h-8">
		<a href="https://arminsuraj.com" target="_blank"
			><svg class="h-4/5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145 129" fill="none">
				<path
					d="M133.509 105.937C130.397 105.937 127.704 107.078 125.43 109.361C123.156 111.643 122.019 114.346 122.019 117.469C122.019 120.592 123.156 123.294 125.43 125.577C127.704 127.859 130.397 129 133.509 129C136.621 129 139.315 127.859 141.589 125.577C143.863 123.294 145 120.592 145 117.469C145 114.346 143.863 111.643 141.589 109.361C139.315 107.078 136.621 105.937 133.509 105.937Z"
					fill="#30302F"
				/>
				<path
					d="M78.04 128.767C84.5833 128.767 90.2487 127.566 95.0365 125.164C99.8242 122.601 103.495 119.078 106.048 114.593C108.442 110.109 109.639 104.904 109.639 98.9778C109.639 91.9309 108.043 86.1652 104.851 81.6807C101.5 77.1963 97.2707 73.5927 92.1638 70.87C87.0569 68.1473 81.7106 65.9051 76.1249 64.1434C70.3797 62.2215 64.9536 60.4598 59.8466 58.8582C54.7397 57.0964 50.5904 55.0945 47.3985 52.8522C44.0471 50.61 42.3714 47.6471 42.3714 43.9635V29.0687C42.3714 22.3421 43.4088 17.217 45.4834 13.6935C47.3985 10.1701 50.0318 7.84776 53.3832 6.72665C56.7346 5.44539 60.485 4.80476 64.6344 4.80476C68.6241 4.80476 72.9331 5.36531 77.5612 6.48641C82.0298 7.60752 85.6206 9.92982 88.3336 13.4533C85.3014 14.0939 82.6682 15.6955 80.4339 18.2581C78.1996 20.8206 77.0825 24.1038 77.0825 28.1078C77.0825 32.1117 78.3592 35.3149 80.9127 37.7173C83.4661 39.9595 86.7377 41.0806 90.7275 41.0806C95.3557 41.0806 98.7869 39.6392 101.021 36.7563C103.096 33.7133 104.133 30.35 104.133 26.6664C104.133 22.5022 103.096 19.1389 101.021 16.5764C98.9464 14.0139 96.3132 11.6115 93.1214 9.36927C89.4508 6.80673 84.7428 4.64459 78.9976 2.88285C73.0927 0.960952 66.4697 0 59.1285 0C52.5853 0 46.9996 0.800791 42.3714 2.40237C37.7433 3.8438 33.9131 6.00594 30.8809 8.88879C26.7315 12.7326 24.0184 17.4573 22.7417 23.0628C21.465 28.5082 20.8266 35.0747 20.8266 42.7623V109.548C20.8266 113.552 20.2681 116.435 19.1509 118.197C17.8742 119.959 15.9591 120.839 13.4056 120.839C11.6501 120.839 9.97444 120.439 8.37853 119.638C6.78262 118.837 4.86752 117.556 2.63325 115.794L0 119.878C3.35141 122.441 6.54323 124.603 9.57546 126.365C12.6077 127.966 16.6773 128.767 21.7842 128.767C26.4123 128.767 30.2425 127.966 33.2747 126.365C36.307 124.763 38.621 122.441 40.2169 119.398C41.6533 116.195 42.3714 112.191 42.3714 107.386C46.6804 114.593 51.8671 119.959 57.9315 123.482C63.8364 127.006 70.5392 128.767 78.04 128.767ZM69.4221 119.158C64.1556 119.158 59.2881 117.636 54.8195 114.593C50.1914 111.55 46.042 106.986 42.3714 100.9V53.8132C44.2865 56.5359 47.0794 58.8582 50.7499 60.7801C54.4205 62.5418 58.4103 64.3836 62.7193 66.3055C67.0282 68.0673 71.1776 70.2294 75.1674 72.7919C78.9976 75.1943 82.1894 78.3975 84.7428 82.4014C87.2963 86.4054 88.573 91.6105 88.573 98.0169C88.573 104.423 86.8973 109.548 83.5459 113.392C80.0349 117.236 75.327 119.158 69.4221 119.158Z"
					fill="#30302F"
				/>
			</svg></a
		>
		<button
			class="w-auto"
			on:click={() => {
				showModal = true;
			}}>API KEY</button
		>
	</header>
	<main class="flex flex-col items-center mt-auto gap-y-12">
		<div class="flex flex-col items-center w-[80ch] max-w-full">
			<h1 class="font-bold text-center flex flex-col flex-wrap justify-center leading-[1.2]">
				<span class="block uppercase bold opacity-50">SeeFood</span>
				<span class="text-4xl sm:text-5xl font-dm tracking-tighter"
					>Snap, eat and track your calories
				</span>
			</h1>
		</div>
		<div>
			<input
				bind:this={input}
				type="file"
				accept="image/*"
				class="hidden"
				id="file"
				on:change={fileChange}
			/>

			<p class="leading-9 text-center">
				<label
					for="file"
					class="text-white bg-black px-4 py-2 rounded-md h-9 cursor-pointer text-nowrap"
				>
					Choose or snap
				</label>
				a photo of your meal to start!
			</p>

			<div bind:this={previewContainer} class="hidden">
				<img bind:this={preview} src="" alt="preview" />
				<button on:click={getCalories}>upload</button>
			</div>
		</div>
	</main>

	<footer class="flex items-center justify-center mt-auto">
		<p>
			Made by <a href="https://github.com/arm-out" target="_blank"
				>arm-out<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 pl-1 pb-[2px] inline"
					x="0px"
					y="0px"
					viewBox="0 0 30 30"
				>
					<path
						d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"
					></path>
				</svg></a
			>
		</p>
	</footer>
</div>

<Modal bind:showModal>
	<h2 slot="header" class="font-bold pb-2">API Key</h2>
</Modal>
