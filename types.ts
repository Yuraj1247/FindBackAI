export type ItemStatus = 'found' | 'claim_requested' | 'verified' | 'received';

export interface ClaimRequest {
  claimerName: string;
  contactNumber: string;
  email?: string;
  description: string;
  requestDate: string;
}

export interface Item {
  id: string;
  imageUrl: string;
  category: string;
  description: string;
  location: string;
  date: string;
  detectedText?: string;
  colors?: string[];
  status: ItemStatus;
  claimRequest?: ClaimRequest;
  matchScore?: number;
  matchReason?: string;
  reporterPhone?: string;
  reporterEmail?: string;
}

export interface SearchResult extends Item {
  confidence: number;
  reason: string;
}

export interface AIAnalysisResult {
  category: string;
  description: string;
  detectedText: string | null;
  colors: string[];
}