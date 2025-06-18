/// <reference types="svelte" />
/// <reference types="vite/client" />

type Race = 'black' | 'white' | 'hispanic';
// Poorest -> Least poor
type Income = 1 | 2 | 3;
type Intervention = {
  id: string;
  policy_system: string;
  intervention: string;
  featured?: string | null;
};
type Display = 'group' | 'individual';

type InterventionDataRow = {
  parentInterventionId: string;
  raceIncomeSegment: number;
  race: string;
  parentIncome: string;
  mobilityExperience: string;
  combo: string;
  interventionCategory: string;
  intervention: string;
  helpText: string;

  // Gross income fields
  grossIncomeNoIntervention: number | null;
  grossIncomeWithIntervention: number | null;
  grossIncomePercentDifference: number | null;
  grossIncomeDifference: number | null;
  grossIncomeMedianFullPopulation: number | null;
  grossIncomeTopScale: number | null;

  // Net income fields
  netIncomeNoIntervention: number | null;
  netIncomeWithIntervention: number | null;
  netIncomePercentDifference: number | null;
  netIncomeDifference: number | null;
  netIncomeMedianFullPopulation: number | null;
  netIncomeTopScale: number | null;
};

type SingleDataResponse = {
  success: boolean;
  data: InterventionDataRow;

  error?: any;
  metadata: {
    parentId: string;
    segment: number;
    hasIndividualData: boolean;
    retrievedAt: string;
    type: 'single';
  };
};

type GroupDataResponse = {
  success: boolean;
  data: {
    group: InterventionDataRow;
    individual: InterventionDataRow;
  };
  error?: any;
  metadata: {
    parentId: string;
    segment: number;
    hasIndividualData: boolean;
    retrievedAt: string;
    type: 'group_and_individual';
  };
};

type DataResponse = GroupDataResponse | SingleDataResponse;
