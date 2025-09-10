export class MainPage {
    constructor(page) {
     //страничка - драйвер (плэйрайт)
        this.signupLinkText  = page.getByRole('link', { name: 'Sign up'});
        this.loginLink = page.getByRole('link', { name: 'Login'});

    }
    //методы (бизнес действия пользователя)
    async gotoRegister() {
        await this.signupLinkText.click();
    }

}

//const SUNGUP_LINK_TEXT = 'Sign up';
//await page.getByRole('link', { name: SUNGUP_LINK_TEXT}).click();