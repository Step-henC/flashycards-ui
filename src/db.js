import Dexie from "dexie";

export const db = new Dexie('newDB');
db.version(1).stores({
    deckByUser: '++id, flashyDeck, name',
    comments: '++id, comment',
})
db.open();
