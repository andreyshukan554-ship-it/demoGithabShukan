import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage, RegisterPage, ArticlePage, ManageArticlePage } from '../src/pages/index';

const URL = 'https://realworld.qa.guru/';

const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
};

const newArticleFields = {
    title: faker.internet.password({length: 15}),
    description: faker.lorem.words(5),
    content: faker.lorem.text(),
    tag: faker.lorem.word(5),
};

const commentText = {
    textForComment: faker.lorem.words(6),
};

test('Article Creation', async ({page,}) => {

    await page.goto(URL);

    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);

    await mainPage.gotoRegister();
    await registerPage.register(user);

    const articlePage = new ArticlePage(page);
    const manageArticlePage = new ManageArticlePage(page)

    await articlePage.gotoNewArticle();
    await manageArticlePage.CreateNewArticle(newArticleFields);

    await expect(articlePage.articleHeadder).toContainText(newArticleFields.title);
});


test.describe('Articles', () => {
    test.beforeEach( "precondition data creation (user, article)",async ({ page }) => {
        //preconditions
        //New user registration
        await page.goto(URL);

        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);

        await mainPage.gotoRegister();
        await registerPage.register(user);

        //New article creation

        const articlePage = new ArticlePage(page);
        const manageArticlePage = new ManageArticlePage(page)

        await articlePage.gotoNewArticle();
        await manageArticlePage.CreateNewArticle(newArticleFields);

    });

        test('Article Edit', async ({page,}) => {
            const editArticleFields = {
                title: faker.lorem.slug({min: 5, max: 7}),
                description: faker.lorem.words(5),
                content: faker.lorem.text(),
                tag: faker.lorem.word(5),
            };

            const articlePage = new ArticlePage(page);
            const manageArticlePage = new ManageArticlePage(page)

            await articlePage.gotoEditArticlePage();
            await manageArticlePage.EditArticle(editArticleFields)

            await expect(articlePage.articleHeadder).toContainText(editArticleFields.title);
        });


        test('Post Comment', async ({page,}) => {

            const articlePage = new ArticlePage(page);

            await articlePage.postComment(commentText);

            await expect(articlePage.articleCommentText).toContainText(commentText.textForComment);
        });

        test('Article Delete', async ({page,}) => {

            const articlePage = new ArticlePage(page);

            await articlePage.deleteArticle(page);

            await expect(articlePage.mainPageFeed).toContainText('Your Feed');
        });

        test('Comment Delete', async ({page,}) => {

            const articlePage = new ArticlePage(page);

            await articlePage.postComment(commentText);
            await articlePage.deleteComment(page);

            await expect(articlePage.articleCommentText).toContainText('There are no comments yet...');
        });
});

