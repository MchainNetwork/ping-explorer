
export interface MnsNames {
  name: string;
  expires: number;
  value: string;
  data: string;
  subdomains: MnsNames[];
  tld: string;
  locked: number;
}

export interface MnsBids {
  index: string;
  name: string;
  bidder: string;
  price: string;
}

export interface MnsForsale {
  name: string;
  price: string;
  owner: string;
}

export interface MnsInit {
  address: string;
  complete: boolean;
}

export interface MnsParams {
  deposit_account: string;
}


