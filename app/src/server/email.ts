export const sentEmailTemplate = async (
  emailTemplate: string,
  values: Record<string, any>
) => {
  console.log(`muly:setEmailByTemplate ${emailTemplate}`, { values });
  return Promise.resolve(true);
};
