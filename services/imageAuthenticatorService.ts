/**
 * Authenticates the user by fetching authentication parameters from the server.
 *
 * @returns {Promise<any>} A promise that resolves to the authentication parameters in JSON format.
 */

type Authenticator = {
  token: string;
  signature: string;
  expire: number;
};
export default async function authenticator(): Promise<Authenticator> {
  // Fetch the authentication parameters from the server
  const response = await fetch('/api/imagekit_auth');
  const data = await response.json();

  return await data;
}
