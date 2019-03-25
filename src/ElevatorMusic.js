const wrap = (fn) => () => {
    fn();
};

module.exports = {
    wrap,
};
