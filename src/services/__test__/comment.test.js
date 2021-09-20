import { memberModel, organizationModel } from 'models';
import memberService from 'services/member';

describe('member service', () => {
  const responses = 'responses';
  const mockOrg = {
    id: 'id',
    addMember: jest.fn().mockResolvedValue(),
    getMembers: jest.fn().mockResolvedValue(),
  };
  const orgFindOrCreateMock = jest
    .spyOn(organizationModel, 'findOrCreate')
    .mockResolvedValue([mockOrg, true]);
  const orgFindOneMock = jest
    .spyOn(organizationModel, 'findOne')
    .mockResolvedValue(mockOrg);
  const memberFindOrCreateMock = jest
    .spyOn(memberModel, 'findOrCreate')
    .mockResolvedValue([responses]);

  test('member  addMember', async () => {
    const orgName = 'org';
    const userName = 'userName';
    const avatarUrl = 'avatarUrl';
    const followers = 'follower';
    const following = 'following';

    await memberService.addMember({
      orgName,
      userName,
      avatarUrl,
      followers,
      following,
    });

    expect(orgFindOrCreateMock).toBeCalled();
    expect(orgFindOrCreateMock).toBeCalledWith({
      where: { orgName },
    });
    expect(memberFindOrCreateMock).toBeCalled();
    expect(memberFindOrCreateMock).toBeCalledWith({
      where: { userName },
      defaults: { userName, avatarUrl, followers, following },
    });
    expect(mockOrg.addMember).toBeCalled();
    expect(mockOrg.addMember).toBeCalledWith(responses);
  });
  test('member  getMemberByOrganization', async () => {
    const orgName = 'org';

    await memberService.getMemberByOrganization({
      orgName,
    });

    expect(orgFindOneMock).toBeCalled();
    expect(orgFindOneMock).toBeCalledWith({
      where: { orgName },
    });

    expect(mockOrg.getMembers).toBeCalled();
    expect(mockOrg.getMembers).toBeCalledWith({
      order: [['followers', 'DESC']],
      raw: true,
    });
  });
});
