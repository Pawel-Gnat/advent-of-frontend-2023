import { conductInterviews } from './index';

test('conduct interviews without skipping any subject', async () => {
  const subjects = ['Team', 'Route', 'Calendar'];
  const interview = jest.fn((message: string) => Promise.resolve(`Discussed: ${message}`));
  const result = await conductInterviews(subjects, interview, 200);
  expect(result).toEqual(['Discussed: Team', 'Discussed: Route', 'Discussed: Calendar']);

  expect(interview).toHaveBeenCalledTimes(3);
});

test('cancel interviews that exceed time constraints', async () => {
  const subjects = ['Team', 'Offseason', 'Calendar'];
  const interview: jest.Mock<Promise<string>, [string]> = jest.fn((message: string) =>
    message.startsWith('Offseason')
      ? new Promise((resolve) => setTimeout(() => resolve(`${message}`), 200))
      : Promise.resolve(`Discussed: ${message}`)
  );
  const result = await conductInterviews(subjects, interview, 100);
  expect(result).toEqual(['Discussed: Team', 'Error: Timeout', 'Discussed: Calendar']);
  expect(interview).toHaveBeenCalledTimes(3);
});

test('cancel interview when someone brings up disallowed subject', async () => {
  const subjects = ['Team', 'Grinch', 'Calendar'];
  const interview: jest.Mock<Promise<string>, [string]> = jest.fn((message: string) =>
    message === 'Grinch'
      ? Promise.reject(new Error('Subject is not allowed'))
      : Promise.resolve(`Discussed: ${message}`)
  );
  const result = await conductInterviews(subjects, interview, 100);
  expect(result).toEqual(['Discussed: Team', 'Error: Subject is not allowed', 'Discussed: Calendar']);
  expect(interview).toHaveBeenCalledTimes(3);
});
