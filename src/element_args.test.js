const input_test_stat_card = require('./client/js/utils')

test('stat card', () => {
    expect(input_test_stat_card("tester", "testing", "20%", ["main_tester"])).toBe('success');
});