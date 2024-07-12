import { env } from '$env/dynamic/public';
import { env as envPrivate } from '$env/dynamic/private';
import axios from 'axios';
import * as fs from 'fs';
import PocketBase from 'pocketbase';

const iucnApiKey = envPrivate.IUCN_token;
const pocketBaseUrl = env.PUBLIC_POCKETBASE_URL;
const collectionName = 'species';

const pb = new PocketBase(pocketBaseUrl);
// API endpoint for critically endangered species
//const speciesListUrl = `https://apiv3.iucnredlist.org/api/v3/species/category/CR?token=${iucnApiKey}`;

const amount = 1000;
const needed = 10;

// Fetch species data
async function fetchSpeciesData(controller: ReadableStreamDefaultController): Promise<any[]> {
	const fullFile = JSON.parse(fs.readFileSync('full_list.json', 'utf-8'));
	controller.enqueue(`${fullFile.length} species pulled from stored data`);
	return fullFile;
}

// Function to fetch detailed information for a species
async function getSpeciesDetails(speciesName: string): Promise<any[]> {
	const detailsUrl = `https://apiv3.iucnredlist.org/api/v3/species/${speciesName}?token=${iucnApiKey}`;
	const detailsUrl2 = `https://apiv3.iucnredlist.org/api/v3/species/narrative/${speciesName}?token=${iucnApiKey}`;

	const detailsResponse = await axios.get(detailsUrl);
	const details2Response = await axios.get(detailsUrl2);

	return [detailsResponse.data.result[0], details2Response.data.result[0]];
}

let supportedExtensions = [
	".apng",
	".png",
	".avif",
	".gif",
	".jpg",
	".jpeg",
	".jfif",
	".pjpeg",
	".pjp",
	".svg",
	".webp",
	".bmp",
	".ico",
	".cur"
];

function checkExtension(url:string) {
	return supportedExtensions.some(extension => url.endsWith(extension));
}

const gbifSearchUrl = 'https://api.gbif.org/v1/occurrence/search';
async function getImageUrl(speciesName: string): Promise<string | null> {
	const searchParams = {
		q: speciesName,
		hasCoordinate: true,
		mediaType: 'StillImage',
		limit: 1
	};

	try {
		const searchResponse = await axios.get(gbifSearchUrl, { params: searchParams });
		const searchData = searchResponse.data;

		if (searchData.results.length > 0) {
			const occurrence = searchData.results[0];
			if (occurrence.media && occurrence.media.length > 0 && checkExtension(occurrence.media[0].identifier)) {
				return occurrence.media[0].identifier || null;
			}
		}
		return null;
	} catch (error) {
		console.error('Error fetching image URL:', error);
		return null;
	}
}

function printStats(
	controller: ReadableStreamDefaultController,
	speciesDetailsList: any[],
	start: number,
	processed: number
) {
	const elapsedTime = (Date.now() - start) / 1000;
	controller.enqueue('\n');
	controller.enqueue(`${processed} species processed \n`);
	controller.enqueue(`${speciesDetailsList.length} species meet requirements \n`);
	controller.enqueue(`Elapsed time: ${elapsedTime}s\n`);
	controller.enqueue('\n');
}

async function appendToPocketBase(
	controller: ReadableStreamDefaultController,
	speciesDetails: any
) {
	try {
		// Check if species already exists
		const existingSpecies = await pb
			.collection(collectionName)
			.getFirstListItem(`scientific_name="${speciesDetails.scientific_name}"`);

		if (existingSpecies) {
			await pb.collection(collectionName).update(existingSpecies.id, { current: true });
			controller.enqueue(`Species ${speciesDetails.scientific_name} already exists in PocketBase.`);
			return;
		}
	} catch (error: any) {
		// If an error occurs during the check, it might be because the species doesn't exist
		if (error.status !== 404) {
			console.error('Error checking for existing species:', error);
			return;
		}
	}

	// If species does not exist, add it to PocketBase
	try {
		await pb.collection(collectionName).create(speciesDetails);
		controller.enqueue(`Species added to PocketBase: ${speciesDetails.scientific_name}`);
	} catch (error) {
		console.error('Error adding species to PocketBase:', error);
	}
}

