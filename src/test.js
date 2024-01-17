const handleNameChanges = () => {
    const names = ['Huy', 'Nam', 'Minh']
    const idx = Math.floor(Math.random() * 3)

    return names[idx]
}

const TestFunctions = {
    handleNameChanges,
}

export default TestFunctions
