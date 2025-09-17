export class ArticlePage {
    constructor(page) {
        //main page authorized
        this.newArticlebutton = page.getByRole('link', { name: ' New Article' });
        this.mainPageFeed = page.getByRole('main');

        //Article page
        this.editArticleButton = page.getByRole('link', { name: ' Edit Article' }).first();
        this.deleteArticleButton = page.getByRole('button', { name: ' Delete Article' }).first();
        this.commentTextField =  page.getByRole('textbox', { name: 'Write a comment...' });
        this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
        this.deleteCommentButton = page.getByRole('button', { name: '', exact: true });
        this.articleHeadder = page.getByRole('heading');
        this.articleCommentText = page.getByRole('main');

        //NewArticlePage
        this.newArticleTitleField = page.getByRole('textbox', { name: 'Article Title' });
        this.newArticleDescriptionField = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.newArticleContentField = page.getByRole('textbox', { name: 'Write your article (in' });
        this.newArticleTagField = page.getByRole('textbox', { name: 'Enter tags' });
        this.newArticlePublishButton = page.getByRole('button', { name: 'Publish Article' });

        //EditArticlePage
        this.editArticleTitleField = page.getByRole('textbox', { name: 'Article Title' });
        this.editArticleDescriptionField = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.editArticleContentField = page.getByRole('textbox', { name: 'Write your article (in' });
        this.editArticleTagField = page.getByRole('textbox', { name: 'Enter tags' });
        this.editArticleUpdateButton = page.getByRole('button', { name: 'Update Article' });


    };

    //main page authorized
    async gotoNewArticle() {
        await this.newArticlebutton.click();
    }

    //Article page
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
    };

    //NewArticlePage
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

    //EditArticlePage
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


