import { Meteor } from "meteor/meteor";

export function currentUserEmail(): string | null {
  const currentUser = Meteor.user();
  if (!currentUser) {
    return null;
  }
  const emails = currentUser.emails;
  if (!emails) {
    return null;
  }
  const email = emails[0];
  return email.address;
}
