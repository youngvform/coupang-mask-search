import api from './api';

export async function getHTML(url: string, userAgent: string) {
  const headers = {
    'User-Agent': userAgent
  };
  try {
    const { data } = await api.get(encodeURI(url));
    return data;
  } catch (err) {
    console.error('Axios ERROR: ' + err.message);
    throw new Error('Axios ERROR: ' + err.message);
  }
}
