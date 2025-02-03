import { NextResponse } from 'next/server';
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMGKIT_PUBLIC_KEY!,
  privateKey: process.env.IMGKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMGKIT_URL_ENDPOINT!,
});

/**
 * Handles the GET request to retrieve authentication parameters from ImageKit.
 *
 * @returns {Promise<NextResponse>} A promise that resolves to a JSON response containing the authentication parameters.
 */
export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
