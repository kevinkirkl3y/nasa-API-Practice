export default class Nasa {
  static async getMarsWeather() {
    try {
      const marsWeather = await fetch(`https://api.nasa.gov/insight_weather/?api_key=${process.env.API_KEY}&feedtype=json&ver=1.0`);
      if(!marsWeather.ok) {
        throw Error(marsWeather.statusText);
      }
      return marsWeather.json();
    } catch (error) {
      return error.message;
    }
  }
}