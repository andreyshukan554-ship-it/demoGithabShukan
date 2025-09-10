export class EditArticlePage {
    constructor(page) {
        this.editArticleTitleField = page.getByRole('textbox', { name: 'Article Title' });
        this.editArticleDescriptionField = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.editArticleContentField = page.getByRole('textbox', { name: 'Write your article (in' });
        this.editArticleTagField = page.getByRole('textbox', { name: 'Enter tags' });
        this.editArticleUpdateButton = page.getByRole('button', { name: 'Update Article' });
    };
    async EditArticle(editArticleFields) {
        const {title, description, content, tag} = editArticleFields;
        await this.editArticleTitleField.click();
        await this.editArticleTitleField.fill(title);
        await this.editArticleDescriptionField.click();
        await this.editArticleDescriptionField.fill(description);
        await this.editArticleContentField.click();
        await this.editArticleContentField.fill(content);
        await this.editArticleTagField.click();
        await this.editArticleTagField.fill(tag);
        await this.editArticleUpdateButton.click();
    };
};