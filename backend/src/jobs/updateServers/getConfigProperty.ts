export const getConfigProperty = (property: string, configFile: string) => {
  const propertyRow = configFile
    .split("\n")
    .find((row: string) => row.startsWith(property));
  if (!propertyRow) {
    throw new Error(`Invalid config: ${property} missing`);
  }
  const [, propertyValue] = propertyRow.split("=");

  return propertyValue;
};
