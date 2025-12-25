import { test, expect } from "@playwright/test";
import { SignInPage } from "../../src/pages/SignInPage";

test.describe("Sign in negative tests", () => {
  let signInPage;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    await signInPage.open();
  });

  async function expectErrorToContain(text) {
    await expect
      .poll(async () => await signInPage.getErrorMessageText())
      .toContain(text);
  }

  test("Assert error message for empty password", async () => {
    await signInPage.fillEmailField("test@gmail.com");
    await signInPage.clickSignInButton();

    await expectErrorToContain("password:can't be blank");
  });

  test("Assert error message for empty email", async () => {
    await signInPage.fillPasswordField("newpass123!");
    await signInPage.clickSignInButton();

    await expectErrorToContain("email:can't be blank");
  });

  test("Assert error message for wrong password", async () => {
    await signInPage.fillEmailField("test@gmail.com");
    await signInPage.fillPasswordField("1");
    await signInPage.clickSignInButton();

    await expectErrorToContain("email or password:is invalid");
  });

  test("Invalid login shows error", async () => {
    await signInPage.fillEmailField("wrong@example.com");
    await signInPage.fillPasswordField("wrongpass");
    await signInPage.clickSignInButton();

    await expectErrorToContain("email or password:is invalid");
  });
});
