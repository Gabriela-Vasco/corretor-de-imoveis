export function useRules() {
	const required = (value?: string | null) =>
		value ? true : "Campo obrigatório";

	const email = (value?: string | null) =>
		typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
			? true
			: "O e-mail deve ser válido";

	const phone = (value?: string | null) =>
		typeof value === "string" &&
		/^\(?\+?(55)?\)?\s?(?:\(?[1-9]{2}\)?)?\s?(9?[0-9]{4})[-\s]?[0-9]{4}$|^[1-9]{2}9?[0-9]{8}$/.test(
			value,
		)
			? true
			: "O telefone deve ser válido";

	const maxLength = (max: number) => (value?: string | null) =>
		typeof value === "string" && value.length <= max
			? true
			: `Tamanho máximo atingido (${max} caracteres)`;

	const minLength = (min: number) => (value?: string | null) =>
		typeof value === "string" && value.length >= min
			? true
			: `No mínimo ${min} caracteres`;

	return {
		required,
		email,
		maxLength,
		minLength,
		phone,
	};
}
