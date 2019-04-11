export const dva = {
    // 什么
    config: {
        onError(err) {
            err.preventDefault();
            console.error(err.message);
        },
    },
};
