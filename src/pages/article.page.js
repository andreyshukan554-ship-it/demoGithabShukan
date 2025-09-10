export class ArticlePage {
    constructor(page) {
        this.editArticleButton = page.getByRole('link', { name: ' Edit Article' }).first();
        this.deleteArticleButton = page.getByRole('button', { name: ' Delete Article' }).first();
        this.commentTextField =  page.getByRole('textbox', { name: 'Write a comment...' });
        this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
        this.deleteCommentButton = page.getByRole('button', { name: '', exact: true });
    };
    async gotoEditArticlePage() {
        await this.editArticleButton.click();
    };
    async deleteArticle(page) {
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept();
        });
        await this.deleteArticleButton.click()
    };
    async postComment(commentText) {
        const {textForComment} = commentText;
        await this.commentTextField.click();
        await this.commentTextField.fill(textForComment);
        await this.postCommentButton.click();
    };
    async deleteComment(page) {
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept();
        });
        await this.deleteCommentButton.click();
    }
};
