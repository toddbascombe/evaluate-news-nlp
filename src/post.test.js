import {postData} from "./client/app";

test('the data is peanut butter', () => {
    return postData("/",{test:"test"}).then(data => {
        expect(data).toBe('peanut butter');
    });
});