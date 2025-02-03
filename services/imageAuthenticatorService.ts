import axios from 'axios';

export default async function authenticator() {
  // Fetch the authentication parameters from the server
  const { data } = await axios.get('/api/imagekit_auth');

  return data;
}
