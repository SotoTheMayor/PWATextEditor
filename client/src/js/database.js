import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// LMethod that accepts content and adds it to the database
export const putDb = async (content) => { 
  console.log('PUT to the database');
  
  const contactDB = await openDB('jate', 1);
  const tx = contactDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;

  console.log('data saved to database', result);
}

// Method that gets all the content from the database for display
export const getDb = async () => { 
  console.log('GET the database');
  
  const contactDB = await openDB('jate', 1);
  const tx = contactDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;

  console.log('data displayed from the database', result);
  return result?.value;
}

initdb();
