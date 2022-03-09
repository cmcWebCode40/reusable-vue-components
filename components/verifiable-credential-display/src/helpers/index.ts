
export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const keysToTitle = (str: string) => {
    return str
        .split(/(?=[A-Z])/)
        .map((word, index) => index !== 0 ? word.toLowerCase() : capitalize(word))
        .join(' ')
}