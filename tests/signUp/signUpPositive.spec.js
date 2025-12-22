import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { SignUpPage } from "../../src/pages/SignUpPage";
import { HomePage } from "../../src/pages/HomePage";

test.describe("Sign up positive tests", () => {
  let homePage;
  let user;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);

    user = {
      username: `${faker.person.firstName()}_${faker.person.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  });

  test("Successful `Sign up` flow test", async ({ page }) => {
    const signUpPage = new SignUpPage(page);

    await signUpPage.open();
    await signUpPage.fillUsernameField(user.username);
    await signUpPage.fillEmailField(user.email);
    await signUpPage.fillPasswordField(user.password);
    await signUpPage.clickSignUpButton();

    await homePage.assertYourFeedTabIsVisible();
  });
});
