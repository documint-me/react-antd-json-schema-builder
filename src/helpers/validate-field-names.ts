export const validateFieldNames = (name: string) => /^(?!\d)([a-zA-Z_][a-zA-Z0-9_ ]*)$/.test(name)

export default validateFieldNames