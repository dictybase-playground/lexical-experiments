import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("/default")
})

test("Pressing <Enter> in a paragraph creates a new paragraph", async ({ page }) => {
  const editor = page.getByRole("textbox")
  await editor.press("Enter")
  await expect(editor.locator("p")).toHaveCount(2)
})

test("Pressing <Backspace> in an empty paragraph removes the paragraph", async ({ page }) => {
  const editor = page.getByRole("textbox")
  await editor.press("Enter")
  await expect(editor.locator("p")).toHaveCount(2)
  await editor.press("Backspace")
  await expect(editor.locator("p")).toHaveCount(1)
})

test("Pressing <Enter> in a Heading creates a new paragraph", async ({ page }) => {
  const editor = page.getByRole("textbox")
  await editor.click()
  await page.getByText("Normal").click()
  await page.getByRole("option", { name: "Heading 1"}).click()
  
  await expect(editor.locator("h1")).toHaveCount(1)
  await editor.press("Enter")
  await expect(editor.locator("p")).toHaveCount(1)
})
