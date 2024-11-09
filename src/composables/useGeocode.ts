export async function getCoordinates(address: string) {
	const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		if (data && data.length > 0) {
			return {
				lat: parseFloat(data[0].lat),
				lon: parseFloat(data[0].lon),
			};
		}
	} catch (error) {
		console.error("Error fetching geocode:", error);
	}

	return null;
}
