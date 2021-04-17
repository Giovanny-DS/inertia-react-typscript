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
export type Tokens = [
  {
    id: number;
    name: string;
    last_used_ago: string;
    abilities: string[];
  }
];
export type Token = {
  id: number;
  name: string;
  last_used_ago: string;
  abilities: string[];
};

export type Session = {
  sessions: [
    {
      agent: {
        is_desktop: boolean;
        platform: string;
        browser: string;
      };
      ip_address: string;
      is_current_device: boolean;
      last_active: string;
    }
  ];
  props: any;
};
