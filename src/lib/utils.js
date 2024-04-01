export const makeUrlKey = name => name.toLowerCase()
    .replace(/\s/g, '-').replace('.', '').replace("'", '')