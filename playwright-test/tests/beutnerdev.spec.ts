import { test, expect } from '@playwright/test';

test('homepage can navigate to blog', async ({
  page,
}) => {
  await page.goto('https://beutner.dev');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('beutner.dev');
  const navHome = page.getByRole('link', { name: 'Home' });
  const navBlog = page.getByRole('link', { name: 'Blog' });

  await expect(navHome).toHaveAttribute('aria-current', 'page');
  await expect(navHome).toHaveAttribute('href', '#main');

  await navBlog.click();

  await expect(page).toHaveURL('https://beutner.dev/blog/');
  await expect(navBlog).toHaveAttribute('href', '/blog/');
  await expect(navBlog).toHaveAttribute('aria-current', 'page');
  await expect(navBlog).toHaveAttribute('href', '#main');

  
  await expect(navHome).not.toHaveAttribute('aria-current', 'page');
  await expect(navHome).toHaveAttribute('href', '/');
  
  const article = page.getByRole('link', { name: 'About stories and tickets' });

  await expect(article).toHaveAttribute('href', '/blog/about-stories-and-tickets/');
});
