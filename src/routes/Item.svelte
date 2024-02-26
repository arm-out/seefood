<script lang="ts">
	export let name: string;
	export let ingredients: string;
	export let calories: number;
	export let carbohydrates: number;
	export let protein: number;
	export let fat: number;
</script>

<div>
	<h3 class="font-bold">{name}</h3>
	<p class="italic">{ingredients}</p>
	<ul class="ml-4">
		<li>Calories: {calories} kcal</li>
		<li>Carbohydrates: {carbohydrates}g</li>
		<li>Protein: {protein}g</li>
		<li>Fat: {fat}g</li>
	</ul>
</div>
