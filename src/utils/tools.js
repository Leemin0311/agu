/**
 * 换算金额
 * @param price 金额，单位分
 */
export function formatPrice(price) {
    return (price/100).toFixed(2);
}

/**
 * 滚动到中心
 * @param scrollEl 滚动元素
 * @param offset 相对于父元素的偏移
 * @param direction 滚动方向
 */
export const scrollToCenter = (scrollEl, offset, direction = 'vertical') => {
    const [client, scroll, scrollType] =
        direction === 'horizontal'
            ? [scrollEl.clientWidth, scrollEl.scrollWidth, 'scrollLeft']
            : [scrollEl.clientHeight, scrollEl.scrollHeight, 'scrollTop'];
    if (client < scroll) {
        scrollEl[scrollType] = offset > client / 2 ? offset - client / 2 : 0;
    }
};
