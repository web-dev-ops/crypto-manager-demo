import axios, { AxiosInstance } from "axios";
import { SocialSentiment } from "./types";
import * as dotenv from "dotenv";

dotenv.config();

class TwitterApiClientClass {
  private apiClient: AxiosInstance;

  constructor() {
    if (!process.env.TWITTER_BEARER_TOKEN) {
      throw new Error(
        "Twitter bearer token is not set in environment variables."
      );
    }
    this.apiClient = axios.create({
      baseURL: "https://api.twitter.com",
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    });
  }

  public async fetchSocialSentiment(
    tokenName: string
  ): Promise<SocialSentiment> {
    try {
      const response = await this.apiClient.get("/2/tweets/search/recent", {
        params: {
          query: tokenName,
          max_results: 100,
        },
      });

      const tweets = response.data.data;
      const tweetBodies: string[] = [];
      const usernames: string[] = [];
      const dateTimes: string[] = [];

      tweets.forEach((tweet: any) => {
        tweetBodies.push(tweet.text);
        usernames.push(tweet.author_id); // Note: To get the username, you might need an additional API call to get user details.
        dateTimes.push(tweet.created_at);
      });

      return {
        tweetBodies,
        usernames,
        dateTimes,
      };
    } catch (error) {
      console.error("Error fetching social sentiment:", error);
      throw new Error("Failed to fetch social sentiment data from Twitter.");
    }
  }
}

export const twitterApiClient = new TwitterApiClientClass();
