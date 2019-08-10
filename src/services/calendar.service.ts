export default {
  async getAllCalendars() {
    try {
      const res = await fetch('/api/calendar/all');
      const { data, errno } = await res.json();
      if (errno !== 0) {
        throw Error('Fetch calendar api error');
      }
      return data;
    } catch (err) {
      return [];
    }
  },
};
