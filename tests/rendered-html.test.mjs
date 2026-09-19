import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the PropFirm login", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Welcome back/);
  assert.match(html, /PropFirm login ID/);
  assert.doesNotMatch(html, /starter-preview|Your site is taking shape/);
});

test("renders the trading workspace", async () => {
  const response = await render("/trade");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /DAILY LOSS/);
  assert.match(html, /MAX LEVERAGE/);
  assert.match(html, /Buy \/ Long/);
  assert.match(html, /Account Rules/);
  assert.match(html, /Challenge limit not confirmed/);
  assert.match(html, /Futures/);
  assert.match(html, /Spot/);
});

test("renders the profile", async () => {
  const response = await render("/profile");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Your PropFirm profile/);
  assert.match(html, /Trading account/);
  assert.match(html, /Login security/);
});
