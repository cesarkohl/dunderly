export const mockSend = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        send: mockSend
    };
});

export default mock;