import responses from 'constants/responses';
import memberController from 'controllers/member';
import memberService from 'services/member';

describe('member controller', () => {
  const orgName = 'orgName';
  const avatarUrl = 'avatarUrl';
  const followers = 'followers';
  const following = 'following';
  const userName = 'userName';
  const mockRequest = {
    body: {},
    query: {},
    params: { orgName, avatarUrl, followers, following, userName },
  };
  const mockEmptyRequest = {
    body: {},
    query: {},
    params: {},
  };
  const mockResponse = () => {
    const res = {};

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const res = mockResponse();

  const addMemberMock = jest
    .spyOn(memberService, 'addMember')
    .mockResolvedValue();

  const getCommentsByOrganizationMock = jest
    .spyOn(memberService, 'getMemberByOrganization')
    .mockResolvedValue();

  test('member addMember', async () => {
    await memberController.addMember(mockRequest, res);

    expect(addMemberMock).toBeCalledWith({
      orgName,
      avatarUrl,
      followers,
      following,
      userName,
    });
    expect(res.status).toBeCalledWith(responses.UPDATE_SUCCESS.status);
    expect(res.json).toBeCalled();
  });

  test('member empty req addMember', async () => {
    await memberController.addMember(mockEmptyRequest, res);

    expect(addMemberMock).not.toBeCalled();
    expect(res.status).toBeCalledWith(responses.MISS_PARAMETERS.status);
    expect(res.json).toBeCalled();
  });
  test('member throw error addMember', async () => {
    addMemberMock.mockRejectedValueOnce(new Error('error happen'));

    await memberController.addMember(mockRequest, res);

    expect(addMemberMock).toBeCalledWith({
      orgName,
      avatarUrl,
      followers,
      following,
      userName,
    });
    expect(res.status).toBeCalledWith(responses.SERVER_ERROR.status);
    expect(res.json).toBeCalledWith('error happen');
  });

  test('member getMemberByOrganization', async () => {
    await memberController.getMemberByOrganization(mockRequest, res);

    expect(getCommentsByOrganizationMock).toBeCalledWith({ orgName });
    expect(res.status).toBeCalledWith(responses.OK.status);
    expect(res.json).toBeCalled();
  });

  test('member empty req getMemberByOrganization', async () => {
    await memberController.getMemberByOrganization(mockEmptyRequest, res);

    expect(getCommentsByOrganizationMock).not.toBeCalled();
    expect(res.status).toBeCalledWith(responses.MISS_PARAMETERS.status);
    expect(res.json).toBeCalled();
  });
  test('member throw error getMemberByOrganization', async () => {
    getCommentsByOrganizationMock.mockRejectedValueOnce(
      new Error('error happen'),
    );

    await memberController.getMemberByOrganization(mockRequest, res);

    expect(getCommentsByOrganizationMock).toBeCalledWith({ orgName });
    expect(res.status).toBeCalledWith(responses.SERVER_ERROR.status);
    expect(res.json).toBeCalledWith('error happen');
  });
});
