export interface GrowthInsight {
  claim: string;
  evidence: string[];
  window: string;
  confidence: 'low' | 'moderate' | 'high';
  alternative_explanations: string[];
  recommended_next_test: string;
  human_approval_required: boolean;
}

export interface AIProvider {
  getGrowthInsight(
    metrics: Record<string, unknown>,
    cohorts: Record<string, unknown>,
    experiments: Record<string, unknown>,
    anomalies: Record<string, unknown>
  ): Promise<GrowthInsight>;
}

export class MockAIProvider implements AIProvider {
  async getGrowthInsight(
    _metrics: Record<string, unknown>,
    _cohorts: Record<string, unknown>,
    _experiments: Record<string, unknown>,
    _anomalies: Record<string, unknown>
  ): Promise<GrowthInsight> {
    // Deterministic mock response based on prompt rules
    return {
      claim: "Connector-driven registrations are outperforming paid traffic.",
      evidence: [
        "Connector cohort conversion: 18.4%",
        "Paid traffic conversion: 2.1%",
        "n=244 registrations from connectors"
      ],
      window: "Day 1-4",
      confidence: "high",
      alternative_explanations: [
        "Connectors are primarily recruiting from pre-existing high-intent clubs.",
        "Paid traffic targeting might be overly broad."
      ],
      recommended_next_test: "Replicate Connector onboarding variant B across three lower-performing campuses to isolate impact.",
      human_approval_required: true
    };
  }
}

// Stub for a real implementation (e.g. using OpenAI / Anthropic)
export class RealAIProvider implements AIProvider {
  async getGrowthInsight(
    _metrics: Record<string, unknown>,
    _cohorts: Record<string, unknown>,
    _experiments: Record<string, unknown>,
    _anomalies: Record<string, unknown>
  ): Promise<GrowthInsight> {
    // Implementation would go here, enforcing the system prompt rules.
    throw new Error('Not implemented for free tier simulation.');
  }
}

// Factory
export function getAIProvider(): AIProvider {
  const useReal = process.env.USE_REAL_AI === 'true';
  return useReal ? new RealAIProvider() : new MockAIProvider();
}

