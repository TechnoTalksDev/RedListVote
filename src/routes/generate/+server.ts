import type { RequestHandler } from './$types';
import { env as envPrivate } from '$env/dynamic/private';
import { selectRandomFromDB, startProcessing } from '$lib/process';

export const POST: RequestHandler = async (event) => {
	try {
		let json = await event.request.json();
		
		if (json.generate == undefined || typeof json.generate != "boolean") {
			return new Response(JSON.stringify({ message: 'Missing/improper generate field' }));
		}else {
			console.log()
		}

		if (json.key != envPrivate.generate) {
			return new Response(JSON.stringify({ message: 'Invalid Authorization' }));
		}

		const readable = new ReadableStream({
			async start(controller) {
				if (json.generate) {
					await startProcessing(controller);
				}else {
					await selectRandomFromDB(controller);
				}
				controller.close()
			}
		});

		return new Response(readable, {
			headers: {
				'content-type': 'text/event-stream'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify({ message: 'Error' }));
	}
};
