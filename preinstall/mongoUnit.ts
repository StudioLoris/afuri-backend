(async () => {
    const mongoUnit = await import('mongo-unit');
    try {
        await mongoUnit.start();
    } catch(err) {
        console.log(err);
    }
    mongoUnit.stop();
})();
