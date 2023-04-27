import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../core/firebase.js";

export const NEWSLETTER_SUBSCRIBERS_COL = "newsletter_subscribers";

export async function addNewsletterSubscriber(
  email: string,
  funnel?: string,
): Promise<void> {
  await setDoc(doc(collection(db, NEWSLETTER_SUBSCRIBERS_COL), email), {
    email,
    funnel,
    created_at: new Date(),
  });
}
