import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/list');
});

test('should render page list', ({ page }) => {
  expect(page.url()).toContain('list');
});

test('should render the list of movies page card and table', ({ page }) => {
  const cardTitle = page.getByRole('heading', { name: 'List Movies' });
  const table = page.getByRole('heading', { name: 'List Movies' });
  expect(cardTitle).toBeInViewport();
  expect(table).toBeInViewport();
});

test('should can filter list of movies by input year', async ({ page }) => {
  const input = page.getByPlaceholder('Filter by year');
  input.fill('1982');
  await page.waitForTimeout(2000);
  const result = page.getByRole('cell', { name: '16' });
  expect(result).toBeInViewport();
});

test('should can change page in list of movies', async ({ page }) => {
  const button = page.getByRole('button', { name: '2' });
  button.click();
  await page.waitForTimeout(2000);
  const result = page.getByRole('cell', { name: '16' });
  expect(result).toBeInViewport();
});
