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
};


