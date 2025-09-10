export class MainPageAthorized {
    constructor(page) {
        this.newArticlebutton = page.getByRole('link', { name: ' New Article' });
    }
    async gotoNewArticle() {
        await this.newArticlebutton.click();
    }
}