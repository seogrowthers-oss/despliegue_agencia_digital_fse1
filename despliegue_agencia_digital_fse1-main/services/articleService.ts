import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from './firebase';
import { handleFirestoreError, OperationType } from './firebase';

export type ArticleSection = 'noticias' | 'recursos' | 'academia' | 'analisis';

export interface Article {
  id?: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  section: ArticleSection;
  category?: string;
  imageUrl?: string;
  author: string;
  published: boolean;
  publishedAt?: Timestamp | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const ARTICLES_COLLECTION = 'articles';

export async function createArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>, userId: string): Promise<string> {
  try {
    const now = Timestamp.now();
    const docRef = doc(collection(db, ARTICLES_COLLECTION));

    await setDoc(docRef, {
      ...article,
      author: userId,
      createdAt: now,
      updatedAt: now,
      publishedAt: article.published ? now : null,
    });

    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${ARTICLES_COLLECTION}`);
    throw error;
  }
}

export async function updateArticle(id: string, updates: Partial<Article>): Promise<void> {
  try {
    const docRef = doc(db, ARTICLES_COLLECTION, id);

    const updateData = {
      ...updates,
      updatedAt: Timestamp.now(),
    };

    if (updates.published && !updates.publishedAt) {
      updateData.publishedAt = Timestamp.now();
    }

    await updateDoc(docRef, updateData);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${ARTICLES_COLLECTION}/${id}`);
    throw error;
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const docRef = doc(db, ARTICLES_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Article;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${ARTICLES_COLLECTION}/${id}`);
    throw error;
  }
}

export async function getArticlesBySection(section: ArticleSection, publishedOnly = false): Promise<Article[]> {
  try {
    const constraints: QueryConstraint[] = [where('section', '==', section)];

    if (publishedOnly) {
      constraints.push(where('published', '==', true));
    }

    const q = query(collection(db, ARTICLES_COLLECTION), ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Article[];
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${ARTICLES_COLLECTION}?section=${section}`);
    throw error;
  }
}

export async function getArticlesByAuthor(userId: string): Promise<Article[]> {
  try {
    const q = query(collection(db, ARTICLES_COLLECTION), where('author', '==', userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Article[];
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${ARTICLES_COLLECTION}?author=${userId}`);
    throw error;
  }
}

export async function deleteArticle(id: string): Promise<void> {
  try {
    const docRef = doc(db, ARTICLES_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${ARTICLES_COLLECTION}/${id}`);
    throw error;
  }
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function checkSlugExists(slug: string, excludeId?: string): Promise<boolean> {
  try {
    const q = query(collection(db, ARTICLES_COLLECTION), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (excludeId) {
      return querySnapshot.docs.some((doc) => doc.id !== excludeId);
    }

    return querySnapshot.size > 0;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `${ARTICLES_COLLECTION}?slug=${slug}`);
    throw error;
  }
}
