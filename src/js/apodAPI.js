export default class Apod {
  static async getApod() {
    try {
      const apodApi = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`);
      if(!apodApi.ok) {
        throw Error(apodApi.statusText);
      }
      return apodApi.json();
    } catch (error) {
      return error.message;
    }
  }
}