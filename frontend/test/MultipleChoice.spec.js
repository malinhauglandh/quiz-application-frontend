import { describe, it, expect, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import MultipleChoiceComponent from '/src/components/MultipleChoiceComponent.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [{ path: '/addquestions', name: 'AddQuestions' }];
const router = createRouter({ history: createWebHistory(), routes });

describe('MultipleChoiceComponent', () => {

    beforeEach(async () => {
        await router.push('/');
        await router.isReady();
    });

    it('allows inputting a question', async () => {
        const wrapper = mount(MultipleChoiceComponent, {
            global: {
                plugins: [router]
            }
        });
        const questionInput = wrapper.find('#question');
        await questionInput.setValue('Test Question');
        expect(wrapper.vm.question).toBe('Test Question');
    });

    it('allows inputting alternatives and selecting the correct answer', async () => {
        const wrapper = mount(MultipleChoiceComponent, {
            global: {
                plugins: [router]
            }
        });

        const alternativeInputs = wrapper.findAll('.alternative-input');
        await alternativeInputs[0].setValue('A1');
        await alternativeInputs[1].setValue('A2');
        await alternativeInputs[2].setValue('A3');
        await alternativeInputs[3].setValue('A4');

        const correctAnswer = wrapper.find('#correct-1');
        await correctAnswer.setChecked();

        expect(wrapper.vm.alternatives[0]).toBe('A1');
        expect(wrapper.vm.correctAnswer).toBe(0);
    });

    it('navigates back to Add Questions on save', async () => {
        const wrapper = mount(MultipleChoiceComponent, {
            global: {
                plugins: [router]
            }
        });
        const saveButton = wrapper.find('.save-button');
        await saveButton.trigger('click');
        await flushPromises();
        expect(router.currentRoute.value.path).toBe('/addquestions');
    });

    it('navigates back to Add Questions on cancel', async () => {
        const wrapper = mount(MultipleChoiceComponent, {
            global: {
                plugins: [router]
            }
        });
        const cancelButton = wrapper.find('.cancel-button');
        await cancelButton.trigger('click');
        await flushPromises();
        expect(router.currentRoute.value.path).toBe('/addquestions');
    });
});
