import { describe, it, expect } from 'vitest';
import {mount} from '@vue/test-utils';
import CreateQuiz from '/src/components/CreateQuizDetailsComponent.vue';

describe('CreateQuiz Component', () => {
    it('updates quiz name and tracks the number of characters left', async () => {
        const wrapper = mount(CreateQuiz);
        const quizNameInput = wrapper.find('#quizName');

        await quizNameInput.setValue('Test Quiz Name');
        expect(quizNameInput.element.value).toBe('Test Quiz Name');
        expect(wrapper.text()).toContain('36 characters left');
    });

    it('updates quiz description and tracks the number of characters left', async () => {
        const wrapper = mount(CreateQuiz);
        const quizDescriptionInput = wrapper.find('#quizDescription');

        await quizDescriptionInput.setValue('A test description of the quiz');
        expect(quizDescriptionInput.element.value).toBe('A test description of the quiz');
        expect(wrapper.text()).toContain('50 characters left');
    });


    it('selects a difficulty level', async () => {
        const wrapper = mount(CreateQuiz);
        const difficultySelect = wrapper.find('#difficulty');
        await difficultySelect.setValue('medium');
        expect(wrapper.vm.difficulty).toBe('medium');
    });
});