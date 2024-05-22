const lengthTime = 1000 * 60 * 5; // 5 mins
console.log("lengthTime = ", lengthTime);

const passwordTokenExpiration = new Date(Date.now() + lengthTime);
console.log("passwordTokenExpiration =  ", passwordTokenExpiration);

console.log(Date.parse(passwordTokenExpiration) < Date.parse(Date.now()));
