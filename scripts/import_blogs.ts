import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

const firebaseConfig = {
  apiKey: "AIzaSyABDaf6XW_MunjF_oLtMvD5RFJmX0xZxWo",
  authDomain: "crested-medium-314607.firebaseapp.com",
  projectId: "crested-medium-314607",
  storageBucket: "crested-medium-314607.firebasestorage.app",
  messagingSenderId: "380159937883",
  appId: "1:380159937883:web:88ab937289e54402d9de7e",
  measurementId: "",
  firestoreDatabaseId: "ai-studio-littleaffairsari-4073399e-4e15-4fc4-ab29-93722d1f2c73"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

const content = fs.readFileSync(path.resolve('postcontent.txt'), 'utf8');
const blocks = content.split('--------------------------------------------------');

const dummyImages = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504280741564-f21aeac89326?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1576774614761-a02ff6fc6bd9?auto=format&fit=crop&q=80"
];

async function importData() {
  let imgIdx = 0;
  for (const block of blocks) {
    if (!block.trim()) continue;

    const titleMatch = block.match(/TITLE:\s*(.*)/);
    const dateMatch = block.match(/DATE:\s*(.*)/);
    const contentMatch = block.match(/CONTENT:\r?\n([\s\S]*)/);

    if (titleMatch && dateMatch && contentMatch) {
      const title = titleMatch[1].trim();
      const dateStr = dateMatch[1].trim();
      const content = contentMatch[1].trim();
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      const coverImage = dummyImages[imgIdx % dummyImages.length];
      imgIdx++;
      
      console.log(`Importing: ${title}`);
      
      const docRef = doc(collection(db, 'blogs'));
      await setDoc(docRef, {
        id: docRef.id,
        title,
        slug,
        content,
        excerpt: content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        coverImage,
        author: 'Little Affair Sariska',
        status: 'published',
        createdAt: new Date(dateStr),
        updatedAt: new Date(dateStr)
      });
    }
  }
  console.log('Import done');
  process.exit(0);
}

importData().catch(console.error);
