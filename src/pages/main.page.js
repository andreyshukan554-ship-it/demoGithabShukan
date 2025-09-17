export class MainPage {
    constructor(page) {
     //страничка - драйвер (плэйрайт)
        this.signupLinkText  = page.getByRole('link', { name: 'Sign up'});

    };
    //методы (бизнес действия пользователя)
    async gotoRegister() {
        await this.signupLinkText.click();
    };

}
