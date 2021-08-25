function run(argv) {
    const clipboard = argv[0]
    const input = argv[1]
    let code = clipboard

    if (input !== '')
    {
        code = input
    }

    return `https://carbon.now.sh?code=${encodeURIComponent(code)}`
}