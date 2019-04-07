const add = (a,b) => a + b;
const sub = (a,b) => a - b;

test('Should add two numbers',()=>{
	const result = add(2,7);
	expect(result).toBe(9);
});

test('Should subtract two numbers',()=>{
	const result = sub(5,2);
	expect(result).toBe(3);
});

//module.exports = add;