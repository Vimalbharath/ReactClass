function exampleLet() {
    let x = 10;
    if (true) {
        let x = 20; // Different variable (block-scoped)
        console.log(x); // 20
    }
    console.log(x); // 10 (original value)
}
exampleLet();
