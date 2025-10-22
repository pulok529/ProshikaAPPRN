export type LoginRequest = { userid: string; password: string };
export type LoginResponse = { success: boolean; userid?: string; displayName?: string };

export type SearchRequest = { adcno: string; groupNo: string; memberId: string };

export type ProductItem = {
  productId: string;
  productName: string;
  installmentAmount: number;
};

export type Fund = {
  fundid: string;
  fundName: string;
  products: ProductItem[];
};

export type SearchResponse = { funds: Fund[] };

export type SubmitEntry = ProductItem & { fundid: string; receivedAmount: number };
export type SubmitRequest = SearchRequest & {
  userid: string;
  timestamp: string;
  entries: SubmitEntry[];
};
