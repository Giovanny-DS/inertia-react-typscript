export type Team = {
  id: number;
  name: string;
  personal_team: boolean;
};
export type Jetstream = {
  canLogin: boolean;
  canRegister: boolean;
  laravelVersion: string;
  phpVersion: string;
};

export type AnyArray = {
  [key: string]: number | string;
};
