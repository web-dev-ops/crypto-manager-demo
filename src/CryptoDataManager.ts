import { SocialSentiment, TokenInfo, Tokenomics, TokenReport } from "./types";
import { fetchMockTokenInfo, fetchMockTokenomics } from "./mocks";
import axios from "axios";
import { twitterApiClient } from "./twitterApiClient";

export class CryptoDataManager {
  // Fetch token information from Dexscreener(https://docs.dexscreener.com/api/reference) and Birdseye(https://docs.birdeye.so/)
  async fetchTokenInfo(tokenName: string): Promise<TokenInfo> {
    try {
      // Mock implementation
      return fetchMockTokenInfo(tokenName);
    } catch (e) {
      // An unexpected error occurred
      throw e;
    }
  }

  // Retrieve tokenomics data from Cryptorank. Reference https://docs.cryptosheets.com/
  async fetchTokenomics(tokenName: string): Promise<Tokenomics> {
    try {
      // Mock implementation
      return fetchMockTokenomics(tokenName);
    } catch (e) {
      // An unexpected error occurred
      throw e;
    }
  }

  // Gather social sentiment data from Twitter API
  public async fetchSocialSentiment(
    tokenName: string
  ): Promise<SocialSentiment> {
    try {
      return twitterApiClient.fetchSocialSentiment(tokenName);
    } catch (error) {
      console.error("Error fetching social sentiment:", error);
      throw new Error("Failed to fetch social sentiment data from Twitter.");
    }
  }
  // consolidates the data from the above methods into a comprehensive report
  async generateReport(tokenName: string): Promise<TokenReport> {
    try {
      const [tokenInfo, tokenomics, socialSentiment] = await Promise.all([
        this.fetchTokenInfo(tokenName),
        this.fetchTokenomics(tokenName),
        this.fetchSocialSentiment(tokenName),
      ]);

      return {
        tokenInfo,
        tokenomics,
        socialSentiment,
      };
    } catch (e) {
      // An unexpected error occurred
      throw e;
    }
  }
}
