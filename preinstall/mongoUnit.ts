(async () => {
    const mongoUnit = await import('mongo-unit');
    try {
        await mongoUnit.start({port: 27019});
    } catch(err) {
        console.log(err);
    }
    // mongoUnit.stop();
    process.exit();
})();
