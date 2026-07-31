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

test("Pressing <Enter> in a heading creates a new paragraph", async ({ page }) => {
  const editor = page.getByRole("textbox")
  await editor.click()
  await page.getByText("Normal").click()
  await page.getByRole("option", { name: "Heading 1" }).click()
  
  await expect(editor.locator("h1")).toHaveCount(1)
  await editor.press("Enter")
  await expect(editor.locator("p")).toHaveCount(1)
})

test("Pressing <Enter> in a non-empty bulleted list listitem creates a listitem", async ({ page }) => {
  const editor = page.getByRole("textbox")
  await editor.click()
  await page.getByText("Normal").click()
  await page.getByRole("option", { name: "Bulleted List" }).click()
  
  await expect(editor.locator("p")).toHaveCount(0)
  await expect(editor.locator("ul")).toHaveCount(1)
  await expect(editor.locator("li")).toHaveCount(1)
  await editor.pressSequentially("item 1")
  await editor.press("Enter")
  await expect(editor.locator("li")).toHaveCount(2)
})

test("Pressing <Enter> in an empty bulleted list listitem removes that list item and creates a paragraph", async ({ page }) => {
  const editor = page.getByRole("textbox")
  await editor.click()
  await page.getByText("Normal").click()
  await page.getByRole("option", { name: "Bulleted List" }).click()
  
  await expect(editor.locator("p")).toHaveCount(0)
  await expect(editor.locator("ul")).toHaveCount(1)
  await expect(editor.locator("li")).toHaveCount(1)
  await editor.press("Enter")
  await expect(editor.locator("li")).toHaveCount(0)
  await expect(editor.locator("p")).toHaveCount(1)
})

test("Pressing <Enter> in a non-empty numbered list listitem creates a listitem", async ({ page }) => {
  const editor = page.getByRole("textbox")
  await editor.click()
  await page.getByText("Normal").click()
  await page.getByRole("option", { name: "Numbered List" }).click()
  
  await expect(editor.locator("p")).toHaveCount(0)
  await expect(editor.locator("ol")).toHaveCount(1)
  await expect(editor.locator("li")).toHaveCount(1)
  await editor.pressSequentially("item 1")
  await editor.press("Enter")
  await expect(editor.locator("li")).toHaveCount(2)
})

test("Pressing <Enter> in an empty numbered list listitem removes that list item and creates a paragraph", async ({ page }) => {
  const editor = page.getByRole("textbox")
  await editor.click()
  await page.getByText("Normal").click()
  await page.getByRole("option", { name: "Numbered List" }).click()
  
  await expect(editor.locator("p")).toHaveCount(0)
  await expect(editor.locator("ol")).toHaveCount(1)
  await expect(editor.locator("li")).toHaveCount(1)
  await editor.press("Enter")
  await expect(editor.locator("li")).toHaveCount(0)
  await expect(editor.locator("p")).toHaveCount(1)
})

test("Pressing <Enter> in a quote block creates a new paragraph", async ({ page }) => {
  const editor = page.getByRole("textbox")
  await editor.click()
  await page.getByText("Normal").click()
  await page.getByRole("option", { name: "Quote" }).click()
  
  await expect(editor.locator("p")).toHaveCount(0)
  await expect(editor.locator("blockquote")).toHaveCount(1)
  await editor.press("Enter")
  await expect(editor.locator("p")).toHaveCount(1)
})

