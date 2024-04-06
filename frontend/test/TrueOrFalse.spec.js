import { describe, it, expect, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import TrueOrFalseComponent from '/src/components/TrueOrFalseComponent.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [{ path: '/addquestions', name: 'AddQuestions' }];
const router = createRouter({ history: createWebHistory(), routes });

describe('TrueOrFalseComponent', () => {

    beforeEach(async () => {
        await router.push('/');
        await router.isReady();
    });

    it('allows inputting a question', async () => {
        const wrapper = mount(TrueOrFalseComponent, {
            global: {
                plugins: [router]
            }
        });
        const questionInput = wrapper.find('#question');
        await questionInput.setValue('Test Question');
        expect(wrapper.vm.question).toBe('Test Question');
    });

    it('allows selecting True as the answer alternative', async () => {
        const wrapper = mount(TrueOrFalseComponent, {
            global: {
                plugins: [router]
            }
        });
        const trueOption = wrapper.find('#true-option');
        await trueOption.setChecked();
        expect(wrapper.vm.selectedOption).toBe('true');
    });

    it('allows selecting False as the answer alternative', async () => {
        const wrapper = mount(TrueOrFalseComponent, {
            global: {
                plugins: [router]
            }
        });
        const falseOption = wrapper.find('#false-option');
        await falseOption.setChecked();
        expect(wrapper.vm.selectedOption).toBe('false');
    });

    it('navigates back to Add Questions on save', async () => {
        const wrapper = mount(TrueOrFalseComponent, {
            global: {
                plugins: [router]
            }
        });
        const saveButton = wrapper.find('.save-button');
        await saveButton.trigger('click');
        await flushPromises(); // Wait for any nextTicks or promise resolutions
        expect(router.currentRoute.value.path).toBe('/addquestions');
    });

    it('navigates back to Add Questions on cancel', async () => {
        const wrapper = mount(TrueOrFalseComponent, {
            global: {
                plugins: [router]
            }
        });
        const cancelButton = wrapper.find('.cancel-button');
        await cancelButton.trigger('click');
        await flushPromises(); // Wait for any nextTicks or promise resolutions
        expect(router.currentRoute.value.path).toBe('/addquestions');
    });
});
