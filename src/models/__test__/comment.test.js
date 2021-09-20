import memberModel from 'models/schemas/member';

describe('memberModel orm', () => {
  test('memberModel test', async () => {
    const result = memberModel.rawAttributes;

    expect(Object.keys(result)).toMatchObject([
      'id',
      'userName',
      'avatarUrl',
      'followers',
      'following',
      'createdAt',
      'updatedAt',
    ]);
  });
});
