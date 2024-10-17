<template>
	<div class="bg-primary d-flex align-center justify-center">
		<div
			class="d-flex align-center justify-center ga-16 py-16"
			style="width: 1047px"
		>
			<v-img :src="ProfileImage" width="374px" />

			<div class="about-text d-flex flex-column ga-5">
				<p>
					Olá, sou Lelis Magno, corretor de imóveis especializado em propriedades de
					médio e alto padrão em Florianópolis, SC. Com uma atuação sólida no
					mercado, ajudo meus clientes a encontrarem o imóvel ideal, seja para morar
					ou investir, sempre com um olhar atento aos detalhes e às necessidades
					individuais de cada um.
				</p>

				<p>
					Meu foco está em oferecer um atendimento personalizado, construindo uma
					relação de confiança e transparência do início ao fim do processo.
					Florianópolis é uma cidade única, e eu conheço bem cada uma de suas
					regiões, podendo orientar você a fazer a melhor escolha com base no seu
					estilo de vida e expectativas.
				</p>

				<p>
					Seja para encontrar sua nova residência, seu imóvel de veraneio ou uma
					oportunidade de investimento, você pode contar com minha experiência para
					guiar você com segurança e tranquilidade.
				</p>

				<p class="font-weight-bold">
					Vamos juntos transformar seu sonho em realidade!
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import ProfileImage from "@/assets/images/profile-image.png";
</script>

<style lang="scss" scoped>
.about-text {
	text-align: justify;
}
</style>
