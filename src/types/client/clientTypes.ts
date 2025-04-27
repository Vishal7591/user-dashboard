export interface APIProvider {
  data: Array<string>;
}

export interface User {
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

export interface BlogPost {
  body: string;
  id: number;
  title: string;
  userId: number;
}
