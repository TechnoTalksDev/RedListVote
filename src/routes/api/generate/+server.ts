import type { RequestHandler } from './$types';
import { env as envPrivate } from '$env/dynamic/private';
import { startProcessing } from '$lib/process';

export const POST: RequestHandler = async (event) => {
	try {
		let json = await event.request.json();
		if (json.key != envPrivate.generate) {
			return new Response(JSON.stringify({ message: 'Invalid Authorization' }));
		}
		const readable = new ReadableStream({
			async start(controller) {
				await startProcessing(controller);
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
