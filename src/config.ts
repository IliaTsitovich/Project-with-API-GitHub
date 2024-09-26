export const API_BASE_URL = "https://api.github.com/";
export const MARGIN_PAGES_DISPLAYED = 1;
export const PAGE_RANGE_DISPLAYED = 2;

export const fetchHelper = async (url: string, options = {}) => {
	try {
		const response = await fetch(url, options);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("An error occurred:", error);
		throw error;
	}
};
