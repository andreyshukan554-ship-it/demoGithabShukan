import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage, RegisterPage, MainPageAthorized, NewArticlePage, ArticlePage, EditArticlePage } from '../src/pages/index';

const URL = 'https://realworld.qa.guru/';

const newArticleFields = {
    title: faker.internet.password({length: 15}),
    description: faker.lorem.words(5),
    content: faker.lorem.text(),
    tag: faker.lorem.word(5),
};

const commentText = {
    textForComment: faker.lorem.words(6),
};

test.describe('Articles e2e', () => {
    test.beforeEach( "precondition data creation (user, article, comment",async ({ page }) => {
        //preconditions
        //New user registration
        await page.goto(URL);
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);

        await mainPage.gotoRegister();
        await registerPage.register(user);

        //New article creation

        const mainPageAthorized = new MainPageAthorized(page);
        const newArticlePage = new NewArticlePage(page);

        await mainPageAthorized.gotoNewArticle();
        await newArticlePage.CreateNewArticle(newArticleFields);

    });


        test('Check created article from preconditions', async ({page,}) => {

            await expect(page.getByRole('heading')).toContainText(newArticleFields.title);
        });

        test('Article Edit', async ({page,}) => {
            const editArticleFields = {
                title: faker.lorem.slug({min: 5, max: 7}),
                description: faker.lorem.words(5),
                content: faker.lorem.text(),
                tag: faker.lorem.word(5),
            };

            const articlePage = new ArticlePage(page);
            const editArticlePage = new EditArticlePage(page);

            await articlePage.gotoEditArticlePage();
            await editArticlePage.EditArticle(editArticleFields)

            await expect(page.getByRole('heading')).toContainText(editArticleFields.title);
        });


        test('Post Comment', async ({page,}) => {

            const articlePage = new ArticlePage(page);

            await articlePage.postComment(commentText);

            await expect(page.getByRole('main')).toContainText(commentText.textForComment);
        });

        test('Article Delete', async ({page,}) => {

            const articlePage = new ArticlePage(page);

            await articlePage.deleteArticle(page);

            await expect(page.getByRole('main')).toContainText('Your Feed');
        });

        test('Comment Delete', async ({page,}) => {

            const articlePage = new ArticlePage(page);

            await articlePage.postComment(commentText);
            await articlePage.deleteComment(page);

            await expect(page.getByRole('main')).toContainText('There are no comments yet...');
        });




});

