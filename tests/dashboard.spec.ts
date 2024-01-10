import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/dashboard');
});

test('should render page dashboard', ({ page }) => {
  expect(page.url()).toContain('dashboard');
});

test('should render the multiple winners card and table', ({ page }) => {
  const cardTitle = page.getByRole('heading', {
    name: 'List year with multiple',
  });
  const list = page.getByRole('cell', { name: 'Year', exact: true }).first();
  expect(cardTitle).toBeInViewport();
  expect(list).toBeInViewport();
});

test('should render the top three winners card and table', ({ page }) => {
  const cardTitle = page.getByRole('heading', {
    name: 'Top 3 studios with winners',
  });
  const list = page.getByRole('cell', { name: 'Name' });
  expect(cardTitle).toBeInViewport();
  expect(list).toBeInViewport();
});

test('should render the producers card with min and max table', ({ page }) => {
  const cardTitle = page.getByRole('heading', {
    name: 'Producers with longest and',
  });
  const tableMaxTitle = page.getByRole('heading', { name: 'Maximum' });
  const tableMax = page.getByRole('cell', { name: 'Producer' }).first();
  const tableMinTitle = page.getByRole('heading', { name: 'Minimum' });
  const tableMin = page.getByRole('cell', { name: 'Producer' }).nth(1);
  expect(cardTitle).toBeInViewport();
  expect(tableMaxTitle).toBeInViewport();
  expect(tableMax).toBeInViewport();
  expect(tableMinTitle).toBeInViewport();
  expect(tableMin).toBeInViewport();
});

test('should render the movies winner by year card, input and table', ({
  page,
}) => {
  const cardTitle = page.getByRole('heading', {
    name: 'List movie winners by year',
  });
  const input = page.getByPlaceholder('Search by year');
  const button = page.getByRole('button', { name: 'Search' });
  const tableMinTitle = page.getByRole('cell', { name: 'id' });
  expect(cardTitle).toBeInViewport();
  expect(input).toBeInViewport();
  expect(button).toBeInViewport();
  expect(tableMinTitle).toBeInViewport();
});

test('should search a movie', async ({ page }) => {
  const input = page.getByPlaceholder('Search by year');
  input.click();
  input.fill('2018');
  const button = page.getByRole('button', { name: 'Search' });
  button.click();
  await page.waitForTimeout(2000);
  const movie = page.getByRole('cell', { name: 'Holmes & Watson' });
  expect(movie).toBeInViewport();
});
