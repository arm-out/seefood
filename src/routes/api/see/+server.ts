import { error, json, type RequestHandler } from '@sveltejs/kit';
import OpenAI from 'openai';

export const GET: RequestHandler = async ({ url }) => {
	const api = url.searchParams.get('api');
	if (!api) return json({ error: 'No API key provided' });

	const openai = new OpenAI({ apiKey: api });
	try {
		const res = await openai.models.list();
		console.log('res', res);
		return json({ res });
	} catch (err) {
		console.log('WE HAVE AN ERROR');
		return error(400, { error: err });
	}
};
