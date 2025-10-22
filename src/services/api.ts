import { LoginRequest, LoginResponse, SearchRequest, SearchResponse, SubmitRequest } from '@/types/dto';

const USE_MOCK = true; // <-- set false when wiring real API
const BASE_URL = 'https://your-api-base-url.example.com'; // <-- replace later

export async function login(req: LoginRequest): Promise<LoginResponse> {
  if (USE_MOCK) {
    await delay(400);
    const ok = req.password === '1234';
    return { success: ok, userid: ok ? req.userid : undefined, displayName: ok ? 'Demo User' : undefined };
  }
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(req)
  });
  return res.json();
}

export async function search(req: SearchRequest): Promise<SearchResponse> {
  if (USE_MOCK) {
    await delay(300);
    return {
      funds: [
        {
          fundid: 'F01',
          fundName: 'General Fund',
          products: [
            { productId: 'P100', productName: 'Small Loan', installmentAmount: 500 },
            { productId: 'P200', productName: 'Education Loan', installmentAmount: 300 }
          ]
        },
        {
          fundid: 'F02',
          fundName: 'Savings',
          products: [
            { productId: 'S500', productName: 'Monthly Savings', installmentAmount: 200 }
          ]
        }
      ]
    };
  }
  const res = await fetch(`${BASE_URL}/collections/search`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(req)
  });
  return res.json();
}

export async function submit(payload: SubmitRequest): Promise<{ success: boolean }> {
  if (USE_MOCK) {
    await delay(250);
    console.log('SUBMIT MOCK:', JSON.stringify(payload, null, 2));
    return { success: true };
  }
  const res = await fetch(`${BASE_URL}/collections/submit`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  });
  return res.json();
}

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }
