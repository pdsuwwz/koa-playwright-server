export default class HomeService {
  hello = (): Promise<unknown> => {
    return new Promise((resolve) => resolve({
      say: {
        hello: 'Hello, Playwright Server',
        date: new Date(),
      },
    }))
  }
}
