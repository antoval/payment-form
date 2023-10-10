import { test, expect } from '@playwright/experimental-ct-react';
import App from './App';

test.use({ viewport: { width: 500, height: 500 } });

test('It should contain Send Money header', async ({ mount }) => {
  const app = await mount(<App />);
  await expect(app).toContainText('Send Money');
});

test('It should not allow smaller amount than 0.01', async ({ mount, page }) => {
  const app = await mount(<App />);
  const amountField = await page.getByLabel('Amount');
  await amountField.fill('0.001');
  await expect(app).toContainText('Amount should be at least 0.01');
});

test('It should impose minimum limit on the purpose field', async ({ mount, page }) => {
  const app = await mount(<App />);
  const purposeField = await page.getByLabel('Purpose');
  await purposeField.fill('AA');
  await purposeField.blur();
  await expect(app).toContainText('Purpose should be at least');
});

test('It should disallow incorrect account numbers', async ({ mount, page }) => {
  const app = await mount(<App />);
  const payeeAccount = await page.getByLabel('Payee Account');
  await payeeAccount.fill('LT123');
  await payeeAccount.blur();
  await expect(app).toContainText('Invalid Account Number');
});
