const base = (import.meta as any).env.BASE_URL.replace(/\/$/, '');

let pf: any = null;
let pfReady = false;

export async function getPagefind(): Promise<any> {
  if (pfReady) return pf;
  try {
    pf = await import(/* @vite-ignore */ `${base}/pagefind/pagefind.js`);
    await pf.init();
    pfReady = true;
  } catch {
    pfReady = false;
    pf = null;
  }
  return pf;
}
