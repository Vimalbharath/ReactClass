function exampleVar() {
    var x = 10;
    if (true) {
        var x = 20; // Same variable, not block-scoped
        console.log(x); // 20
    }
    console.log(x); // 20 (no block scope)
}
exampleVar();

