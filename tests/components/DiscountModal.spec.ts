import { beforeEach, describe, expect, it } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';

import DiscountModal from '@/components/DiscountModal.vue';

describe('DiscountModal Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows modal for new visitors', async () => {
    const wrapper = mount(DiscountModal);
    await flushPromises();
    const modal = wrapper.find('[data-test="discount-modal"]');
    expect(modal.exists()).toBe(true);
  });

  it('does not show modal if already dismissed', async () => {
    localStorage.setItem('discountModalDismissed', 'true');
    const wrapper = mount(DiscountModal);
    await flushPromises();
    const modal = wrapper.find('[data-test="discount-modal"]');
    expect(modal.exists()).toBe(false);
  });

  it('dismisses modal when close button is clicked', async () => {
    const wrapper = mount(DiscountModal);
    await flushPromises();
    const closeButton = wrapper.find('[data-test="close-button"]');
    await closeButton.trigger('click');
    await flushPromises();
    expect(localStorage.getItem('discountModalDismissed')).toBe('true');
    expect(wrapper.find('[data-test="discount-modal"]').exists()).toBe(false);
  });
});