import { test, expect } from '@playwright/test'

test('page loads and displays cities with times', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: /5 O'Clock Somewhere/i }),
  ).toBeVisible()
  // There should be at least one city card (it's always 5 PM somewhere)
  const cards = page.locator('.city-card')
  await expect(cards.first()).toBeVisible()
  // Each card should show a time in h:mm AM/PM format
  const timeText = await cards.first().locator('.city-time').textContent()
  expect(timeText).toMatch(/\d{1,2}:\d{2}\s[AP]M/)
})

test('search filters the city list', async ({ page }) => {
  await page.goto('/')
  const cards = page.locator('.city-card')
  const initialCount = await cards.count()

  // Type a search query that should narrow results
  const searchBar = page.locator('.search-bar')
  await searchBar.fill('zzzzz_no_match')
  // Should show no results
  await expect(cards).toHaveCount(0)

  // Clear search should restore all results
  await searchBar.clear()
  await expect(cards).toHaveCount(initialCount)
})

test('theme toggle switches themes and persists across reload', async ({
  page,
}) => {
  await page.goto('/')

  // Default should be light
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')

  // Click toggle to switch to dark
  await page.getByRole('button', { name: /dark mode/i }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

  // Reload — should persist dark
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')

  // Toggle back to light
  await page.getByRole('button', { name: /light mode/i }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})