async function setAllRecordsCurrentToFalse() {
	try {
		// Fetch all records
		const records = await pb.collection(collectionName).getFullList();

		// Iterate and update each record
		for (const record of records) {
			await pb.collection(collectionName).update(record.id, { current: false });
		}
	} catch (error) {
		console.error('Error updating records:', error);
	}
}

export async function startProcessing(controller: ReadableStreamDefaultController) {
	const start = Date.now();
	let processed = 0;

	let randomSpecies: any[] = [];
	let speciesDetailsList: any[] = [];
	await setAllRecordsCurrentToFalse();
	controller.enqueue('Set all current species to false \n');

	const fullJson = await fetchSpeciesData(controller);

	for (let i = 0; i < amount; i++) {
		const index = Math.floor(Math.random() * fullJson.length);
		randomSpecies.push(fullJson[index]);
	}

	//const finalJson = JSON.parse(fs.readFileSync('final.json', 'utf-8'));
	//speciesDetailsList = finalJson;

	for (const specie of randomSpecies) {
		//console.log(speciesDetailsList)
		if (speciesDetailsList.length >= needed) break;
		//console.log("this is running")
		const details = await getSpeciesDetails(specie.scientific_name);

		const speciesDetails = {
			scientific_name: specie.scientific_name,
			common_name: details[0].main_common_name,
			kingdom: details[0].kingdom || 'Unknown',
			published_year: details[0].published_year || 'Unknown',
			notes: details[1].taxonomicnotes || 'Unknown',
			rationale: details[1].rationale,
			geographicrange: details[1].geographicrange || 'Unknown',
			population: details[1].population || 'Unknown',
			populationtrend: details[1].populationtrend || 'Unknown',
			habitat: details[1].habitat || 'Unknown',
			threats: details[1].threats || 'Unknown',
			conservationmeasures: details[1].conservationmeasures || 'Unknown',
			usetrade: details[1].usetrade || 'Unknown',
			image: await getImageUrl(specie.scientific_name),
			current: true
		};

		processed += 1;

		if (speciesDetails.kingdom === 'PLANTAE') {
			controller.enqueue('\n');
			controller.enqueue("We don't like plants...\n");
			printStats(controller, speciesDetailsList, start, processed);
			controller.enqueue('\n');
			continue;
		}
		if (!speciesDetails.common_name) {
			controller.enqueue('\n');
			controller.enqueue('No common name...\n');
			printStats(controller, speciesDetailsList, start, processed);
			continue;
		}
		if (!speciesDetails.image) {
			controller.enqueue('\n');
			controller.enqueue('Missing image...\n');
			printStats(controller, speciesDetailsList, start, processed);
			continue;
		}
		if (!speciesDetails.rationale) {
			controller.enqueue('\n');
			controller.enqueue('No rationale...\n');
			printStats(controller, speciesDetailsList, start, processed);
			continue;
		}

		speciesDetailsList.push(speciesDetails);
		controller.enqueue('\n');
		//controller.enqueue(JSON.stringify(speciesDetails, null, 4));
		printStats(controller, speciesDetailsList, start, processed);

		await appendToPocketBase(controller, speciesDetails);

		fs.writeFileSync('final.json', JSON.stringify(speciesDetailsList, null, 4));
	}

	fs.writeFileSync('final.json', JSON.stringify(speciesDetailsList, null, 4));
	controller.enqueue('\nDone finding 10 random RedList species');
}

export async function selectRandomFromDB(controller: ReadableStreamDefaultController) {
	const start = Date.now();
	await setAllRecordsCurrentToFalse()
	controller.enqueue('\nSet all current species to false \n')
	const records = await pb.collection(collectionName).getFullList({expand: 'scientific_name'});
	controller.enqueue(`Fetched ${records.length} processed species from DB\n`)
	
	for (let i = 0; i < needed; i++) {
		const index = Math.floor(Math.random() * records.length);
		controller.enqueue(`Specie number ${i+1} selected: ${records[index]["scientific_name"]}\n`)
		await pb.collection(collectionName).update(records[index].id, { current: true });
	}
	const elapsedTime = (Date.now() - start) / 1000;
	controller.enqueue(`\nElapsed time: ${elapsedTime}s`)
	controller.enqueue("\nDone selecting 10 random existing species in DB\n")
}


