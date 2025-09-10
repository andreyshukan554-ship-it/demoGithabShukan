export class NewArticlePage {
    constructor(page) {
        this.newArticleTitleField = page.getByRole('textbox', { name: 'Article Title' });
        this.newArticleDescriptionField = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.newArticleContentField = page.getByRole('textbox', { name: 'Write your article (in' });
        this.newArticleTagField = page.getByRole('textbox', { name: 'Enter tags' });
        this.newArticlePublishButton = page.getByRole('button', { name: 'Publish Article' });
    };
    async CreateNewArticle(newArticleFields) {
        const {title, description, content, tag} = newArticleFields;
        await this.newArticleTitleField.click();
        await this.newArticleTitleField.fill(title);
        await this.newArticleDescriptionField.click();
        await this.newArticleDescriptionField.fill(description);
        await this.newArticleContentField.click();
        await this.newArticleContentField.fill(content);
        await this.newArticleTagField.click();
        await this.newArticleTagField.fill(tag);
        await this.newArticlePublishButton.click();
    };
};