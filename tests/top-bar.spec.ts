import { expect, test } from '@playwright/test';

test('has top bar title', async ({ page }) => {
  await page.goto('/dashboard');

  await expect(page.getByRole('heading', { name: 'Frontend React Test' })).toBeVisible();
});

