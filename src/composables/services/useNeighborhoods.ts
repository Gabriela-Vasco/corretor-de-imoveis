import { useRuntimeConfig } from "nuxt/app";

export function useNeighborhoods() {
	const config = useRuntimeConfig();
	async function list() {
		const response = await fetch(
			`https://www.cmf.sc.gov.br/jsonweb/web-aplicativo.php?keysoft=${config.public.cmf_token}&call=bairros`,
		);
		const data = await response.json();

		return data.map((neighborhood: any) => neighborhood.legenda);
	}

	return {
		list,
	};
}
