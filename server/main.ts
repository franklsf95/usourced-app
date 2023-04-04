import "/imports/api/server/project_publications";

import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

const SEED_USERNAME = "root";
const SEED_PASSWORD = "root";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
