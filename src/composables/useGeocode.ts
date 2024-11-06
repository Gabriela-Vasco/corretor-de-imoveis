export async function getCoordinates(address: string) {
	const url =
		"https://nominatim.openstreetmap.org/search?addressdetails=1&q=bakery+in+berlin+wedding&format=jsonv2&limit=1";
	// const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`;

	try {
		const response = await fetch(url);
		console.log(response);
		const data = await response.json();
		console.log(data);

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
