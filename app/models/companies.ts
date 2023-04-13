import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../core/firebase.js";

export const COMPANIES_TABLE = "companies";

export type Company = {
  id: string;
  name: string;
};

export async function existsCompanyByName(name: string): Promise<boolean> {
  const results = await getDocs(
    query(collection(db, COMPANIES_TABLE), where("name", "==", name)),
  );
  return !results.empty;
}

export async function fetchCompanies(ids: string[]): Promise<Company[]> {
  const results = await getDocs(
    query(collection(db, COMPANIES_TABLE), where(documentId(), "in", ids)),
  );
  return results.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));
}
