import otpGenerator from 'otp-generator';

const generateInvitationToken = (): string => {
  const OTP = otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return OTP;
};

function generateRandomString(): string {
  // Generate three random digits for each part of the format
  const part1 =
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString();
  const part2 =
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString();
  const part3 =
    Math.floor(Math.random() * 10).toString() +
    Math.floor(Math.random() * 10).toString();

  // Combine the parts with dashes
  const result = `${part1}-${part2}-${part3}`;
  return result;
}

export { generateInvitationToken, generateRandomString };
