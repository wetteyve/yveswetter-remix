import axios from 'axios';
import { z } from 'zod';
import { type Route } from './+types/download-registrations';

export const DownloadSchema = z.object({
  downloadKey: z.string().min(1, 'Key is required'),
});
export type DownloadBody = z.infer<typeof DownloadSchema>;

export const action = async ({ request }: Route.ActionArgs) => {
  // Throw an error if the request method is not POST
  if (request.method !== 'POST') {
    throw new Response('Method not allowed', { status: 405 });
  }
  // Parse and validate the request body
  const body = await request.json();
  const { success, data, error } = DownloadSchema.safeParse(body);
  if (!success) {
    throw new Response(error.message, { status: 400 });
  }
  // Throw an error if the download password is incorrect
  if (data.downloadKey !== ENV.UHT_DOWNLOAD_REGISTRATIONS_KEY) throw new Response('Forbidden', { status: 403 });

  // Fetch registrations from the UHT CMS API
  return (
    await axios
      .get(`${ENV.UHT_CMS_API}/registrations?pagination[pageSize]=200&populate[captain][populate]=*`, {
        headers: {
          Authorization: `Bearer ${ENV.UHT_CMS_SERVER_KEY}`,
        },
      })
      .catch((e: Error) => {
        console.error(e.message);
        throw Error('strapi registrations unavailable');
      })
  ).data.data;
};
