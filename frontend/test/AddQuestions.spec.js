import {describe, it, expect, beforeEach} from 'vitest';
import {mount, flushPromises} from '@vue/test-utils';
import AddQuestions from '/src/components/AddQuestionsComponent.vue';
import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {path: '/createquiz', name: 'CreateQuiz'},
    {path: '/addquestions/multiplechoice', name: 'MultipleChoice'},
    {path: '/addquestions/truefalse', name: 'TrueFalse'},
    {path: '/addquestions/fillintheblank', name: 'FillInTheBlank'},
];
const router = createRouter({history: createWebHistory(), routes});

describe('AddQuestions', () => {

    beforeEach(async () => {
        router.push('/');
        await router.isReady();
    });

    it('displays the add question options when plus is clicked', async () => {
        const wrapper = mount(AddQuestions, {
            global: {
                plugins: [router]
            }
        });
        await wrapper.find('.add-question-button').trigger('click');
        expect(wrapper.find('.options-container').exists()).toBe(true);
    });

    it('navigates to Multiple Choice on option select', async () => {
        const wrapper = mount(AddQuestions, {
            global: {
                plugins: [router]
            }
        });
        await wrapper.find('.add-question-button').trigger('click');
        await wrapper.find('[data-testid="multiple-choice-button"]').trigger('click');
        await flushPromises();
        expect(router.currentRoute.value.path).toBe('/addquestions/multiplechoice');
    });

    it('navigates to True or False on option select', async () => {
        const wrapper = mount(AddQuestions, {
            global: {
                plugins: [router]
            }
        });
        await wrapper.find('.add-question-button').trigger('click');
        await wrapper.find('[data-testid="true-or-false-button"]').trigger('click');
        await flushPromises();
        expect(router.currentRoute.value.path).toBe('/addquestions/truefalse');
    });

    it('navigates to Fill in the Blank on option select', async () => {
        const wrapper = mount(AddQuestions, {
            global: {
                plugins: [router]
            }
        });
        await wrapper.find('.add-question-button').trigger('click');
        await wrapper.find('[data-testid="fill-in-the-blank-button"]').trigger('click');
        await flushPromises();
        expect(router.currentRoute.value.path).toBe('/addquestions/fillintheblank');
    });
});
