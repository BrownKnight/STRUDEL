import { AnalyticsItems } from "./AnalyticsItems.js";
import { Fixture } from "./Fixture.js";
import { Prediction } from "./Prediction.js";
import { Team } from "./Team.js";
import { UserLogin } from "./UserLogin.js";

export type AnyEntity = Fixture | Prediction | Team | UserLogin | AnalyticsItems;

export function sanitiseEntity<T extends AnyEntity>(entity: T): Partial<T> {
  entity.dateModified = undefined;

  if (typeContains<UserLogin>(entity, "password")) {
    entity.password = undefined;
  }

  if (typeContains<UserLogin>(entity, "password")) {
    entity.token = undefined;
  }

  return entity;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function typeContains<T>(obj: any, key: string): obj is T {
  return key in obj;
}
