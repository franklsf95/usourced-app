import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../core/firebase.js";
import { existsCompanyByName } from "./companies.js";

export const USER_ACCOUNTS_TABLE = "user_accounts";

export type UserAccount = {
  email: string;
  displayName: string;
  phoneNumber: string;
  companyName: string;
  companyWebsite: string;
  businessType: string;
};

export async function fetchUserAccount(
  uid: string,
): Promise<UserAccount | undefined> {
  const userDoc = await getDoc(doc(db, USER_ACCOUNTS_TABLE, uid));
  return userDoc.data() as UserAccount;
}

export async function updateUserAccount(
  uid: string,
  input: UserAccount,
): Promise<boolean> {
  await setDoc(doc(db, USER_ACCOUNTS_TABLE, uid), {
    email: input.email,
    displayName: input.displayName,
    phoneNumber: input.phoneNumber,
    companyName: input.companyName,
    companyWebsite: input.companyWebsite,
    businessType: input.businessType,
  });
  // TODO(@lsf): show a notice if the company name already exists
  const companyExists = await existsCompanyByName(input.companyName);
  return companyExists;
}
