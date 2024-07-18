import { CryptoDataManager } from "./CryptoDataManager";

(async () => {
  const manager = new CryptoDataManager();
  const tokenName = "bitcoin";

  const report = await manager.generateReport(tokenName);
  console.log("Token Report:", report);
})();
