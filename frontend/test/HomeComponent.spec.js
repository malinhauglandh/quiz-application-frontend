import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import HomeComponent from '/src/components/HomeComponent.vue';

vi.mock('/src/router/router', () => ({
    push: vi.fn(),
}));

vi.mock('/src/store/userStore', () => ({
    useStore: vi.fn(() => ({
        jwtToken: {
            accessToken: 'fakeToken',
            userId: 'userId',
        },
    })),
}));

vi.mock('/src/store/quizStore', () => ({
    useQuizStore: vi.fn(() => ({
        fetchCategories: vi.fn(),
        categories: [],
    })),
}));

global.fetch = vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ quizId: '1', quizName: 'Quiz 1', quizDescription: 'Description 1' }]),
    })
);

describe('HomeComponent', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('shows a message if no quizzes are available', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([]),
            })
        );
        const wrapper = mount(HomeComponent);
        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain('You have not created any quizzes yet... Get started now!!');
    });
});
