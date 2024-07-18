import { CryptoDataManager } from "./CryptoDataManager";
import {
  fetchMockSocialSentiment,
  fetchMockTokenInfo,
  fetchMockTokenomics,
  generateMockReport,
} from "./mocks";

jest.mock("./CryptoDataManager", () => {
  return {
    CryptoDataManager: jest.fn().mockImplementation(() => {
      return {
        fetchTokenInfo: jest.fn(fetchMockTokenInfo),
        fetchTokenomics: jest.fn(fetchMockTokenomics),
        fetchSocialSentiment: jest.fn(fetchMockSocialSentiment),
        generateReport: jest.fn(generateMockReport),
      };
    }),
  };
});

describe("CryptoDataManager", () => {
  let cryptoDataManager: CryptoDataManager;
  let tokenName: string;

  beforeEach(() => {
    cryptoDataManager = new CryptoDataManager();
    tokenName = "bitcoin";
  });

  it("should fetch token info", async () => {
    const tokenInfo = await cryptoDataManager.fetchTokenInfo(tokenName);
    const mockData = fetchMockTokenInfo(tokenName);
    expect(tokenInfo).toEqual(mockData);
  });

  it("should fetch tokenomics", async () => {
    const tokenomics = await cryptoDataManager.fetchTokenomics(tokenName);
    const mockData = fetchMockTokenomics(tokenName);
    expect(tokenomics).toEqual(mockData);
  });

  it("should fetch social sentiment", async () => {
    const socialSentiment = await cryptoDataManager.fetchSocialSentiment(
      tokenName
    );
    const mockData = fetchMockSocialSentiment(tokenName);
    expect(socialSentiment).toEqual(mockData);
  });

  it("should generate a report", async () => {
    const report = await cryptoDataManager.generateReport(tokenName);
    const mockData = generateMockReport(tokenName);
    expect(report).toEqual(mockData);
  });
});
