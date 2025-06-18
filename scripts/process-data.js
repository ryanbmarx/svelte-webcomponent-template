import fs from 'fs/promises';
import { csvParse } from 'd3-dsv';
import path from 'path';
import { fileURLToPath } from 'url';
import { groupBy } from 'lodash-es';

// Get current file path in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../scripts/data/interventions.csv');
const outputPath = path.join(__dirname, '../src/assets/data/interventions.json');
const outputPathFeatured = path.join(__dirname, '../src/assets/data/featuredInterventions.json');
const results = [];

async function data() {
	const file = await fs.readFile(filePath, 'utf-8');

	// Parse the csv and cherry pick the columns we want.
	const parsed = csvParse(file).map(
		({ id, sub_policy_system, policy_system, intervention, featured }) => {
			return {
				id,
				policy_system,
				sub_policy_system,
				intervention,
				featured: getFeatured(featured),
			};
		}
	);

	const featured = parsed.filter((f) => !!f.featured);

	const grouped = groupBy(parsed, 'policy_system');

	// Create a sorted version of the grouped data
	const sortedGrouped = Object.keys(grouped)
		.sort()
		.reduce((acc, key) => {
			acc[key] = grouped[key];
			return acc;
		}, {});

	// Now repeat for the combos
	const groupedCombos = groupBy(sortedGrouped.Combinations, (combo) =>
		combo['sub_policy_system'].trim()
	);

	sortedGrouped.Combinations = Object.keys(groupedCombos)
		.sort()
		.reduce((acc, key) => {
			acc[key] = groupedCombos[key];
			return acc;
		}, {});

	// Write the parsed data to JSON file
	await Promise.all([
		fs.writeFile(outputPathFeatured, JSON.stringify(featured, null, 2), 'utf-8'),
		fs.writeFile(outputPath, JSON.stringify(sortedGrouped, null, 2), 'utf-8'),
	]);

	console.log(`JSON file written successfully to: ${outputPath}`);
}

data().catch((error) => {
	console.error('Error:', error);
});

function getFeatured(val) {
	if (!val) return null;
	switch (val) {
		case '10%':
			return '10';
		case '50%':
			return '50';
		case '75%':
			return '75';
		case '100%':
			return '100';
	}
}
