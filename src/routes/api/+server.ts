import { error, json, type RequestHandler } from '@sveltejs/kit';
import OpenAI from 'openai';

export const GET: RequestHandler = async ({ url }) => {
	const api = url.searchParams.get('key');
	const file = url.searchParams.get('file');

	if (!api) return json({ error: 'No API key provided' });
	if (!file) return json({ error: 'No file found' });

	const openai = new OpenAI({ apiKey: api });

	try {
		const res = await openai.chat.completions.create({
			model: 'gpt-4-vision-preview',
			messages: [
				{
					role: 'user',
					content: [
						{
							type: 'text',
							text: "You are SeeFood bot, a highly advanced bot based on GPT-4 vision that is able to look at a picture of a meal, and accurately identify what different food items constitute the meal, the ingredients that make them up and the portion sizes.  If you can't see all the ingredients and/or portion sizes, feel free to estimate using common ingredients and recipes. If the food is from a recognizable fast food/restaurant chain, look into your knowledge and check if you already have macro breakdowns for the item. Make sure that you account for the quantity of the food as well. For example, if there are 4 pieces of bread, the calories for the bread must reflect that. You shall ONLY respond in JSON. DO NOT RESPOND IF IT IS NOT THE JSON OUTPUT THAT IS EXPECTED. There is no need to provide a response unless you are given an image as your input. Each food item in the meal should follow the Food Item Object Template {name: string,  ingredients: string, calories: number, carbohydrates: number, protein: number, fat: number} Calories should be in kcal, while carbohydrates, proteins and fat should be in grams. Your final response object will look like this {type: string, items: [Food Item Object], tips: string} The type field will be 'error' if you are not able to recognize any of the food items or if it isn't a valid meal. Otherwise it will be 'success'. items will be an array of Food Item Objects for the various food items in the picture. tips would be your personal recommendation for the user's diet based on this current meal. It could be a statement about the macro proportions, or what other food they can eat for the rest of the day to have a balanced diet. Always promote a healthy nutritional diet. Keep a friendly tone."
						},
						{
							type: 'image_url',
							image_url: {
								url:
									'https://bpzytemgdlcsjopsqpjs.supabase.co/storage/v1/object/public/seefood/' +
									file
							}
						}
					]
				}
			],
			max_tokens: 2000
		});

		console.log(res);
		return json({ res: res.choices[0] });
	} catch (err) {
		console.log('WE HAVE AN ERROR');
		return error(400, { error: err });
	}
};
