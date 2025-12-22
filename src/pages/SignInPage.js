export class SignInPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.getByPlaceholder("Email");
    this.passwordField = page.getByPlaceholder("Password");
    this.signInButton = page.getByRole("button", { name: "Sign in" });
    this.errorMessage = page.getByRole("list").nth(1);
  }

  async open() {
    await this.page.goto("/user/login");
  }

  async fillEmailField(email) {
    await this.emailField.fill(email);
  }

  async fillPasswordField(password) {
    await this.passwordField.fill(password);
  }

  async clickSignInButton() {
    await this.signInButton.click();
  }

  // Повертаємо текст помилки, замість assert
  async getErrorMessageText() {
    return await this.errorMessage.textContent();
  }
}
