import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage, RegisterPage, MainPageAthorized, NewArticlePage, ArticlePage, EditArticlePage } from '../src/pages/index';

const URL = 'https://realworld.qa.guru/';

test.describe('Articles e2e', () => {
    test.beforeEach( "New user registration",async ({ page }) => {
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
//проверка что пользователь зарегестрирован
        await expect(page.getByRole('navigation')).toContainText(user.name);
    });

    test.describe('Articles', () => {
        test.beforeEach('New Article creation', async ({page,}) => {
            const newArticleFields = {
                title: faker.lorem.words(3),
                description: faker.lorem.words(5),
                content: faker.lorem.text(),
                tag: faker.lorem.word(5),
            };

            const mainPageAthorized = new MainPageAthorized(page);
            const newArticlePage = new NewArticlePage(page);

            await mainPageAthorized.gotoNewArticle();
            await newArticlePage.CreateNewArticle(newArticleFields)

            await expect(page.getByRole('heading')).toContainText(newArticleFields.title);
        });

        test.beforeEach('Article Edit', async ({page,}) => {
            const editArticleFields = {
                title: faker.lorem.words(3),
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


        test.beforeEach('Post Comment', async ({page,}) => {
            const commentText = {
                textForComment: faker.lorem.words(6),
            };

            const articlePage = new ArticlePage(page);

            await articlePage.postComment(commentText);

            await expect(page.getByRole('main')).toContainText(commentText.textForComment);
        });

        test.beforeEach('Comment Delete', async ({page,}) => {

            const articlePage = new ArticlePage(page);

            await articlePage.deleteComment(page);

            await expect(page.getByRole('main')).toContainText('There are no comments yet...');
        });

        test('Article Delete', async ({page,}) => {

            const articlePage = new ArticlePage(page);

            await articlePage.deleteArticle(page);

            await expect(page.getByRole('main')).toContainText('Your Feed');
        });

    });

});

