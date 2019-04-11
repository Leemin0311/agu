export const dva = {
    // 到此一游
    config: {
        onError(err) {
            err.preventDefault();
            console.error(err.message);
        },
    },
};
