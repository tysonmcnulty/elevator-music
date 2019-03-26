const wrap = (fn) => async () => {
    return await fn();
};

module.exports = {
    wrap,
};
