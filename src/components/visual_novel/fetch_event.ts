import type { Event } from './master_types';

export const fetchEventById = async (event_id: string): Promise<Event> => {
  const url = `https://vn-prototype-backend-production.up.railway.app/story/event/${event_id}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(
        errorBody.error || `Server responded with status ${res.status}`
      );
    }

    const data = await res.json();
    return data.event as Event;
  } catch (err) {
    console.error('Error during event fetch:', err);
    throw err; // actually rethrow so the caller can deal with it
  }
};
