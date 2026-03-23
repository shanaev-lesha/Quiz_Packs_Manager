import { createPackSchema } from '../src/resources/questionPack/validators/httpSchemas.js';

describe('Pack validation', () => {

  test('valid data passes', () => {
    const { error } = createPackSchema.validate({
      title: 'Valid title',
      status: 'draft'
    });

    expect(error).toBeUndefined();
  });

  test('title required', () => {
    const { error } = createPackSchema.validate({
      status: 'draft'
    });

    expect(error).toBeDefined();
  });

  test('invalid status', () => {
    const { error } = createPackSchema.validate({
      title: 'Test',
      status: 'wrong'
    });

    expect(error).toBeDefined();
  });

  test('title too short', () => {
    const { error } = createPackSchema.validate({
      title: 'a',
      status: 'draft'
    });

    expect(error).toBeDefined();
  });

});
