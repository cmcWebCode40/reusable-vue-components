export type Profile = {
  avatar: { uri: string };
  name: string;
  did?: string;
  description?: string;
  country: string;
}


export type Connect = {
  logo?: string;
  contextName: string
}