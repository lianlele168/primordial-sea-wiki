import { expect, test } from "@playwright/test";

test("home, search, planner, and images work", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Primordial Sea" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Open Merge Planner/i })).toBeVisible();

  const searchButton = page.getByRole("button", { name: "Search the guide" });
  await searchButton.click();
  await page.getByPlaceholder("Search evolution, items, hidden disks...").fill("enemy");
  await expect(page.getByRole("link", { name: /Primordial Sea Enemy Mode Guide/i })).toBeVisible();
  await page.keyboard.press("Escape");

  await page.getByLabel("Current body").selectOption("2");
  await page.getByLabel("Target body").selectOption("9");
  await page.getByLabel("Current bodies at the starting tier").fill("3");
  await expect(page.getByText("128", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("125", { exact: true }).first()).toBeVisible();

  const galleryHeading = page.getByRole("heading", { name: "See the gravity disk before you play" });
  await galleryHeading.scrollIntoViewIfNeeded();
  const galleryImages = page.locator(".screenshot-feature img");
  await expect(galleryImages).toHaveCount(2);
  await expect.poll(async () => galleryImages.first().evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  await expect.poll(async () => galleryImages.nth(1).evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  expect(errors).toEqual([]);

  await page.screenshot({ path: `.review/home-${testInfo.project.name}-viewport.png` });
});

test("all indexed routes return rendered pages", async ({ page }) => {
  const routes = [
    ["/play/", "Play Primordial Sea Online"],
    ["/merge-planner/", "Primordial Sea Merge Planner"],
    ["/evolution-chain/", "Primordial Sea Evolution Chain"],
    ["/beginner-guide/", "Primordial Sea Beginner Guide"],
    ["/hidden-disks/", "Primordial Sea Hidden Disks Guide"],
    ["/enemy-mode/", "Primordial Sea Enemy Mode Guide"],
    ["/items-guide/", "Primordial Sea Items Guide"],
    ["/updates/", "Primordial Sea Updates and Sources"],
    ["/about/", "About Primordial Sea Guide"],
    ["/privacy-policy/", "Privacy Policy"],
    ["/terms/", "Terms of Use"],
  ];

  for (const [route, heading] of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expect(page.locator('meta[name="robots"][content="noindex"]')).toHaveCount(0);
  }

  const sitemapResponse = await page.goto("/sitemap.xml");
  expect(sitemapResponse?.status()).toBe(200);
});

test("planner page has stable controls and no horizontal overflow", async ({ page }, testInfo) => {
  await page.goto("/merge-planner/");
  await expect(page.getByRole("heading", { level: 1, name: "Primordial Sea Merge Planner" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy merge plan" })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: `.review/planner-${testInfo.project.name}-viewport.png` });
});

test("official browser game frame resolves", async ({ page }) => {
  await page.goto("/play/");
  const iframe = page.getByTitle("Play Primordial Sea");
  await iframe.scrollIntoViewIfNeeded();
  await expect(iframe).toBeVisible();
  await expect(iframe).toHaveAttribute("src", /html-classic\.itch\.zone/);

  const gameFrame = page.frameLocator('iframe[title="Play Primordial Sea"]');
  await expect(gameFrame.locator("body")).toBeVisible({ timeout: 20_000 });
});
