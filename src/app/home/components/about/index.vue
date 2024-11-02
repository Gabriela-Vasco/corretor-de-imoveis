<template>
	<div class="bg-primary d-flex align-center justify-center px-8">
		<div
			class="d-flex align-center justify-center aboutContainer"
			:class="isMobile ? 'flex-column ga-8 py-10' : 'ga-16 py-16'"
			:style="isMobile ? 'width: 100%' : 'max-width: 1047px'"
		>
			<v-img
				:src="ProfileImage"
				:width="isXMobile ? '250px' : isMobile ? '300px' : '374px'"
			/>

			<div class="d-flex flex-column ga-5 text-justify aboutText">
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

				<p
					class="font-weight-bold"
					:class="isMobile ? 'text-center mt-3' : 'text-start'"
				>
					Vamos juntos transformar seu sonho em realidade!
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import ProfileImage from "@/assets/images/profile-image.png";
import { useScreen } from "@/composables/useScreen";

const { isMobile, isXMobile } = useScreen();
</script>

<style lang="scss" scoped>
@media (max-width: 956px) {
	.aboutContainer {
		padding: 0 50px;
	}
}

@media (max-width: 768px) {
	.aboutContainer {
		padding: 0 20px;
	}
}

@media (max-width: 600px) {
	.aboutContainer {
		padding: 0;
	}

	.aboutText {
		font-size: 14px;
	}
}
</style>
