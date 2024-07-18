import { TokenInfo, Tokenomics, SocialSentiment, TokenReport } from "./types";

export const fetchMockTokenInfo = (tokenName: string): TokenInfo => {
  return {
    name: tokenName,
    price: 123.45,
    volume: 67890,
  };
};

export const fetchMockTokenomics = (tokenName: string): Tokenomics => {
  return {
    marketCap: 1234567890,
    totalSupply: 100000000,
    circulatingSupply: 90000000,
  };
};

export const fetchMockSocialSentiment = (
  tokenName: string
): SocialSentiment => {
  return {
    tweetBodies: ["Tweet 1 about " + tokenName, "Tweet 2 about " + tokenName],
    usernames: ["user1", "user2"],
    dateTimes: [new Date().toISOString(), new Date().toISOString()],
  };
};
export const generateMockReport = (tokenName: string): TokenReport => {
  try {
    const [tokenInfo, tokenomics, socialSentiment] = [
      fetchMockTokenInfo(tokenName),
      fetchMockTokenomics(tokenName),
      fetchMockSocialSentiment(tokenName),
    ];

    return {
      tokenInfo,
      tokenomics,
      socialSentiment,
    };
  } catch (e) {
    // An unexpected error occurred
    throw e;
  }
};
