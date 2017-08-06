import { MessagesPage } from './app.po';

describe('messages App', () => {
  let page: MessagesPage;

  beforeEach(() => {
    page = new MessagesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
