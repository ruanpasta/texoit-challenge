import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/dashboard');
})

test('should render the menu compontent', ({ page }) => {
  const element = page.getByTestId('menu');
  expect(element).toBeInViewport();
})

test('should render the menu dashboard and list', ({ page }) => {
  const list = page.getByRole('link', { name: 'List' });
  const dashboard = page.getByRole('link', { name: 'Dashboard' });
  expect(list).toBeVisible();
  expect(dashboard).toBeVisible();
})

test('should navigate when click in menu list and dashboard', async ({ page }) => {
  await page.getByRole('link', { name: 'List' }).click();
  await page.waitForURL('/list');
  expect(page.url()).toContain('list');
  expect(page.url()).not.toContain('dashboard');

  await page.getByRole('link', { name: 'Dashboard' }).click();
  await page.waitForURL('/dashboard');
  expect(page.url()).toContain('dashboard');
  expect(page.url()).not.toContain('list');
})