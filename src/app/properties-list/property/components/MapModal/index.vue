<template>
	<v-dialog v-model="model" opacity="0.7" width="auto">
		<v-sheet class="pa-5" color="light">
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.1978078804373!2d-43.17939332382842!3d-22.906073737847194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f5fd24e0bdd%3A0x99447fc2607f1de1!2sFaculdade%20Infnet%20-%20Faculdade%20de%20Engenharia%20de%20Software%2C%20Engenharia%20da%20Computa%C3%A7%C3%A3o%2C%20Engenharia%20de%20Dados%20e%20IA%20%7C%20MBA%20e%20P%C3%B3s%20em%20TI!5e0!3m2!1spt-BR!2sbr!4v1730508467839!5m2!1spt-BR!2sbr"
				width="800"
				height="600"
				style="border: 0"
				:allowfullscreen="true"
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</v-sheet>
	</v-dialog>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();
</script>

<style scoped></style>
