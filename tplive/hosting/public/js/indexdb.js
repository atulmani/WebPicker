import * as idb from 'idb-keyval';

export const savePostRequest = async (body: string, key: string) => {
  try {
    await idb.set(key, body);
  } catch (err) {
    // something went wrong. Send it to Sentry/bugsnag/whatever
  }
};

export const getPostRequest = async (key: string): Promise<string> => {
  try {
    const value: string = await idb.get(key);
    return value;
  } catch (err) {
    // Key does not exist. No need to log error.
    return '';
  }
};
