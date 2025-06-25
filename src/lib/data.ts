/**
 * @param parentId The identifier of the intervention
 * @param segment The race/income segment number (1-9)
 * @returns Promise that resolves to Response object or null
 */
export async function getInterventionData(
	interventionId: string,
	segment: number,
	percentage: string
): Promise<DataResponse | null> {
	if (!interventionId || !segment || !percentage) return null;

	const parentId = `${interventionId}.G.${percentage}`;

	const { VITE_INJECTABLE_API_URL, VITE_INJECTABLE_API_KEY } = import.meta.env;

	const response = await fetch(
		`${VITE_INJECTABLE_API_URL}?parentId=${parentId}&segment=${segment}`,
		{
			method: 'GET',
			headers: {
				'X-Api-Key': VITE_INJECTABLE_API_KEY,
				'Content-Type': 'application/json',
			},
		}
	);

	return response.json() as Promise<DataResponse>; // Don't love "as" but there isn't an easy way around it.
}
