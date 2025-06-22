function exampleConst() {
    const x = 10;
    if (true) {
        const y = 20;
        console.log(y); // 20
    }
    console.log(x); // 10
    // x = 30; // ❌ Error: Assignment to constant variable
}
exampleConst();
